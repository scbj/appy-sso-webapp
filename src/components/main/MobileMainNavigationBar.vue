<template lang="pug">
ul.MobileMainNavigationBar( :class='{ minimize: !shouldDisplayLabel }' @click='showLabels' )
  router-link.MobileMainNavigationBar__navigation-link(
    v-for='link in links'
    :key='link.label'
    :to='link.routeName'
    tag="li" )
    BaseIcon.MobileMainNavigationBar__BaseIcon( :name='link.icon' )
    span.MobileMainNavigationBar__label( v-text='link.label' )
</template>

<script>
let timeoutBeforeHideLabel = null

export default {
  computed: {
    links () {
      return [
        {
          icon: 'ios-apps',
          label: this.$t('apps'),
          routeName: 'home'
        },
        {
          icon: 'ios-paper',
          label: this.$t('news'),
          routeName: 'news'
        },
        {
          icon: 'md-settings',
          label: this.$t('settings'),
          routeName: 'dashboard'
        }
      ]
    }
  },

  data () {
    return {
      shouldDisplayLabel: false
    }
  },

  methods: {
    showLabels () {
      // 2 seconds, 2000 milliseconds
      const delay = 2000
      if (timeoutBeforeHideLabel) {
        clearInterval(timeoutBeforeHideLabel)
      }
      this.shouldDisplayLabel = true
      timeoutBeforeHideLabel = setTimeout(() => {
        this.shouldDisplayLabel = false
      }, delay)
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../assets/scss/vars.scss';

.MobileMainNavigationBar {
  z-index: $z-index-dashboard-navigation-bar;
  user-select: none;
  background-color: white;
  position: fixed;
  bottom: 0;
  width: 100%;
  display: flex;
  justify-content: space-around;
  padding: .4rem;
  box-shadow: 0 4px 16px rgba(black, .1);
  transition: transform .2s cubic-bezier(.25,.87,.39,.99);

  &.minimize {
    transition: transform .2s ease-in-out;
    transform: translateY(1.5em);
  }
}

.MobileMainNavigationBar__navigation-link {
  cursor: pointer;
  color: lighten(#303133, 16%);
  flex-grow: 1;
  flex-basis: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-width: 0;
  overflow: hidden;
  transition: color .3s ease-in-out;

  &.active {
    color: #A250E5;
    transition: color 0s;

    .MobileMainNavigationBar__BaseIcon {
      animation: pop .3s ease-in-out;

      @keyframes pop {
        0% { transform: translateY(0) }
        10% { transform: translateY(-1px) }
        40% { transform: translateY(4px) }
        85% { transform: translateY(-1px) }
        100% { transform: translateY(0) }
      }
    }
  }

  .MobileMainNavigationBar__BaseIcon {
    font-size: 2rem;
    display: block;
  }

  .MobileMainNavigationBar__label {
    white-space: nowrap;
  }
}
</style>
