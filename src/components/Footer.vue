<template lang="pug">
.ay-footer
  .copyright {{ copyright }}
  a.contact(href='#contact' v-text="$t('contact')")
  a.about(href='#about' v-text="$t('about')")
  a.terms(href='#terms' v-text="$t('terms')")
  el-dropdown.language
    span.el-dropdown-link
      img(src='/static/img/world.svg')
      | Français
      i.el-icon-arrow-down.el-icon--right
    el-dropdown-menu(slot='dropdown')
      el-dropdown-item Français
      el-dropdown-item(disabled) English
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
  grid-template-columns: auto 1fr auto auto auto auto;
  grid-template-areas: "copyright . contact about terms language";
  grid-column-gap: 1rem;

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
  cursor: pointer;

  img {
    opacity: .4;
    margin-right: .5em;
  }

  .el-dropdown-link {
    display: flex
  }

  i {
    align-self: center;
  }
}
</style>
