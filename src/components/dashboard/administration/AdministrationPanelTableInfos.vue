<template lang="pug">
.AdministrationPanelTableInfos
  h2 <span class='number'>{{ totalUsers }}</span> utilisateurs dans le groupe
  h3
    | dont&nbsp;
    el-tooltip
      div( slot='content' )
        div Obi-Wan Kenobi 🌌
        div Anakin Skywalker 💮
      span.number 2
    | &nbsp;administrateurs
</template>

<script>
import { get } from 'vuex-pathify'

export default {
  computed: {
    totalUsers: get('dashboardAdministration/totalUsers')
  }
}
</script>

<style lang="scss" scoped>
h2 {
  font-size: 2rem;
  font-weight: 400;
  margin: 1rem 0 0 2rem;

  > .number {
    font-size: 3rem;
    font-weight: 600;
    margin-right: 1rem;
  }
}

h3 {
  color: #A250E5;
  font-size: 1.4rem;
  font-weight: 400;
  margin: 0 0 1rem 2rem;

  > .number {
    cursor: help;
    font-size: 1.5rem;
    font-weight: 600;
    position: relative;
  }
}
</style>
