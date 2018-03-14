<template lang="pug">
.dashboard-page
  DashboardHeader
  .main
    DashboardGreeting( v-show="$mq !== 'mobile'" )
    mq-layout( mq='mobile' )
      ApplicationList( v-if="activeName === 'apps'" )
      ArticleList( v-else-if="activeName === 'news'" )
    mq-layout( mq='tablet+' )
      el-tabs( v-model='activeName' )
        el-tab-pane(
          :label="$t('apps')"
          name='apps'
          ref='defaultActive')
          ApplicationList
        el-tab-pane( :label="$t('news')" name='news' )
          ArticleList
        el-tab-pane( :label="$t('administration')" name='admin' )
          AdministrationPanel
  DashboardFooter( v-show="$mq !== 'mobile'" )
  DashboardNavigationBar( v-show="$mq === 'mobile'" v-model='activeName' )
</template>

<script>
import AdministrationPanel from './administration/AdministrationPanel'
import ApplicationList from '@/components/dashboard/application/ApplicationList'
import ArticleList from '@/components/dashboard/article/ArticleList'
import DashboardFooter from '@/components/dashboard/DashboardFooter'
import DashboardGreeting from '@/components/Dashboard/DashboardGreeting'
import DashboardHeader from '@/components/dashboard/DashboardHeader'
import DashboardNavigationBar from '@/components/dashboard/DashboardNavigationBar'

export default {
  components: {
    AdministrationPanel,
    ApplicationList,
    ArticleList,
    DashboardFooter,
    DashboardGreeting,
    DashboardHeader,
    DashboardNavigationBar
  },

  data () {
    return {
      activeName: 'apps'
    }
  },

  mounted () {
    this.$store.dispatch('user/fetch')
    this.setDefaultActiveTab({
      name: this.$refs.defaultActive.name
    })
  },

  methods: {
    setDefaultActiveTab ({ name }) {
      if (name) {
        this.activeName = name
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../assets/scss/vars.scss';

.dashboard-page {
  background-color: #fbfbfb;
  display: grid;
  grid-template-rows: auto 1fr auto;
  grid-template-areas: "header"
                       "main"
                       "footer";
  min-height: 100vh;

  .dashboard-header { grid-area: header}
  .main { grid-area: main}
  .dashboard-footer { grid-area: footer}
}

.dashboard-header {
  box-shadow: 0 2px 10px rgba(#442261,0.1);
}

.main {
  padding: 7rem 0;

  @media screen and (min-width: $mobile) {
    padding: 4rem 6rem;
  }
}
</style>
