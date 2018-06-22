<template lang="pug">
el-dropdown.BaseLanguageSwitch( v-show='currentLanguage' @command='changeLanguage' )
    span.el-dropdown-link
      BaseIcon( name='md-globe' )
      span.BaseLanguageSwitch__current-language( v-text='currentLanguage' )
      i.el-icon-arrow-down.el-icon--right
    el-dropdown-menu( slot='dropdown' )
      el-dropdown-item(
        v-for='lang in languages'
        :key='lang.locale'
        :command='lang.locale'
      ) {{ lang.label }}
</template>

<script>
export default {
  name: 'BaseLanguageSwitch',

  data () {
    return {
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
.BaseLanguageSwitch {
  color: #909399;

  .BaseIcon {
    opacity: .7;
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

.BaseLanguageSwitch__current-language {
  font-size: 1rem;
}
</style>
