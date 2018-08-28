<template>
  <div class="HomeApplicationList">
    <ul v-if="apps.length" class="HomeApplicationList__apps">
      <HomeApplicationListItem
        v-for="app in apps"
        :key="app.id"
        :name="app.name"
        :logo="app.pictureUrl"
        :url="app.url"
        :is-new="app.createdAt | isNew" />
    </ul>
    <div v-else class="HomeApplicationList__no-data">
      <BaseIcon name="ios-albums" />
      <span class="HomeApplicationList__no-data-message">
        {{ $t('message.noData.applications') }}
      </span>
    </div>
  </div>
</template>

<script>
import { get } from 'vuex-pathify'
import moment from 'moment'

import HomeApplicationListItem from './HomeApplicationListItem'
import { uppercase } from '@/utils/filters'

export default {
  components: {
    HomeApplicationListItem
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
    apps: get('application/allAvailable')
  },

  mounted () {
    this.$store.dispatch('application/listAvailable')
  }
}
</script>

<style lang="scss">
@import '../../assets/scss/vars.scss';

.HomeApplicationList__apps {
  display: flex;
  flex-direction: column;

  @media screen and (min-width: $mobile) {
    flex-flow: wrap;
    padding: 1rem 0;
  }
}

.HomeApplicationList__no-data {
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

  .HomeApplicationList__no-data-message {
    font-size: .8em;
    text-align: center;
  }
}

</style>
