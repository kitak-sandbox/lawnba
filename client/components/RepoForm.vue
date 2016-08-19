<template>
  <div class="modal" :class="{'is-active': isActive}">
    <div class="modal-background" @click="onClose"></div>
    <div class="modal-container">
      <div class="modal-content">
        <div class="box">
          <label class="label">リポジトリ名</label>
          <p class="control">
            <input type="text" class="input" placeholder="kitak/lawnba" :value="name" @input="updateName">
          </p>
          <label class="label">cronパターン</label>
          <p class="control">
            <input type="text" class="input" placeholder="30 9 1,15 * *" :value="cronPattern" @input="updateCronPattern">
          </p>
          <label class="label">ベースブランチ</label>
          <p class="control">
            <input type="text" class="input" placeholder="master" :value="baseBranch" @input="updateBaseBranch">
          </p>
          <p class="control">
            <button class="button is-primary" @click="postRepo">{{ createOrUpdateLabel }}</button>
          </p>
        </div>
      </div>
    </div>
    <button class="modal-close" @click="onClose"></button>
  </div>
</template>

<script>

export default {
  props: ['isActive', 'editingRepo', 'onClose'],
  data () {
    return {
      id: null,
      name: '',
      cronPattern: '',
      baseBranch: ''
    };
  },
  watch: {
    editingRepo: function (val) {
      if (val) {
        ['id', 'name', 'cronPattern', 'baseBranch'].forEach((key) => {
          this[key] = val[key];
        });
      }
    }
  },
  computed: {
    createOrUpdateLabel: function () {
      if (this.id) {
        return '更新';
      } else {
        return '作成';
      }
    }
  },
  methods: {
    updateName: function (e) {
      this.name = e.target.value;
    },
    updateCronPattern: function (e) {
      this.cronPattern = e.target.value;
    },
    updateBaseBranch: function (e) {
      this.baseBranch = e.target.value;
    },
    postRepo: function () {
      let path = '/repos';
      let postOrPut = 'POST';
      if (this.id) {
        path = `${path}/${this.id}`;
        postOrPut = 'PUT';
      }
      fetch(path, {
        method: postOrPut,
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: this.name,
          cron_pattern: this.cronPattern,
          base_branch: this.baseBranch
        })
      }).then(() => {
        this.onClose();
      }).catch(() => {
        console.log(arguments);
      });
    }
  }
}
</script>
