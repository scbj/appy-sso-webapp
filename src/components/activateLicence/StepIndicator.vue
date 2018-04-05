<template lang="pug">
.step-indicator
  .progress
    .placeholder-line
    .line( :style='{ width: progression }' )
  .circle(
    v-for='n in count'
    :key='n'
    :class='{ pending: n <= active }'
  )
    span {{ n }}
</template>

<script>
export default {
  props: {
    active: {
      type: Number,
      required: true
    },
    count: {
      type: Number,
      required: true
    }
  },
  computed: {
    progression () {
      const stepGap = 100 / (this.count - 1)
      const percent = (this.active - 1) * stepGap
      return percent + '%'
    }
  }
}
</script>

<style lang="scss" scoped>
.step-indicator {
  --active-color: #9B049B;
  --inactive-color: #EBEBEB;
  --circle-size: 42px;
  --progress-height: 4px;

  position: relative;
  width: 100%;
  max-width: 560px;
  display: flex;
  justify-content: space-between;
}

.progress {
  // offset for handle border-radius optical illusion
  --offset: calc(var(--circle-size) / 2 - var(--progress-height) / 2);
  position: absolute;
  right: var(--offset);
  left: var(--offset);
  top: var(--offset);
}

.line,
.placeholder-line {
  position: absolute;
  height: var(--progress-height);
  border-radius: var(--progress-height);
}

.placeholder-line {
  background-color: var(--inactive-color);
  width: 100%;
}

.line {
  background-color: var(--active-color);
  transition: width .2s ease-in;
}

.circle {
  color: white;
  background-color: var(--inactive-color);
  font-size: 24px;
  width: var(--circle-size);
  height: var(--circle-size);
  border-radius: 50%;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: background-color .1s ease-in-out;

  &.pending {
    background-color: var(--active-color);
    transition: background-color .1s ease-in-out .2s;
    animation: pop .2s ease-in-out .2s;
  }

  > span {
    user-select: none;
    height: var(--circle-size);
    line-height: var(--circle-size);
  }
}

@keyframes pop {
  0% { transform: scale(1) }
  30% { transform: scale(1.13) }
  100% { transform: scale(1) }
}
</style>
