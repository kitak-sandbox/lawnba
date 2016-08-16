<template>
  <div id="app">
    <Nav></Nav>
    <section class="section">
      <div class="container">
        <template v-for="i in [1, 2, 3]">
        <div class="box">
          <div class="level">
            <div class="level-left">
              <p class="title is-4">npm/npm</p>
            </div>
            <div class="level-right">
              <p class="level-item">
                <a href="#" class="button is-medium is-primary">ジョブを実行</a>
              </p>
              <p class="level-item">
                <a href="#" class="button is-medium">編集</a>
              </p>
            </div>
          </div>
        </div>
        </template>
      </div>
    </section>
  </div>
</template>

<script>
import Nav from './Nav.vue'

export default {
  data () {
    return {};
  },
  components: {
    Nav
  }
}
</script>
