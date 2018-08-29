<template>
  <div :class="$mq" class="AppFooter">
    <div class="AppFooter__copyright">
      © Appy {{ getCurrentYear() }}. Version 0.0.1
    </div>
    <a
      class="AppFooter__contact"
      href="#contact"
      v-text="$t('contact')" />
    <a
      class="AppFooter__about"
      href="#about"
      v-text="$t('about')" />
    <a
      class="AppFooter__terms"
      href="#terms"
      v-text="$t('terms')" />
    <BaseLanguageSwitch class="AppFooter__language" />
  </div>
</template>

<script>
export default {
  methods: {
    getCurrentYear () {
      return new Date().getFullYear()
    }
  }
}
</script>

<style lang="scss" scoped>
.AppFooter {
  background: #fbfbfb;
  color: #909399;
  font-size: 1rem;
  padding: 2rem;
  display: flex;
  align-items: center;

  &.mobile {
    flex-direction: column;

    .AppFooter__language { order: 1 }
    .AppFooter__contact { order: 2 }
    .AppFooter__about { order: 3 }
    .AppFooter__terms { order: 4 }
    .AppFooter__copyright { order: 5 }
  }

  &:not(.mobile) {
    .AppFooter__copyright { flex-grow: 1 }

    .AppFooter__contact,
    .AppFooter__about,
    .AppFooter__terms,
    .AppFooter__language {
      margin-left: 1rem;
      }
  }
}

</style>
