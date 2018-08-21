<template>
  <ul class="ApplicationList">
    <ApplicationListItem
      v-for="app in apps"
      :key="app.id"
      :app="app"
      :selected="isSelected(app)"
      @selection-changed="onSelectionChanged(app, $event)" />
  </ul>
</template>

<script>
import ApplicationListItem from './ApplicationListItem'

export default {
  components: {
    ApplicationListItem
  },

  props: {
    apps: {
      type: Array,
      required: true
    },
    selectedApps: {
      type: Array,
      default: () => []
    }
  },

  methods: {
    isSelected (app) {
      const { id } = app
      return this.selectedApps.includes(id)
    },

    onSelectionChanged (app, selected) {
      selected
        ? this.selectApp(app)
        : this.unselectApp(app)
    },

    selectApp (app) {
      const { id } = app
      if (!this.selectedApps.includes(id)) {
        const selectedApps = [ ...this.selectedApps, id ]
        this.$emit('update:selectedApps', selectedApps)
      }
    },

    unselectApp (app) {
      const { id } = app
      const index = this.selectedApps.indexOf(id)
      if (index !== -1) {
        // Remove the elemnt at specIDBTransactionified index from the array
        const selectedApps = [ ...this.selectedApps ]
        selectedApps.splice(index, 1)
        this.$emit('update:selectedApps', selectedApps)
      }
    }
  }
}
</script>
