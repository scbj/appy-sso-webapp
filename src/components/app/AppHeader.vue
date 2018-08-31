<template>
  <header :class="{ 'AppHeader-pad-left': !shouldBodyScrollable }" class="AppHeader">
    <AppLogo class="AppHeader__logo" />
    <nav class="AppHeader__navigation">
      <router-link :to="{ name: 'home' }" class="AppHeader__navigation-link">
        <span>{{ $t('apps') }}</span>
      </router-link>
      <router-link :to="{ name: 'news' }" class="AppHeader__navigation-link">
        <span>{{ $t('news') }}</span>
      </router-link>
      <router-link
        v-if="isAdmin"
        :to="{ name: 'dashboard' }"
        class="AppHeader__navigation-link">
        <span>{{ $t('dashboard') }}</span>
      </router-link>
    </nav>
    <div class="AppHeader__profil">
      <BaseImage :src="pictureUrl" fallback-src="/static/img/default-user-picture.png"/>
      <span class="AppHeader__username">{{ username }}</span>
    </div>
  </header>
</template>

<script>
import { get } from 'vuex-pathify'

import AppLogo from '@/components/app/AppLogo'

export default {
  components: {
    AppLogo
  },

  computed: {
    username: get('user/username'),
    pictureUrl: get('user/current@pictureUrl'),
    isAdmin: get('user/isAdmin'),
    shouldBodyScrollable: get('ui/modal/shouldBodyScrollable')
  }
}
</script>

<style lang="scss" scoped>
@import '../../assets/scss/vars.scss';
@import '../../assets/scss/colors.scss';

.AppHeader {
  $padding: 1.5rem;
  background: white;
  border-bottom: .5px solid rgba(#ebebeb, 0.9);
  box-shadow: 0 4px 30px -6px rgba(black,0.1);
  padding: $padding;
  display: flex;
  align-items: center;
  position: fixed;
  top: 0;
  width: 100%;
  user-select: none;
  z-index: $z-index-dashboard-header;

  &.AppHeader-pad-left {
    padding-right: calc(#{$padding} + 6px);
  }
}

.AppHeader__logo {
  height: 2.5rem;
  display: none;
}

.AppHeader__navigation {
  color: #d9d9d9;
  flex-grow: 1;
  display: flex;
  align-items: center;
}

.AppHeader__navigation-link {
  margin-right: 3rem;
  font-family: "lato";
  > span {
    font-size: 16px;
  }

  &.active {
    color: #666666;
    font-weight: 700;
  }
}

.AppHeader__profil {
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

.AppHeader__username {
  display: none;
}

@media screen and (min-width: 850px) {
  .AppHeader {
    padding: 2.4rem 1.5rem;
  }

  .AppHeader__logo {
    display: block;
  }

  .AppHeader__navigation {
    margin-left: 6rem;
  }

  .AppHeader__username {
    display: block;
  }
}
</style>
