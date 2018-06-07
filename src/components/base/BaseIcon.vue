<template lang="pug">
i.BaseIcon.icon( :class='iconClass' )
</template>

<script>
export default {
  name: 'BaseIcon',

  props: {
    name: {
      type: String,
      required: true
    }
  },

  computed: {
    iconClass () {
      return `ion-${this.name}`
    }
  }
}
</script>
