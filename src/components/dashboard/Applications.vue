<template lang="pug">
.ay-applications
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
.ay-applications {
  display: flex;
  flex-flow: wrap;
  padding: 1rem 0;
}

.app {
  cursor: pointer;
  position: relative;
  display: flex;
  flex-direction: column;
  margin: 1rem;
  padding: 0 2rem;
  box-shadow: 0 0px 5px 0 rgba(0,0,0,.0);
  transition: background-color .3s ease-in-out,
              box-shadow .3s ease-in-out;

  &:hover {
    background-color: white;
    box-shadow: 0 8px 16px 0 rgba(0,0,0,.1);
    transition: background-color .1s ease-in-out,
                box-shadow .1s ease-in-out;

    span.new {
      box-shadow: 0 0px 5px 0 rgba(0,0,0,.0);
      transition: box-shadow .3s ease-in-out;
    }
  }

  img.logo {
    width: 120px;
    height: 120px;
    margin-top: 2rem;
  }

  span {
    &.name {
      font-family: "source-sans-pro";
      font-weight: 500;
      font-size: 1.3rem;
      line-height: 4em;
    }

    &.new {
      position: absolute;
      right: 0em;
      top: 1em;
      background-color: #DA3610;
      color: white;
      padding: .5em 1em;
      box-shadow: 0 8px 16px 0 rgba(0,0,0,.1);
      transition: box-shadow .1s ease-in-out;
    }
  }
}
</style>
