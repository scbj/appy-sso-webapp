<template>
  <ModalForm
    :primary-button-text="$t('button.addApplications')"
    @validated="formValidated"
    class="ModalGroupAddApplications">
    <h2 class="ModalGroupAddApplications__title">{{ $t('title.addApps') }}</h2>
    <ApplicationList
      v-loading="pending"
      :apps="sortedApps"
      :selected-apps.sync="selectedApps"
      class="ModalGroupAddApplications__app-list" />
  </ModalForm>
</template>

<script>
import { get } from 'vuex-pathify'

import ApplicationList from '@/components/application/ApplicationList'
import ModalForm from '@/components/dashboard/modals/ModalForm'
import { sortAlphabetically } from '@/utils/array'

export default {
  components: {
    ApplicationList,
    ModalForm
  },

  computed: {
    activeGroup: get('dashboard/groups/activeGroup'),
    apps: get('application/all'),

    sortedApps () {
      return sortAlphabetically(this.apps, 'name')
    },

    primaryButtonText () {
      const count = this.selectedApps
      return this.$tc('button.addApplications', count, { count })
    }
  },

  data () {
    return {
      pending: false,
      selectedApps: []
    }
  },

  mounted () {
    this.fetchApps()
  },

  methods: {
    async fetchApps () {
      this.pending = true
      await this.$store.dispatch('application/list')
      this.pending = false
    },

    async formValidated () {
      this.pending = true

      await this.$store.dispatch('ui/dashboard/groups/apps/addApps', {
        appIds: this.selectedApps
      })

      this.close()
    },

    close () {
      this.$store.dispatch('ui/modal/close')
    }
  }
}
</script>

<style lang="scss" scoped>
.ModalGroupAddApplications__title {
  font-size: 2rem;
  font-weight: 600;
  color: #373737;
  margin-bottom: 1rem
}

.ModalGroupAddApplications__app-list {
  max-height: 300px;
  overflow-y: auto;
}
</style>
