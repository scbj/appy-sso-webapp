<template>
  <section class="UserInfosSection">
    <span class="UserInfosSection__title">{{ title }}</span>
    <slot />
  </section>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: true
    }
  }
}
</script>

<style lang="scss" scoped>
.UserInfosSection {
  margin-top: 1.6em;
  display: flex;
  flex-direction: column;
}

.UserInfosSection__title {
  font-size: 1.1rem;
  margin-bottom: .5em;
  display: flex;
  flex-direction: column;
  opacity: .87;
  user-select: none;
}
</style>
