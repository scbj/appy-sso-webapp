<template lang="pug">
  .dashboard
    ay-header
    ay-footer
</template>

<script>
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export default {
  components: {
    'ay-header': Header,
    'ay-footer': Footer
  }
}
</script>

<style lang="scss" scoped>
.dashboard {
  display: grid;
  grid-template-rows: auto 1fr auto;
  grid-template-areas: "header"
                       "main"
                       "footer";
  min-height: 100vh;
}

.ay-header {
  grid-area: header;
}

.ay-footer {
  grid-area: footer;
}
</style>
