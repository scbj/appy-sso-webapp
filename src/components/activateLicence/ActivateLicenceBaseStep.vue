<template lang="pug">
.activate-licence-base-step
  h1 {{ title }}
  slot
  button( @click="$emit('next')" ) {{ button | uppercase }}
</template>

<script>
import { uppercase } from '@/utils/filters'

export default {
  props: {
    title: {
      type: String,
      required: true
    },
    button: {
      type: String,
      required: true
    }
  },

  filters: {
    uppercase
  }
}
</script>

<style lang="scss" scoped>
.activate-licence-base-step {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;

  > h1 {
    color: #9E3AA6;
    font-weight: 600;
    font-size: 2.55rem;
    margin-bottom: 4.2rem;
  }

  > button {
    cursor: pointer;
    user-select: none;
    --start-color: #A250E5;
    --stop-color: #7C4BFC;
    background: linear-gradient(
      135deg,
      var(--start-color) 0%,
      var(--stop-color) 100%
    );
    color: white;
    font-family: "source-sans-pro",sans-serif;
    font-size: 1.45rem;
    font-weight: 600;
    letter-spacing: .2em;
    border-radius: 5px;
    margin-top: 7.4rem;
    min-width: 12.7em;
    box-shadow:
      0 3px 10px -3px rgba(black, .8);
    transition: box-shadow .2s ease-out;

    &:active, &:focus {
      outline: none;
    }

    &:hover {
      box-shadow:
        0 8px 37px -8px rgba(black, .7);
    }

    &:active {
      box-shadow:
        0 0px 8px -2px rgba(black, .5),
        0 0 0 1px rgba(black, .06) inset;
      transition-duration: .06s;
    }
  }
}

</style>
