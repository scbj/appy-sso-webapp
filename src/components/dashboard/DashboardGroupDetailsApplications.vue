<template>
  <div class="DashboardGroupDetailsApplications">
    <ul class="DashboardGroupDetailsApplications__application-list">
      <ApplicationItem
        v-for="app in applications"
        :key="app.id"
        :name="app.name"
        :logo="app.pictureUrl"
        :class="{ 'DashboardGroupDetailsApplications__application_selected': isSelected(app) }"
        @click.native="onApplicationClick(app)" />
    </ul>
    <div class="DashboardGroupDetailsApplications__buttons">
      <BaseButton
        v-if="selectedApps.length"
        @click="deleteApplications"
        type="secondary">
        {{ removeFromGroupText }}
      </BaseButton>
      <BaseButton>{{ $t('button.addApplications') }}</BaseButton>
    </div>
  </div>
</template>

<script>
import { get } from 'vuex-pathify'

import ApplicationItem from '../home/ApplicationItem'

export default {
  components: {
    ApplicationItem
  },

  computed: {
    group: get('ui/dashboard/groups/activeGroup'),
    applications: get('dashboard/applications/list'),
    pending: get('dashboard/applications/pending'),

    removeFromGroupText () {
      // The user must be informed of the state of his selection
      const count = this.selectedApps.length
      return this.$tc('button.removeFromGroup', count, { count })
    }
  },

  data () {
    return {
      selectedApps: []
    }
  },

  watch: {
    group () {
      this.fetchApplications()
    }
  },

  mounted () {
    this.fetchApplications()
  },

  methods: {
    fetchApplications () {
      this.$store.dispatch('dashboard/applications/list', {
        groupId: this.group.id
      })
    },

    async deleteApplications () {
      const success = await this.$store.dispatch('dashboard/applications/remove', {
        groupId: this.group.id,
        appIds: this.selectedApps
      })

      if (success) {
        this.selectedApps = []
        this.fetchApplications()
      }
    },

    isSelected (app) {
      return this.selectedApps.includes(app.id)
    },

    onApplicationClick (app) {
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
}

.DashboardGroupDetailsApplications__application-list {
  display: flex;
  flex-flow: wrap;
}

.DashboardGroupDetailsApplications__application_selected {
  background: rgba(black, .04)
}

.DashboardGroupDetailsApplications__buttons {
  align-self: flex-end;
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-top: 2rem;
}
</style>
