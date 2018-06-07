<template lang="pug">
.DashboardPage
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
          name='apps')
          ApplicationList
        el-tab-pane( :label="$t('news')" name='news' )
          ArticleList
        el-tab-pane( :label="$t('administration')" name='admin' )
          AdministrationPanel
  DashboardFooter( v-show="$mq !== 'mobile'" )
  DashboardNavigationBar( v-show="$mq === 'mobile'" v-model='activeName' )
  ModalGroupCreate( :opened='shouldOpenModalGroupCreate' @closed="$store.dispatch('ui/closeModalGroupCreate')" )
  ModalGroupCreate( :opened='shouldOpenModalUserCreate' @closed="$store.dispatch('ui/closeModalUserCreate')" )
</template>

<script>
import { createNamespacedHelpers } from 'vuex'

import AdministrationPanel from './administration/AdministrationPanel'
import ApplicationList from '@/components/dashboard/application/ApplicationList'
import ArticleList from '@/components/dashboard/article/ArticleList'
import DashboardFooter from '@/components/dashboard/DashboardFooter'
import DashboardGreeting from '@/components/Dashboard/DashboardGreeting'
import DashboardHeader from '@/components/dashboard/DashboardHeader'
import DashboardNavigationBar from '@/components/dashboard/DashboardNavigationBar'
import ModalGroupCreate from '@/components/dashboard/administration/modals/group/ModalGroupCreate'
import ModalUserCreate from '@/components/dashboard/administration/modals/user/ModalUserCreate'

const { mapState } = createNamespacedHelpers('ui')

export default {
  components: {
    AdministrationPanel,
    ApplicationList,
    ArticleList,
    DashboardFooter,
    DashboardGreeting,
    DashboardHeader,
    DashboardNavigationBar,
    ModalGroupCreate,
    ModalUserCreate
  },

  computed: {
    ...mapState([
      'shouldOpenModalGroupCreate',
      'shouldOpenModalUserCreate'
    ])
  },

  data () {
    return {
      activeName: 'apps',
      shouldShowModalGroupCreate: true
    }
  },

  mounted () {
    this.$store.dispatch('user/fetch')
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

.DashboardPage {
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
