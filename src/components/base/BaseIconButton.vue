<template>
  <button @click="raiseClickEvent" class="BaseIconButton">
    <div class="BaseIconButton__background">
      <BaseIcon :name="name" class="BaseIconButton__BaseIcon"/>
    </div>
  </button>
</template>

<script>
export default {
  name: 'BaseIconButton',
  props: {
    name: {
      type: String,
      required: true
    }
  },

  methods: {
    raiseClickEvent (event) {
      this.$emit('click', event)
    }
  }
}
</script>

<style lang="scss" scoped>
$color: #A250E5;

.BaseIconButton {
  font-size: 2.6rem;
  color: $color;
  cursor: pointer;

  &:active .BaseIconButton__background {
    background: rgba(lighten($color, 20%), .16);
    transition-duration: .04s;
  }
}

.BaseIconButton__background {
  $size: 1.28em;
  background: transparent;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  width: $size;
  height: $size;
  transition: background .2s ease-in-out;
}

.BaseIconButton__BaseIcon {
  line-height: 0;
}

// .BaseIconButton::before {
//   content: '';
//   background: rgba(transparent, .1);
//   width: 150%;
//   height: 150%;
//   transform: translateX(-50%) translateY(-50%);
// }
</style>
