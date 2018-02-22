<template lang="pug">
.ay-dashboard
  ay-header
  .main
    ay-hello( v-show="$mq !== 'mobile'" )
    mq-layout( mq='mobile' )
      ay-applications( v-if="activeName === 'apps'" )
      ay-news( v-else-if="activeName === 'news'" )
    mq-layout( mq='tablet+' )
      el-tabs( v-model='activeName' )
        el-tab-pane( :label="$t('apps')" name='apps' ref='defaultActive' )
          ay-applications
        el-tab-pane( :label="$t('news')" name='news' )
          ay-news
        el-tab-pane( :label="$t('settings')" name='admin' )
  ay-footer( v-show="$mq !== 'mobile'" )
  ay-nav-bar( v-show="$mq === 'mobile'" @changed="navBarChanged" )
</template>

<script>
import Header from '@/components/Header'
import Hello from '@/components/Dashboard/Hello'
import Applications from '@/components/dashboard/Applications'
import News from '@/components/dashboard/News'
import NavBar from '@/components/dashboard/NavBar'
import Footer from '@/components/Footer'

export default {
  components: {
    'ay-header': Header,
    'ay-hello': Hello,
    'ay-applications': Applications,
    'ay-news': News,
    'ay-footer': Footer,
    'ay-nav-bar': NavBar
  },
  data () {
    return {
      activeName: 'apps'
    }
  },
  methods: {
    navBarChanged (name) {
      if (this.activeName !== name) {
        this.activeName = name
      }
    }
  },
  mounted () {
    if (this.$refs.defaultActive) {
      this.activeName = this.$refs.defaultActive.name
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../assets/scss/vars';

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
  padding: 8rem 0;

  @media screen and (min-width: $mobile) {
    padding: 4em 6em;
  }
}
</style>
