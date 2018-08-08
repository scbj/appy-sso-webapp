<template lang="pug">
.StepIndicator
  .progress
    .placeholder-line
    .line( :style='{ width: progression }' )
  .circle(
    v-for='n in count'
    :key='n'
    :class='{ pending: n > active }' )
    span {{ n }}
</template>

<script>
export default {
  props: {
    active: { type: Number, required: true },
    count: { type: Number, required: true }
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
$active-color: #9E3AA6;
$inactive-color: #EBEBEB;
$circle-size: 34px;
$progress-height: 4px;

.StepIndicator {

  // display: flex;
  justify-content: space-between;
  position: relative;
  width: 100%;
  max-width: 450px;
}

.progress {
  // offset for handle border-radius optical illusion
  $offset: calc(#{$circle-size} / 2 - #{$progress-height} / 2);
  position: absolute;
  right: $offset;
  left: $offset;
  top: $offset;
}

.line,
.placeholder-line {
  border-radius: $progress-height;
  position: absolute;
  height: $progress-height;
}

.placeholder-line {
  background-color: $inactive-color;
  width: 100%;
}

.line {
  background-color: $active-color;
  transition: width .2s ease-in;
}

.circle {
  color: white;
  background-color: $active-color;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  width: $circle-size;
  height: $circle-size;
  transition: background-color .1s ease-in-out .2s;
  animation: pop .2s ease-in-out .2s;

  &.pending {
    background-color: $inactive-color;
    transition: background-color .1s ease-in-out;
    animation: none;
  }

  > span {
    user-select: none;
    font-size: 20px;
    height: $circle-size;
    line-height: $circle-size;
  }
}

@keyframes pop {
  0% { transform: scale(1) }
  30% { transform: scale(1.13) }
  100% { transform: scale(1) }
}
</style>
