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
      active: '',
      items: [
        {
          icon: 'ion-android-apps',
          label: this.$t('apps')
        },
        {
          icon: 'ion-ios-paper-outline',
          label: this.$t('news')
        },
        {
          icon: 'ion-ios-gear',
          label: this.$t('settings')
        }
      ]
    }
  },
  mounted () {
    this.active = this.items[0].label
  },
  methods: {
    isActive (item) {
      return this.active === item.label
    },
    setActive (item) {
      this.active = item.label
    }
  }
}
</script>

<style lang="scss" scoped>
.ay-nav-bar {
  z-index: 1000;
  background-color: white;
  position: fixed;
  bottom: 0;
  width: 100%;
  display: flex;
  justify-content: space-around;
  padding: .5rem;
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

  &.active {
    color: rgb(44, 121, 255);
  }

  .icon {
    font-size: 2.2rem;
    display: block;
  }

  .label {
    white-space: nowrap;
  }
}
</style>
