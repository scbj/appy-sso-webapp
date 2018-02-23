<template lang="pug">
.ay-nav-bar
  .item(
    v-for="item in items"
    :key="item.label"
    @click="setActive(item)"
    :class="{ active: isActive(item) }" )
    i( class="icon" :class="item.icon" )
    span.label( v-text="item.label" )
</template>

<script>
export default {
  data () {
    return {
      activeName: ''
    }
  },
  computed: {
    items () {
      return [
        {
          icon: 'ion-android-apps',
          label: this.$t('apps'),
          name: 'apps'
        },
        {
          icon: 'ion-ios-paper-outline',
          label: this.$t('news'),
          name: 'news'
        },
        {
          icon: 'ion-ios-gear',
          label: this.$t('settings'),
          name: 'settings'
        }
      ]
    }
  },
  mounted () {
    this.activeName = this.items[0].name
  },
  methods: {
    isActive (item) {
      return this.activeName === item.name
    },
    setActive (item) {
      if (this.activeName !== item.name) {
        this.activeName = item.name
        this.$emit('changed', this.activeName)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.ay-nav-bar {
  z-index: 1000;
  user-select: none;
  background-color: white;
  position: fixed;
  bottom: 0;
  width: 100%;
  display: flex;
  justify-content: space-around;
  padding: .4rem;
  box-shadow: 0 4px 16px rgba(black, .1)
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

    .icon {
      animation: pop .4s ease-in-out;

      @keyframes pop {
        0% { transform: translateY(0) }
        10% { transform: translateY(-1px) }
        40% { transform: translateY(4px) }
        85% { transform: translateY(-1px) }
        100% { transform: translateY(0) }
      }
    }
  }

  .icon {
    font-size: 2rem;
    display: block;
  }

  .label {
    white-space: nowrap;
  }
}
</style>
