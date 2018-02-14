<template lang="pug">
.ay-header
  a.app-title(href='/dashboard')
    h1
      | appy
      span.secondary pack
  .profil( v-show="$mq !== 'mobile'" )
    img.face(:src='pictureUrl' :alt="$t('alt.profilPicture')")
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
.ay-header {
  user-select: none;
  background-color: #303133;
  color: white;
  padding: 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
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
  }
}
</style>
