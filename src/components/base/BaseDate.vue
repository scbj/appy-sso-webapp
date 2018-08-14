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
      const m = moment(this.date)
      m.locale(this.$i18n.locale)
      return m.format('ll')
    },

    displayDate () {
      if (this.relative) {
        const m = moment(this.date)
        m.locale(this.$i18n.locale)
        return m.fromNow()
      }

      return this.formatedDate
    }
  }
}
</script>
