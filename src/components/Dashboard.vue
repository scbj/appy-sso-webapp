<template lang="pug">
  .ay-dashboard
    ay-header
    .main
      ay-hello
      el-tabs( v-model='activeName' )
        el-tab-pane( label='Mes applications' name='apps' ref='defaultActive' )
          ay-applications
        el-tab-pane( label='Actualités' name='news' )
        el-tab-pane( label='Administration' name='admin' )

    ay-footer
</template>

<script>
import Header from '@/components/Header'
import Hello from '@/components/Dashboard/Hello'
import Applications from '@/components/Dashboard/Applications'
import Footer from '@/components/Footer'

export default {
  components: {
    'ay-header': Header,
    'ay-hello': Hello,
    'ay-applications': Applications,
    'ay-footer': Footer
  },
  data () {
    return {
      activeName: ''
    }
  },
  mounted () {
    this.activeName = this.$refs.defaultActive.name
  }
}
</script>

<style lang="scss" scoped>
.ay-dashboard {
  background-color: #fbfbfb;
  display: grid;
  grid-template-rows: auto 1fr auto;
  grid-template-areas: "header"
                       "main"
                       "footer";
  min-height: 100vh;

  .ay-header { grid-area: header}
  .main { grid-area: main}
  .ay-footer { grid-area: footer}
}

.ay-header {
  box-shadow: 0 2px 10px rgba(0,0,0,0.3);
}

.main {
  padding: 4em 6em;
}
</style>
