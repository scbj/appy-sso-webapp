<template lang="pug">
li.application-item
  BaseImage.logo(
    :src='logo'
    fallbackSrc='/static/img/logo-default.png'
    draggable='false')
  span.name {{ name }}
  span.new( v-show='isNew' ) {{ $t('new') | uppercase }}
</template>

<script>
import { uppercase } from '@/utils/filters'

export default {
  filters: {
    uppercase
  },

  props: {
    name: {
      type: String,
      required: true
    },
    logo: {
      type: String,
      required: true
    },
    isNew: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../../assets/scss/vars.scss';

.application-item {
  -webkit-tap-highlight-color: transparent;
  user-select: none;
  cursor: pointer;
  position: relative;
  padding: 1rem;
  display: flex;
  align-items: center;
  transition: background-color .2s ease-in-out,
              box-shadow .2s ease-in-out;

  @media screen and (min-width: $mobile) {
    align-items: center;
    flex-direction: column;
    margin: 1rem;
    padding: 0 2rem;
    box-shadow: 0 0px 5px 0 rgba(0,0,0,.0);
    transition: background-color .3s ease-in-out,
                box-shadow .3s ease-in-out;
  }

  &:hover {
    transition: background-color .1s ease-in-out,
                box-shadow .1s ease-in-out;

    @media screen and (min-width: $mobile) {
      background-color: white;
      box-shadow: 0 8px 16px 0 rgba(0,0,0,.1);

      span.new {
        box-shadow: 0 0px 5px 0 rgba(0,0,0,.0);
        transition: box-shadow .3s ease-in-out;
      }
    }
  }

  &:active { background-color: rgba(black, .03); }
  &:focus { text-decoration: underline; }
}

.logo {
  user-select: none;
  width: 80px;
  height: 80px;
  border-radius: 4px;
  overflow: hidden;
  margin-right: 2rem;

  @media screen and (min-width: $mobile) {
    width: 120px;
    height: 120px;
    margin-top: 2rem;
    margin-right: 0;
  }
}

span {
  &.name {
    font-family: "source-sans-pro";
    font-size: 1.4rem;

    @media screen and (min-width: $mobile) {
      font-weight: 500;
      font-size: 1.3rem;
      line-height: 4em;
    }
  }

  &.new {
    --color: #DA3610;
    right: 1rem;
    position: absolute;
    color: var(--color);
    border: 1px solid var(--color);
    border-radius: 3px;
    padding: .4em;
    transition: box-shadow .1s ease-in-out;

    @media screen and (min-width: $mobile) {
      top: 1em;
      right: 0;
      box-shadow: 0 8px 16px 0 rgba(0,0,0,.1);
      background-color: var(--color);
      border-radius: 0;
      color: white;
      padding: .5em 1em;
    }
  }
}
</style>
