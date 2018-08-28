<template>
  <div class="BaseCard">
    <slot />
  </div>
</template>

<script>
export default {
  name: 'BaseCard'
}
</script>

<style lang="scss" scoped>
.BaseCard {
  background: white;
  border: 1px solid rgba(#ececec, .25);
  border-radius: 12px;
  padding: 3rem 4rem;
  margin: 2rem 0;
  box-shadow: 0 16px 40px -2px rgba(0,0,0,.04),
              0 2px 20px rgba(0,0,0,0.02);
}
</style>
