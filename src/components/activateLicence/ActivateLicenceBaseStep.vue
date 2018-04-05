<template lang="pug">
.activate-licence-base-step
  h1 {{ title }}
  //- slot
  button( @click="$emit('next')" ) {{ button }}
</template>

<script>
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
  }
}
</script>

<style lang="scss" scoped>
.activate-licence-base-step {
  display: flex;
  flex-direction: column;
  align-items: center;

  > h1 {
    color: #9B049B;
    font-weight: 600;
    font-size: 2.55rem;
  }

  > button {
    cursor: pointer;
    user-select: none;
    --start-color: #A250E5;
    --stop-color: #7C4BFC;
    background: linear-gradient(
      135deg,
      #a250e5 0%,
      #7c4bfc 100%
    );
    color: white;
    font-family: "source-sans-pro",sans-serif;
    font-size: 1.45rem;
    font-weight: 600;
    letter-spacing: .2em;
    border-radius: 5px;
    min-width: 12.7em;
    box-shadow: 0 3px 10px -2px rgba(black, .5);
    transition: box-shadow .2s ease-out,
                transform .2s ease-in-out;

    &:active, &:focus {
      outline: none;
    }

    &:hover {
      box-shadow: 0 4px 18px -3px rgba(black, .7);
      // transform: translateY(-2px);
    }
  }
}

</style>
