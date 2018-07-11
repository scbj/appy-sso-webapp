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

  &:active .BaseIconButton__background::before {
    background: rgba(lighten($color, 26%), .16);
    transform: scale(1);
  }
}

.BaseIconButton__background {
  $size: 1.28em;
  display: flex;
  justify-content: center;
  align-items: center;
  width: $size;
  height: $size;
  position: relative;
}

.BaseIconButton__background::before {
  content: '';
  background: rgba(lighten($color, 26%), .16);
  border-radius: 50%;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  transform: scale(0);
  transition: transform .07s ease-in-out;
}

.BaseIconButton__BaseIcon {
  line-height: 0;
}
</style>
