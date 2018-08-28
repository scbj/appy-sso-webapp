<template>
  <li class="HomeApplicationListItem" @click="onClick">
    <BaseImage
      :src="logo"
      :fallback-src="require('@/assets/img/logo-default.png')"
      class="HomeApplicationListItem__logo"
      draggable="false" />
    <span class="HomeApplicationListItem__name">
      {{ name }}
    </span>
    <span v-show="isNew" class="HomeApplicationListItem__new">
      {{ $t('new') | uppercase }}
    </span>
  </li>
</template>

<script>
import { uppercase } from '@/utils/filters'

/**
 * Opens the specified link in a new tab.
 * @param {String} url The url to open
 */
function openUrl (url) {
  Object.assign(
    document.createElement('a'), {
      target: '_blank',
      href: url
    }
  ).click()
}

export default {
  filters: {
    uppercase
  },

  props: {
    name: {
      type: String,
      required: true
    },
    url: {
      type: String,
      required: true
    },
    logo: {
      type: String,
      default: null
    },
    isNew: {
      type: Boolean,
      default: false
    }
  },

  methods: {
    onClick () {
      const token = this.$store.get('auth/accessToken')
      const url = `${this.url}?t=${token}`
      openUrl(url)
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../assets/scss/vars.scss';

.HomeApplicationListItem {
  -webkit-tap-highlight-color: transparent;
  padding: 1rem;
  display: flex;
  align-items: center;
  position: relative;
  cursor: pointer;
  transition: background-color .2s ease-in-out,
              box-shadow .2s ease-in-out;

  @media screen and (min-width: $mobile) {
    border-radius: .3em;
    align-items: center;
    flex-direction: column;
    margin: 1rem;
    padding: 0 2rem;
    box-shadow: 0 0px 5px 0 rgba(0,0,0,.0);
    transition: background-color .3s ease-in-out,
                box-shadow .3s ease-in-out;
  }

  &:hover {
    transition: background-color .08s ease-in-out,
                box-shadow .08s ease-in-out;

    @media screen and (min-width: $mobile) {
      background-color: white;
      $color: darken(#A250E5, 60%);
      box-shadow: 0 16px 40px -2px rgba($color,.04),
              0 2px 20px rgba($color,0.02);

      span.new {
        box-shadow: 0 0px 5px 0 rgba(0,0,0,.0);
        transition: box-shadow .3s ease-in-out;
      }
    }
  }

  &:active { background-color: rgba(black, .03); }
  &:focus { text-decoration: underline; }
}

.HomeApplicationListItem__logo {
  // In order to disable the default behavior of an image when right click on it
  pointer-events: none;

  user-select: none;
  width: 80px;
  height: 80px;
  border-radius: 4px;
  // overflow: hidden;
  margin-right: 2rem;

  @media screen and (min-width: $mobile) {
    width: 120px;
    height: 120px;
    margin-top: 2rem;
    margin-right: 0;
  }
}

span {
  &.HomeApplicationListItem__name {
    font-family: "source-sans-pro";
    font-size: 1.4rem;

    @media screen and (min-width: $mobile) {
      font-weight: 500;
      font-size: 1.3rem;
      line-height: 4em;
    }
  }

  &.HomeApplicationListItem__new {
    $color: #DA3610;
    font-size: 1rem;
    font-weight: 600;
    border: 1px solid $color;
    border-radius: 3px;
    color: $color;
    padding: .4em;
    position: absolute;
    right: 1rem;
    transition: box-shadow .1s ease-in-out;

    @media screen and (min-width: $mobile) {
      top: 1em;
      right: 0;
      box-shadow: 0 8px 16px 0 rgba(0,0,0,.1);
      background-color: $color;
      border-radius: 0;
      color: white;
      padding: .3em 1em;
    }
  }
}
</style>
