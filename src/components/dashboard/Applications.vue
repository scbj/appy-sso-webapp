<template lang="pug">
.ay-applications
  ay-hello( v-show="$mq === 'mobile'" )
  ul.apps( v-if="apps.length" )
    li.app( v-for="app in apps" :key="app.name" )
      img.logo( :src="app.logoUrl" :alt="app.name" )
      span.name( v-text="app.name" )
      span.new( v-show="app.new" ) {{ $t('new') | uppercase }}
  .no-data( v-else )
    i( class="icon ion-ios-albums-outline" )
    span.label( v-text="$t('message.noData.applications')" )
</template>

<script>
import Hello from '@/components/Dashboard/Hello'
import { uppercase } from '@/utils/filters'

export default {
  components: {
    'ay-hello': Hello
  },
  data () {
    return {
      apps: [
        {
          name: 'Brainstormin',
          logoUrl: '/static/img/logo-brainstormin.png'
        },
        {
          name: 'Foo',
          logoUrl: '/static/img/logo-foo.png',
          new: true
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

.apps {
  display: flex;
  flex-direction: column;

  @media screen and (min-width: $mobile) {
    flex-flow: wrap;
    padding: 1rem 0;
  }
  li.app {
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
  }
}

.no-data {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 3em 1em;
  color: #C0C4CC;
  font-size: 2rem;

  .icon {
    opacity: .6;
    font-size: 3em;
  }

  .label {
    font-size: .8em;
    font-family: 'orator-std';
    text-align: center;
  }
}

</style>
