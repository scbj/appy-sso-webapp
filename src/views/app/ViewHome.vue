<template>
  <main class="ViewHome">
    <HomeGreeting v-if="$mq !== 'mobile'" />
    <HomeApplicationList />
  </main>
</template>

<script>
import HomeApplicationList from '@/components/home/HomeApplicationList'
import HomeGreeting from '@/components/home/HomeGreeting'

export default {
  components: {
    HomeApplicationList,
    HomeGreeting
  }
}
</script>
