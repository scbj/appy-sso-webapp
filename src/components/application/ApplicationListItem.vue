<template>
  <li class="ApplicationListItem">
    <el-checkbox :checked="selected" @change="onCheckChanged" />
    <BaseImage
      :src="app.pictureUrl"
      class="ApplicationListItem__icon"
      fallback-src="/static/img/logo-default.png"
      draggable="false" />
    <span class="ApplicationListItem__name">{{ app.name }}</span>
  </li>
</template>

<script>
export default {
  props: {
    app: {
      type: Object,
      required: true
    },
    selected: {
      type: Boolean,
      required: true
    }
  },

  methods: {
    onCheckChanged (selected) {
      this.$emit('selection-changed', selected)
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../assets/scss/mixins.scss';

.ApplicationListItem {
  background: transparent;
  border-radius: 6px;
  padding: .8rem;
  display: flex;
  flex-direction: row;
  align-items: center;
  transition: all .1s ease-in-out;

  &:hover {
    background: rgba(black, .04);
    transition: all .05s ease-in;
  }
}

.ApplicationListItem__icon {
  border-radius: 6px;
  margin: 0 1em;
  @include size(24px);
}

</style>
