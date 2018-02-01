<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style lang="scss">
@import './assets/scss/_base.scss';
@import './assets/scss/element-ui.scss';

#app {
  height: 100%
}
</style>
