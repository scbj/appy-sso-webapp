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
        el-tab-pane( :label="$t('settings')" name='admin' )
  DashboardFooter( v-show="$mq !== 'mobile'" )
  DashboardNavigationBar( v-show="$mq === 'mobile'" v-model='activeName' )
</template>

<script>
import DashboardHeader from '@/components/dashboard/DashboardHeader'
import DashboardGreeting from '@/components/Dashboard/DashboardGreeting'
import ApplicationList from '@/components/dashboard/application/ApplicationList'
import ArticleList from '@/components/dashboard/article/ArticleList'
import DashboardNavigationBar from '@/components/dashboard/DashboardNavigationBar'
import DashboardFooter from '@/components/dashboard/DashboardFooter'

export default {
  components: {
    DashboardHeader,
    DashboardGreeting,
    ApplicationList,
    ArticleList,
    DashboardFooter,
    DashboardNavigationBar
  },

  data () {
    return {
      activeName: 'apps'
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
