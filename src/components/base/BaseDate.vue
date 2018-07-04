<template>
  <span :title="formatedDate" class="BaseDate">
    {{ displayDate }}
  </span>
</template>

<script>
import moment from 'moment'

export default {
  name: 'BaseDate',

  props: {
    date: {
      type: Date | String,
      required: true
    },
    relative: {
      type: Boolean,
      default: true
    }
  },

  computed: {
    formatedDate () {
      return moment(this.date).format()
    },

    displayDate () {
      if (this.relative) {
        const momentDate = moment(this.date)
        momentDate.locale(this.$i18n.locale)
        return momentDate.fromNow(true)
      }

      return this.formatedDate
    }
  }
}
</script>
