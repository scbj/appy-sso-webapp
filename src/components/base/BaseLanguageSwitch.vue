<template>
  <el-dropdown
    v-show="currentLanguage"
    class="BaseLanguageSwitch"
    @command="changeLanguage">
    <span class="el-dropdown-link">
      <BaseIcon name="md-globe" />
      <span class="BaseLanguageSwitch__current-language">{{ currentLanguage }}</span>
      <i class="el-icon-arrow-down el-icon--right" />
    </span>
    <el-dropdown-menu slot="dropdown">
      <el-dropdown-item
        v-for="lang in languages"
        :key="lang.locale"
        :command="lang.locale">
        {{ lang.label }}
      </el-dropdown-item>
    </el-dropdown-menu>
  </el-dropdown>
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
      this.$store.dispatch('ui/changeLanguage', { locale })
    }
  }
}
</script>

<style lang="scss" scoped>
.BaseLanguageSwitch {
  color: #909399;
  cursor: pointer;
  user-select: none;

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
