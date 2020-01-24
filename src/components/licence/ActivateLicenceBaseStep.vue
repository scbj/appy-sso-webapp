<template>
  <div class="ActivateLicenceBaseStep">
    <h1>{{ title }}</h1>
    <slot/>
    <BaseButton
      v-if="showButton"
      :class="{ pending }"
      class="ActivateLicenceBaseStep__validate-button"
      @click="$emit('next')">
      {{ button | uppercase }}
    </BaseButton>
  </div>
</template>

<script>
import { uppercase } from '@/utils/filters'

export default {
  filters: {
    uppercase
  },

  props: {
    title: { type: String, required: true },
    button: { type: String, required: true },
    showButton: { type: Boolean, default: true },
    pending: { type: Boolean, default: false }
  }
}
</script>

<style lang="scss" scoped>
$error-color: #C70F0F;
$input-color: #707070;

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

  input::-ms-clear {
    display: none;
  }

  input {
    color: $input-color;
    font-family: 'Source Sans Pro', sans-serif;
    font-size: 1.8rem;
    border: 1px solid #E4E4E4;
    border-radius: 5px;
    padding: 1.2rem 3rem;
    box-shadow: 0 3px 14px -1px rgba(#393939, 0.1);
    transition: box-shadow .1s ease-in-out;

    &:focus, &:active {
      outline: none;
      box-shadow: 0 3px 14px -1px rgba(#393939, 0.2);
    }
  }

  input::placeholder,
  .placeholder {
    opacity: .2;
    color: $input-color;
  }

  .message.error {
    color: $error-color;
    font-size: 1.33rem;
    font-weight: 600;
    margin-top: 1.2rem;
  }

  .message.error > .learn-more {
    cursor: help;
    position: relative;
    max-width: 30em;

    &::after {
      content: '';
      background-color: $error-color;
      position: absolute;
      height: 1px;
      width: 100%;
      left: 0;
      bottom: -.1em;
    }
  }
}

.BaseButton.ActivateLicenceBaseStep__validate-button {
  margin-top: 7.4rem;
  min-width: 12.7em;
  position: relative;
  overflow: hidden;

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

</style>
