<template lang="pug">
  .ay-dashboard
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
.ay-dashboard {
  background-color: #fbfbfb;
  display: grid;
  grid-template-rows: auto 1fr auto;
  grid-template-areas: "header"
                       "."
                       "footer";
  min-height: 100vh;
}

.ay-header {
  grid-area: header;
  box-shadow: 0 2px 10px rgba(0,0,0,0.3);
}

.ay-footer {
  grid-area: footer;
}
</style>
