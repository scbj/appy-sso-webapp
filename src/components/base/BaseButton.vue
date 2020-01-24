<template>
  <button
    :class="{
      'BaseButton_secondary': isSecondary,
      'BaseButton_align-with-text': alignWithText
    }"
    class="BaseButton"
    @click="raiseClickEvent">
    <slot />
  </button>
</template>

<script>
const primaryType = 'primary'
const secondaryType = 'secondary'

export default {
  name: 'BaseButton',

  props: {
    type: {
      type: primaryType | secondaryType,
      default: primaryType
    },
    alignWithText: {
      type: Boolean,
      default: false
    }
  },

  computed: {
    isSecondary () {
      return this.type === secondaryType
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
@import '../../assets/scss/colors.scss';
$color: $primary-color;
$offset-x: 0;
$padding-horizontal: 1em;

@mixin box-shadow-normal {
  $offset-y: 3px;
  $blur-radius: 14px;
  $spread-radius: -3px;
  $color: rgba(darken($color, 30%), .9);
  box-shadow: $offset-x $offset-y $blur-radius $spread-radius $color;
}

@mixin box-shadow-hover {
  $offset-y: 6px;
  $blur-radius: 35px;
  $spread-radius: -5px;
  $color: rgba(darken($color,15%), .8);
  box-shadow: $offset-x $offset-y $blur-radius $spread-radius $color;
  transition-duration: .13s;
}

@mixin box-shadow-secondary-hover {
  $offset-y: 0px;
  $blur-radius: 7px;
  $spread-radius: 0px;
  $color: rgba(black, .1);
  box-shadow: $offset-x $offset-y $blur-radius $spread-radius $color;
  transition-duration: .13s;
}

@mixin box-shadow-active {
  $offset-y: 0;
  $blur-radius: 8px;
  $spread-radius: -1px;
  $color: darken($color, 30%);
  box-shadow: $offset-x $offset-y $blur-radius $spread-radius $color;
  transition-duration: .08s;
}

@mixin box-shadow-secondary-active {
  $offset-y: 0;
  $blur-radius: 2px;
  $spread-radius: 0;
  $color: rgba(black, .07);
  box-shadow: $offset-x $offset-y $blur-radius $spread-radius $color;
  transition-duration: .08s;
}

.BaseButton {
  font-family: 'Lato', sans-serif;
  font-size: 1.2rem;
  font-weight: 700;
  letter-spacing: .02em;
  color: white;
  background: $color;
  background: linear-gradient(
    135deg,
    $primary-color 0%,
    #7C4BFC 100%
  );
  border-radius: .3em;
  padding: .6em $padding-horizontal;
  margin: 0 .5em;
  cursor: pointer;
  user-select: none;
  @include box-shadow-normal;
  transition: transform .2s ease-out,
              box-shadow .2s ease-out;

  &:hover { @include box-shadow-hover }
  &:active {
    @include box-shadow-active;
    transform: scale(.985)
  }

  &:first-of-type { margin-left: 0; }
  &:last-of-type { margin-right: 0; }

  &.BaseButton_align-with-text {
    margin-left: -$padding-horizontal;
  }

  &:disabled,
  &:disabled:hover,
  &:disabled:active,
  &:disabled:focus {
    box-shadow: none;
    filter: grayscale(10%);
    opacity: .5;
    cursor: default;
  }
}

.BaseButton_secondary {
  color: $color;
  background: transparent;
  box-shadow: none;

  &:hover { box-shadow: none; }
  &:active {
    background: rgba($color, .06);
    box-shadow: none;
  }
}
</style>
