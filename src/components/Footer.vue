<template lang="pug">
.ay-footer(:class='$mq')
  .copyright {{ copyright }}
  a.contact(href='#contact' v-text="$t('contact')")
  a.about(href='#about' v-text="$t('about')")
  a.terms(href='#terms' v-text="$t('terms')")
  el-dropdown.language(v-show='currentLanguage'  @command="changeLanguage")
    span.el-dropdown-link
      img(src='/static/img/world.svg')
      | {{ currentLanguage }}
      i.el-icon-arrow-down.el-icon--right
    el-dropdown-menu(slot='dropdown')
      el-dropdown-item(v-for='lang in languages' :key='lang.locale' :command='lang.locale') {{ lang.label }}
</template>

<i18n>
{
  "en": {
    "contact": "Contact",
    "about": "About",
    "terms": "Terms & Conditions"
  },
  "fr": {
    "contact": "Contact",
    "about": "A propos",
    "terms": "Mentions légales"
  }
}
</i18n>

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
      this.$store.dispatch('changeLocale', locale)
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

  img {
    opacity: .4;
    margin-right: .5em;
  }

  span.el-dropdown-link {
    display: flex;
    font-size: 1rem;
  }

  i {
    align-self: center;
  }
}
</style>
