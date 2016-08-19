<template>
  <div id="app">
    <NavBar :on-click-adding-repo="onClickAddingRepo"></NavBar>
    <section class="section">
      <div class="container">
        <template v-for="repo in repos" track-by="id">
        <div class="box">
          <div class="level">
            <div class="level-left">
              <p class="title is-4">{{ repo.name }}</p>
            </div>
            <div class="level-right">
              <p class="level-item">
                <a href="javascript: void(0);" class="button is-medium is-primary" :class="{'is-loading': repo.isCreatingPullRequest, 'is-disabled': repo.isCreatingPullRequest}" @click="createPullRequest(repo)">PullReqを作成</a>
              </p>
              <p class="level-item">
                <a href="javascript: void(0);" class="button is-medium" :class="{'is-disabled': repo.isCreatingPullRequest}" @click="editRepo(repo)">編集</a>
              </p>
            </div>
          </div>
        </div>
        </template>
      </div>
    </section>
    <RepoForm :is-active="isActiveRepoForm" :editingRepo="editingRepo" :onClose="onCloseRepoForm"></RepoForm>
  </div>
</template>

<script>

import NavBar from './NavBar.vue'
import RepoForm from './RepoForm.vue'

export default {
  data () {
    return {
      repos: [],
      isActiveRepoForm: false,
      editingRepo: null,
    };
  },
  components: {
    NavBar,
    RepoForm
  },
  mounted: function () {
    this.fetchRepos();
  },
  methods: {
    fetchRepos: function () {
      fetch('/repos', {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      }).then((response) => {
        return response.json();
      }).then((repos) => {
        this.repos = repos.map((repo) => {
          repo.cronPattern = repo.cron_pattern;
          repo.baseBranch = repo.base_branch;
          repo.isCreatingPullRequest = false;
          delete repo.cron_pattern;
          delete repo.base_branch;
          return repo;
        });
      }).catch(() => {
        console.log(arguments);
      });
    },
    addRepo: function () {
      this.editingRepo = {
        id: null,
        name: '',
        cronPattern: '',
        baseBranch: ''
      };
      this.$nextTick(() => {
        this.isActiveRepoForm = true;
      });
    },
    editRepo: function (repo) {
      this.editingRepo = repo;
      this.$nextTick(() => {
        this.isActiveRepoForm = true;
      });
    },
    onCloseRepoForm: function () {
      this.fetchRepos();

      this.isActiveRepoForm = false;
    },
    onClickAddingRepo: function () {
      this.addRepo();
    },
    createPullRequest: function (repo) {
      repo.isCreatingPullRequest = true;

      fetch('/jobs', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          repoId: repo.id
        })
      }).then((response) => {
        return response.json();
      }).then((json) => {
        let timerId = setInterval(() => {
          fetch(`/jobs/${json.jobId}`, {
            method: 'GET',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            }
          }).then((response) => {
            return response.json();
          }).then((json) => {
            if (json.status !== 'pending') {
                clearInterval(timerId);
                repo.isCreatingPullRequest = false;
                timerId = null;
            }
          });
        }, 1000);
      }).catch(() => {
        // TODO: error handling
        repo.isCreatingPullRequest = false;
      });
    }
  }
}
</script>
