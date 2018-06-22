<template lang="pug">
.MainFooter( :class='$mq' )
  .MainFooter__copyright © Appy {{ getCurrentYear() }}. Version 0.0.1
  a.MainFooter__contact( href='#contact' v-text="$t('contact')" )
  a.MainFooter__about( href='#about' v-text="$t('about')" )
  a.MainFooter__terms( href='#terms' v-text="$t('terms')" )
  BaseLanguageSwitch.MainFooter__language
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
.MainFooter {
  background: #fbfbfb;
  color: #909399;
  padding: 2rem;
  display: flex;
  align-items: center;

  &.mobile {
    flex-direction: column;

    .MainFooter__language { order: 1 }
    .MainFooter__contact { order: 2 }
    .MainFooter__about { order: 3 }
    .MainFooter__terms { order: 4 }
    .MainFooter__copyright { order: 5 }
  }

  &:not(.mobile) {
    .MainFooter__copyright { flex-grow: 1 }

    .MainFooter__contact,
    .MainFooter__about,
    .MainFooter__terms,
    .MainFooter__language {
      margin-left: 1rem;
      }
  }
}

</style>
