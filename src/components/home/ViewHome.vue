<template lang="pug">
.ViewHome
  HomeGreeting( v-if="$mq !== 'mobile'" )
  ApplicationList
</template>

<script>
import ApplicationList from '@/components/home/ApplicationList'
import HomeGreeting from '@/components/home/HomeGreeting'

export default {
  components: {
    ApplicationList,
    HomeGreeting
  }
}
</script>
