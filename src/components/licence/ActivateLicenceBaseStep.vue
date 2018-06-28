<template lang="pug">
.ActivateLicenceBaseStep
  h1 {{ title }}
  slot
  button(
    v-if='showButton'
    @click="$emit('next')"
    :class='{ pending }' ) {{ button | uppercase }}
</template>

<script>
import { uppercase } from '@/utils/filters'

export default {
  props: {
    title: { type: String, required: true },
    button: { type: String, required: true },
    showButton: { type: Boolean, default: true },
    pending: { type: Boolean, default: false }
  },

  filters: {
    uppercase
  }
}
</script>

<style lang="scss" scoped>
.ActivateLicenceBaseStep {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;

  > h1 {
    user-select: none;
    color: #9E3AA6;
    font-weight: 600;
    font-size: 2.55rem;
    text-align: center;
    margin-bottom: 4.2rem;
  }

  button::-moz-focus-inner {
    // Remove dotted outline on Firefox
    border: 0;
  }

  > button {
    overflow: hidden;
    cursor: pointer;
    user-select: none;
    --start-color: #A250E5;
    --stop-color: #7C4BFC;
    color: white;
    background: linear-gradient(
      135deg,
      var(--start-color) 0%,
      var(--stop-color) 100%
    );
    font-family: "source-sans-pro",sans-serif;
    font-size: 1.45rem;
    font-weight: 600;
    letter-spacing: .2em;
    border-radius: 5px;
    margin-top: 7.4rem;
    min-width: 12.7em;
    position: relative;
    box-shadow:
      0 3px 10px -3px rgba(black, .8);
    transition: box-shadow .2s ease-out;

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

    &.pending {
      color: transparent;

      &::before,
      &::after {
        $size: 30px;
        content: '';
        // border: 1px solid rgba(white, .8);
        border-radius: 50%;

        // Position
        position: absolute;
        top: 50%;
        left: 50%;
        width: $size;
        height: $size;
        transform: scale(1) translateX(-50%) translateY(-50%);
        // animation: pop 1.3s ease-in-out infinite;
        animation-duration: 1.1s;
        animation-iteration-count: infinite;
        animation-timing-function: ease-in-out;
      }

      $animation-duration: 1s;
      &::before {
        border: none;
        background-color: rgba(white, .4);
        animation-name: broadcast;
        animation-timing-function: ease-out;
        animation-delay: .24s;
      }
      &::after {
        background-color: rgba(white, .9);
        animation-name: breath;
      }
      $background-color: rgba(white, .3);
      $base-transform: translateX(-50%) translateY(-50%);
      @keyframes breath {
        0% {
          transform: $base-transform scale(.1);
        }
        40% {
          background-color: rgba(white, .6);
          transform: $base-transform scale(.8);
        }
        100% {
          // background-color: rgba(white, .7);
          transform: $base-transform scale(.1);
        }
      }

      @keyframes broadcast {
        0% {
          transform: $base-transform scale(0);
        }
        75% {
          transform: $base-transform scale(10);
        }
        90% {
          background-color: transparent;
          transform: $base-transform scale(1.1);
        }
        100% {
          background-color: transparent;
          transform: $base-transform scale(1);
        }
      }
    }
  }
}

</style>
