<template lang="pug">
.DashboardNavigationBar( :class='{ minimize: !shouldDisplayLabel }' )
  .item(
    v-for='item in items'
    :key='item.label'
    @click='setActive(item)'
    :class='{ active: isActive(item) }')
    BaseIcon( :name='item.icon' )
    span.label( v-text='item.label' )
</template>

<script>
let timeoutBeforeHideLabel = null

export default {
  props: {
    value: {
      type: String,
      required: true
    }
  },

  computed: {
    items () {
      return [
        {
          icon: 'ios-apps',
          label: this.$t('apps'),
          name: 'apps'
        },
        {
          icon: 'ios-paper',
          label: this.$t('news'),
          name: 'news'
        },
        {
          icon: 'md-settings',
          label: this.$t('settings'),
          name: 'settings'
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
    isActive (item) {
      return this.value === item.name
    },
    setActive (item) {
      this.showLabels()
      if (this.value !== item.name) {
        this.$emit('input', item.name)
      }
    },

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

.DashboardNavigationBar {
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

.item {
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

    .BaseIcon {
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

  .BaseIcon {
    font-size: 2rem;
    display: block;
  }

  .label {
    white-space: nowrap;
  }
}
</style>
