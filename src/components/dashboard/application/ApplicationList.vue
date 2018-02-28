<template lang="pug">
.application-list
  DashboardGreeting( v-show="$mq === 'mobile'" )
  ul.apps( v-if='apps.length' )
    ApplicationItem(
      v-for='app in apps'
      :key='app.name'
      :name='app.name'
      :logo='app.logoUrl'
      :isNew='app.new')
  .no-data( v-else )
    i( class='icon ion-ios-albums-outline' )
    span.label( v-text="$t('message.noData.applications')" )
</template>

<script>
import DashboardGreeting from '@/components/Dashboard/DashboardGreeting'
import ApplicationItem from './ApplicationItem'
import { uppercase } from '@/utils/filters'

export default {
  components: {
    DashboardGreeting,
    ApplicationItem
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
@import '../../../assets/scss/vars.scss';

.apps {
  display: flex;
  flex-direction: column;

  @media screen and (min-width: $mobile) {
    flex-flow: wrap;
    padding: 1rem 0;
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
