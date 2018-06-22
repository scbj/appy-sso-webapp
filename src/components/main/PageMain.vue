<template lang="pug">
.PageMain
  MainHeader( v-if="$mq !== 'mobile'" )
  transition( name='fade' mode='out-in' )
    router-view.PageMain__router-view
  MobileMainNavigationBar( v-if="$mq === 'mobile'" )
  MainFooter.PageMain__MainFooter( v-else )
</template>

<script>
import MainHeader from '@/components/main/MainHeader'
import MainFooter from '@/components/main/MainFooter'
import MobileMainNavigationBar from '@/components/main/MobileMainNavigationBar'

export default {
  components: {
    MainHeader,
    MainFooter,
    MobileMainNavigationBar
  },

  mounted () {
    this.$store.dispatch('user/fetch')
  }
}
</script>

<style lang="scss" scoped>
@import '../../assets/scss/colors.scss';
@import '../../assets/scss/vars.scss';

.PageMain {
  background: #fdfdfd;
  min-height: 100vh;
  display: flex;
  flex-direction: column;

  @media screen and (min-width: $mobile) {
    padding-top: 10rem;
  }
}

.PageMain__router-view {
  flex-grow: 1;

  @media screen and (min-width: $mobile) {
    padding: 1rem 3rem;
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity .16s ease-in-out,
              transform .2s cubic-bezier(.25,.87,.39,.99);
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}

.fade-enter-to,
.fade-leave {
  opacity: 1;
}

.fade-enter {
  transform: translateY(20px) scale(.98);
}

</style>
