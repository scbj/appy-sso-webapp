<template lang="pug">
.ay-footer(:class='$mq')
  .copyright {{ copyright }}
  a.contact(href='#contact' v-text="$t('contact')")
  a.about(href='#about' v-text="$t('about')")
  a.terms(href='#terms' v-text="$t('terms')")
  el-dropdown.language(v-show='currentLanguage'  @command="changeLanguage")
    span.el-dropdown-link
      <i class="icon ion-ios-world-outline"></i>
      <span v-text="currentLanguage" />
      i.el-icon-arrow-down.el-icon--right
    el-dropdown-menu(slot='dropdown')
      el-dropdown-item(v-for='lang in languages' :key='lang.locale' :command='lang.locale') {{ lang.label }}
</template>

<script>
export default {
  data () {
    return {
      copyright: '© Appy. Version 0.0.1',
      languages: [
        { label: 'Français', locale: 'fr' },
        { label: 'English', locale: 'en' }
      ]
    }
  },
  computed: {
    currentLanguage () {
      const lang = this.languages.find(lang => lang.locale === this.$i18n.locale)
      if (lang) return lang.label
    }
  },
  methods: {
    changeLanguage (locale) {
      this.$store.dispatch('user/changeLanguage', { locale })
    }
  }
}
</script>

<style lang="scss" scoped>
.ay-footer {
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

.language {
  color: #909399;

  .icon {
    font-size: 1.8rem;
    margin-right: .3em;
  }

  span.el-dropdown-link {
    display: flex;
    align-items: center;
    font-size: 1rem;
  }

  i {
    align-self: center;
  }
}
</style>
