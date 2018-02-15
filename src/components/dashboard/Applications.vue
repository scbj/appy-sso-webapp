<template lang="pug">
ul.ay-applications
  .app( v-for="app in apps" :key="app.name" )
    img.logo( :src="app.logoUrl" :alt="app.name" )
    span.name( v-text="app.name" )
    span.new( v-show="app.new" ) {{ $t('new') | uppercase }}
</template>

<script>
import { uppercase } from '@/utils/filters'

export default {
  data () {
    return {
      apps: [
        {
          name: 'Brainstormin',
          logoUrl: '/static/img/logo-brainstormin.png'
        },
        {
          name: 'Progress',
          logoUrl: '/static/img/logo-progress.png'
        },
        {
          name: 'Sondage',
          logoUrl: '/static/img/logo-sondage.png'
        },
        {
          name: 'TextIt',
          logoUrl: '/static/img/logo-textit.png'
        },
        {
          name: 'Foo',
          logoUrl: '/static/img/logo-foo.png',
          new: true
        }
      ]
    }
  },
  filters: {
    uppercase
  }
}
</script>

<style lang="scss">
@import '../../assets/scss/vars';

.ay-applications {
  display: flex;
  flex-direction: column;

  @media screen and (min-width: $mobile) {
    flex-flow: wrap;
    padding: 1rem 0;
  }
}

.app {
  user-select: none;
  cursor: pointer;
  position: relative;
  margin: .2rem 0;
  padding: .5rem 1rem;
  display: flex;
  align-items: center;
  transition: background-color .3s ease-in-out,
              box-shadow .3s ease-in-out;

  @media screen and (min-width: $mobile) {
    align-items: center;
    flex-direction: column;
    margin: 1rem;
    padding: 0 2rem;
    box-shadow: 0 0px 5px 0 rgba(0,0,0,.0);
  }

  &:hover {
    background-color: rgba(black, .08);
    transition: background-color .1s ease-in-out,
                box-shadow .1s ease-in-out;

    @media screen and (min-width: $mobile) {
      background-color: white;
      box-shadow: 0 8px 16px 0 rgba(0,0,0,.1);
    }

    span.new {
      box-shadow: 0 0px 5px 0 rgba(0,0,0,.0);
      transition: box-shadow .3s ease-in-out;
    }
  }

  img.logo {
    width: 80px;
    height: 80px;
    border-radius: 4px;
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
      --color-new: #DA3610;
      right: 1rem;
      position: absolute;
      color: var(--color-new);
      border: 1px solid var(--color-new);
      border-radius: 3px;
      padding: .4em;
      transition: box-shadow .1s ease-in-out;

      @media screen and (min-width: $mobile) {
        top: 1em;
        box-shadow: 0 8px 16px 0 rgba(0,0,0,.1);
        background-color: var(--color-new);
        color: white;
        padding: .5em 1em;
      }
    }
  }
}
</style>
