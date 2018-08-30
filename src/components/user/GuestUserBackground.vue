<template>
  <transition-group
    name="fade-in"
    tag="div"
    class="GuestUserBackground">
    <PurpleWave key="purpleWave" class="GuestUserBackground__purple-wave" />
    <Clouds key="clouds" class="GuestUserBackground__clouds" />
    <Planes key="planes" class="GuestUserBackground__planes" />
  </transition-group>
</template>

<script>
const Clouds = () => import('@/assets/svg/clouds.svg')
const Planes = () => import('@/assets/svg/planes.svg')
const PurpleWave = () => import('@/assets/svg/purple-wave.svg')

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

.GuestUserBackground__purple-wave {
  position: absolute;
  bottom: -15px;
  filter: drop-shadow(0 0 4px rgba(#341A4A, .48));
  transform: scale(1);
}

.GuestUserBackground__clouds {
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

.GuestUserBackground__planes {
  position: absolute;
  bottom: 36%;
  width: 82%;
  left: 50%;
  transform: translateX(-50%);
}

.fade-in-enter-active {
  transition: opacity .2s ease-in-out;
}

.fade-in-enter {
  opacity: 0
}
</style>
