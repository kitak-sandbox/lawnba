<template>
  <section class="hero is-primary">
    <nav class="nav">
      <div class="nav-left">
        <p class="title nav-item">
          Lawnba
        </p>
      </div>
      <div class="nav-right nav-menu">
        <span class="nav-item">
          <a href="javascript: void(0);" class="button is-inverted is-medium is-primary" @click="onClickAddingRepo">
            <span>リポジトリを追加</span>
          </a>
        </span>
      </div>
    </nav>
  </section>
</template>

<script>
export default {
  props: ['onClickAddingRepo'],
  data () {
    return {}
  }
}
</script>
