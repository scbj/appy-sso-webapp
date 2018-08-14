<template>
  <div class="GuestUserBackground">
    <PurpleWave />
    <Clouds />
    <Planes />
  </div>
</template>

<script>
import Clouds from '@/assets/svg/clouds.svg'
import Planes from '@/assets/svg/planes.svg'
import PurpleWave from '@/assets/svg/purple-wave.svg'

export default {
  components: {
    Clouds,
    Planes,
    PurpleWave
  }
}
</script>

<style lang="scss" scoped>
.GuestUserBackground {
  overflow: hidden;
}

svg.purple-wave {
  position: absolute;
  bottom: -15px;
  filter: drop-shadow(0 0 4px rgba(#341A4A, .48))
}

svg.clouds {
  position: absolute;
  top: 7%;
  width: 84%;
  left: 50%;
  transform: translateX(-50%);
  animation: flow 3s ease-in-out alternate infinite;

  @keyframes flow {
    from { transform: translateX(-50%) translateY(0) }
    to { transform: translateX(-50%) translateY(-10px) }
  }
}

svg.planes {
  position: absolute;
  bottom: 36%;
  width: 82%;
  left: 50%;
  transform: translateX(-50%);
}
</style>
