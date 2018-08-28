<template>
  <i :class="iconClass" class="BaseIcon icon" />
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
