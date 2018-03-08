<template lang="pug">
.application-list
  DashboardGreeting( v-show="$mq === 'mobile'" )
  ul.apps( v-if='apps.length' )
    ApplicationItem(
      v-for='app in apps'
      :key='app.name'
      :name='app.name'
      :logo='app.logoUrl'
      :isNew='app.createdAt | isNew')
  .no-data( v-else )
    i( class='icon ion-ios-albums-outline' )
    span.label( v-text="$t('message.noData.applications')" )
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
import moment from 'moment'

import DashboardGreeting from '@/components/Dashboard/DashboardGreeting'
import ApplicationItem from './ApplicationItem'
import { uppercase } from '@/utils/filters'

const { mapState } = createNamespacedHelpers('application')

export default {
  components: {
    DashboardGreeting,
    ApplicationItem
  },

  filters: {
    uppercase,
    isNew (value) {
      const createdAt = moment(value)
      const now = moment(new Date())
      const duration = moment.duration(now.diff(createdAt))

      // we consider the application as new if it has been added there is less than a month
      return duration.asMonths() <= 1
    }
  },

  computed: {
    ...mapState({
      'apps': 'applications'
    })
  },

  mounted () {
    this.$store.dispatch('application/list')
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
