<template lang="pug">
.header
  h1.title appy
  .profil
    img.face(:src='pictureUrl' :alt="$t('img.alt')")
    el-dropdown
      span.el-dropdown-link
        | {{ username }}
        i.el-icon-arrow-down.el-icon--right
      el-dropdown-menu(slot='dropdown')
        el-dropdown-item Mon profil
        el-dropdown-item Paramètres
        el-dropdown-item(divided) Se déconnecter
</template>

<i18n>
{
  "fr": {
    "img.alt": "Photo de profil"
  },
  "en": {
    "img.alt": "Profile picture"
  }
}
</i18n>

<script>
export default {
  data () {
    return {
      pictureUrl: 'https://www.w3schools.com/howto/img_avatar2.png',
      username: 'Jessica'
    }
  }
}
</script>

<style lang="scss" scoped>
.header {
  user-select: none;
  background: white;
  padding: 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

// Appy
.title {
  color: #606266;
  font-weight: 100;
}

// Profil picture and dropdown menu
.profil {
  display: flex;
  align-items: center;

  // Rounded profil picture
  .face {
    width: 38px;
    height: 38px;
    border-radius: 50%;
    margin: auto 1rem;
    box-shadow: 1px 1px 4px rgba(0, 0, 0, 0.3);
  }
}
</style>
