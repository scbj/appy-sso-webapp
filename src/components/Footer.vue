<template lang="pug">
.ay-footer
  .copyright {{ copyright }}
  a.contact(href="#contact" v-text="$t('contact')")
  a.about(href="#about" v-text="$t('about')")
  a.terms(href="#terms" v-text="$t('terms')")
</template>

<i18n>
{
  "en": {
    "contact": "Contact",
    "about": "About",
    "terms": "Terms & conditions"
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
      copyright: '© Appy. Version 0.0.1'
    }
  }
}
</script>

<style lang="scss" scoped>
.ay-footer {
  user-select: none;
  background: #F2F6FC;
  color: #909399;
  padding: 2rem;
  display: grid;
  grid-template-columns: auto 1fr auto auto auto;
  grid-template-areas: "copyright . contact about terms";
  grid-column-gap: 1rem;
}

.copyright { grid-area: copyright; }
.contact { grid-area: contact; }
.about { grid-area: about; }
.terms { grid-area: terms; }

a:hover {
    color: #409EFF;
}
</style>
