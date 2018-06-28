<template lang="pug">
.MainHeader
  BaseImage.MainHeader__logo( src='/static/img/title-gradient.svg' )
  .MainHeader__navigation
    router-link.MainHeader__navigation-link( :to="{ name: 'home' }" )
      p {{ $t('apps') }}
    router-link.MainHeader__navigation-link( :to="{ name: 'news' }" )
      p {{ $t('news') }}
    router-link.MainHeader__navigation-link( :to="{ name: 'dashboard' }" )
      p {{ $t('dashboard') }}
  .MainHeader__profil
    BaseImage( :src='pictureUrl' fallbackSrc='/static/img/default-user-picture.png' )
    span {{ username }}
</template>

<script>
import { get } from 'vuex-pathify'

export default {
  computed: {
    username: get('user/username'),
    pictureUrl: get('user/pictureUrl')
  }
}
</script>

<style lang="scss" scoped>
@import '../../assets/scss/vars.scss';
@import '../../assets/scss/colors.scss';

.MainHeader {
  background: white;
  border-bottom: .5px solid rgba(#ebebeb, 0.9);
  box-shadow: 0 4px 30px -6px rgba(black,0.1);
  padding: 1.5rem;
  display: flex;
  position: fixed;
  top: 0;
  width: 100%;
  z-index: $z-index-dashboard-header;
}

.MainHeader__logo {
  width: 12rem;
  display: none;
}

.MainHeader__navigation {
  color: #d9d9d9;
  flex-grow: 1;
  display: flex;
  align-items: center;
}

.MainHeader__navigation-link {
  margin-right: 3rem;
  font-family: "lato";
  > p {
    font-size: 16px;
  }

  &.active {
    color: #666666;
    font-weight: bold;
  }
}

.MainHeader__profil {
  display: flex;
  align-items: center;

  > img {
    $size: 38px;
    width: $size;
    height: $size;
    border-radius: 50%;
    margin: auto 1rem;
  }
}

@media screen and (min-width: 850px) {
  .MainHeader__logo {
    display: block;
  }

  .MainHeader__navigation {
    margin-left: 6rem;
  }
}
</style>
