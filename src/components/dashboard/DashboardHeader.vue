<template lang="pug">
.dashboard-header
  a.app-title
    img( src='/static/img/title-gradient.svg' alt='appy pack' )
  .profil( v-show="$mq !== 'mobile'" )
    img.face( :src="pictureUrl || '/static/img/default-user-picture.png'" :alt="$t('alt.profilPicture')" )
    el-dropdown
      span.el-dropdown-link
        | {{ username }}
        i.el-icon-arrow-down.el-icon--right
      el-dropdown-menu( slot='dropdown' )
        el-dropdown-item Mon profil
        el-dropdown-item Mes applications
        el-dropdown-item Paramètres
        el-dropdown-item( divided ) Se déconnecter
</template>

<script>
import { createNamespacedHelpers } from 'vuex'

const { mapState, mapGetters } = createNamespacedHelpers('user')

export default {
  computed: {
    ...mapState([
      'pictureUrl'
    ]),
    ...mapGetters([
      'username'
    ])
  }
}
</script>

<style lang="scss" scoped>
@import '../../assets/scss/vars';

.dashboard-header {
  z-index: 1000;
  user-select: none;
  background-color: rgba(white, .95);
  padding: 1.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  top: 0;
  width: 100%;

  @media screen and (min-width: $mobile) {
    padding: 2rem;
    position: relative;
    top: 0;
    width: auto;
  }
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
  }
}
</style>
