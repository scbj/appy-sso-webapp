<template lang="pug">
.ApplicationList
  ul.ApplicationList__apps( v-if='apps.length' )
    ApplicationItem(
      v-for='app in apps'
      :key='app.name'
      :name='app.name'
      :logo='app.pictureUrl'
      :isNew='app.created_at | isNew')
  .ApplicationList__no-data( v-else )
    BaseIcon( name='ios-albums' )
    span.label( v-text="$t('message.noData.applications')" )
</template>

<script>
import { get } from 'vuex-pathify'
import moment from 'moment'

import ApplicationItem from './ApplicationItem'
import { uppercase } from '@/utils/filters'

export default {
  components: {
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
    apps: get('application/applications')
  },

  mounted () {
    this.$store.dispatch('application/list')
  }
}
</script>

<style lang="scss">
@import '../../assets/scss/vars.scss';

.ApplicationList__apps {
  display: flex;
  flex-direction: column;

  @media screen and (min-width: $mobile) {
    flex-flow: wrap;
    padding: 1rem 0;
  }
}

.ApplicationList__no-data {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 3em 1em;
  color: #C0C4CC;
  font-size: 2rem;

  .BaseIcon {
    opacity: .3;
    font-size: 3em;
  }

  .label {
    font-size: .8em;
    text-align: center;
  }
}

</style>
