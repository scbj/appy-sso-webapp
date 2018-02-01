<template lang="pug">
.header
  a.title(href='/dashboard')
    h1
      | appy
      span.secondary pack
  .profil
    img.face(:src='pictureUrl' :alt="$t('img.alt')")
    el-dropdown
      span.el-dropdown-link
        | {{ username }}
        i.el-icon-arrow-down.el-icon--right
      el-dropdown-menu(slot='dropdown')
        el-dropdown-item Mon profil
        el-dropdown-item Mes applications
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
      pictureUrl: 'https://www.nypassivehouse.org/wp-content/uploads/2016/12/placeholder-profile-pic.png',
      username: 'John Doe'
    }
  }
}
</script>

<style lang="scss" scoped>
@import url('https://fonts.googleapis.com/css?family=Lato|Ubuntu|Roboto|Poppins:100,200,300,400,500,600');

.header {
  user-select: none;
  background-color: #303133;
  color: white;
  padding: 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

// Appy
.title {
  font-family: 'Poppins', sans-serif;

  h1 {
    font-weight: 500;
  }

  span.secondary {
    padding-left: .5rem;
    font-weight: 300;
    opacity: .8;
  }
}

// Profil picture and dropdown menu
.profil {
  display: flex;
  align-items: center;

  .el-dropdown {
    color: white;
  }

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
