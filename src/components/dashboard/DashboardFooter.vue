<template lang="pug">
.dashboard-footer( :class='$mq' )
  .copyright {{ copyright }}
  a.contact( href='#contact' v-text="$t('contact')" )
  a.about( href='#about' v-text="$t('about')" )
  a.terms( href='#terms' v-text="$t('terms')" )
  BaseLanguageSwitch.language
</template>

<script>
export default {
  data () {
    return {
      copyright: '© Appy. Version 0.0.1'
    }
  }
}
</script>

<style lang="scss" scoped>
.dashboard-footer {
  user-select: none;
  background: #fbfbfb;
  color: #909399;
  padding: 2rem;
  display: grid;
  grid-template-columns: auto 1fr auto auto auto auto;
  grid-template-areas: "copyright . contact about terms language";
  grid-gap: 1rem;
  align-items: center;

  &.mobile {
    grid-template-columns: none;
    grid-template-areas: "language"
                         "contact"
                         "about"
                         "terms"
                         "copyright";
    justify-items: center;
  }

  .copyright { grid-area: copyright; }
  .contact { grid-area: contact; }
  .about { grid-area: about; }
  .terms { grid-area: terms; }
  .language { grid-area: language; }
}

a:hover {
    color: #409EFF;
}
</style>
