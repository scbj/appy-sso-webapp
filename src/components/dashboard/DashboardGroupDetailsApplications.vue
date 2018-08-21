<template>
  <div class="DashboardGroupDetailsApplications">
    <!-- When there are no apps in the active group -->
    <div v-if="!group.appCount" class="DashboardGroupDetailsApplications__no-apps">
      <BaseIcon name="ios-apps" />
      <span>
        {{ $t('message.noData.appInGroup') }}
      </span>
      <BaseButton @click="addApps" type="secondary">{{ $t('button.addApplications') }}</BaseButton>
    </div>

    <!-- When there is one or more apps in the active group -->
    <template v-else>
      <ApplicationList
        v-loading="pending"
        :apps="sortedApps"
        :selected-apps.sync="selectedApps" />
      <div class="DashboardGroupDetailsApplications__buttons">
        <BaseButton
          v-if="selectedApps.length"
          @click="removeSelectedApps"
          type="secondary">
          {{ removeFromGroupText }}
        </BaseButton>
        <BaseButton @click="addApps">{{ $t('button.addApplications') }}</BaseButton>
      </div>
    </template>
  </div>
</template>

<script>
import { get, sync } from 'vuex-pathify'

import ApplicationList from '@/components/application/ApplicationList'
import ModalGroupAddApplications from '@/components/dashboard/modals/group/ModalGroupAddApplications'
import { sortAlphabetically } from '@/utils/array'

export default {
  components: {
    ApplicationList
  },

  computed: {
    group: get('ui/dashboard/groups/activeGroup'),
    pending: get('ui/dashboard/groups/apps/pending'),
    apps: get('ui/dashboard/groups/apps/all'),
    selectedApps: sync('ui/dashboard/groups/apps/selectedApps'),

    sortedApps () {
      return sortAlphabetically(this.apps, 'name')
    },

    removeFromGroupText () {
      // The user must be informed of the state of his selection
      const count = this.selectedApps.length
      return this.$tc('button.removeFromGroup', count, { count })
    }
  },

  watch: {
    group () {
      this.$store.dispatch('ui/dashboard/groups/apps/reset')
      this.fetchApps()
    }
  },

  mounted () {
    this.fetchApps()
  },

  methods: {
    fetchApps () {
      this.$store.dispatch('ui/dashboard/groups/apps/list')
    },

    addApps () {
      this.$store.dispatch('ui/modal/open', {
        content: ModalGroupAddApplications
      })
    },

    removeSelectedApps () {
      this.$store.dispatch('ui/dashboard/groups/apps/removeSelectedApps')
    },

    isSelected (app) {
      return this.selectedApps.includes(app.id)
    },

    onAppClick (app) {
      if (this.isSelected(app)) {
        const index = this.selectedApps.indexOf(app.id)
        this.selectedApps.splice(index, 1)
      } else {
        this.selectedApps.push(app.id)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.DashboardGroupDetailsApplications {
  display: flex;
  flex-direction: column;
  padding-top: 1rem;
}

.DashboardGroupDetailsApplications__buttons {
  align-self: flex-end;
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-top: 2rem;
}

.DashboardGroupDetailsApplications__no-apps {
  color: #C0C4CC;
  margin: 0 auto;
  padding: 3em 1em;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  > .BaseIcon {
    opacity: .3;
    font-size: 6em;
    line-height: 1;
  }

  > span { text-align: center; }

  > .BaseButton {
    margin-top: .8em;
    opacity: 0;
    transform: translateY(-.2em);
    animation: appear .4s ease-in-out  forwards;

    @keyframes appear {
      to {
        opacity: 1;
        transform: translateY(0)
      }
    }
  }
}
</style>
