<template>
  <main v-if="$mq !== 'mobile'" class="ViewDashboard">
    <BaseCard>
      <h2>Résumé des statistiques</h2>
      <h3>Plusieurs graphiques ou données numériques 📈📊</h3>
      <p>Omitto iuris dictionem in libera civitate contra leges senatusque consulta; caedes relinquo; libidines praetereo, quarum acerbissimum extat indicium et ad insignem memoriam turpitudinis et paene ad iustum odium imperii nostri, quod constat nobilissimas
      virgines.</p>
      <div class="ViewDashboard__actions">
        <router-link :to="{ name: 'dashboardUsers' }">
          <BaseButton type="secondary">{{ $t('button.manageUsers') }}</BaseButton>
        </router-link>
        <router-link :to="{ name: 'dashboardGroups' }">
          <BaseButton type="secondary">{{ $t('button.manageGroups') }}</BaseButton>
        </router-link>
      </div>
    </BaseCard>

    <router-view />
  </main>
</template>

<style lang="scss" scoped>
.ViewDashboard__actions {
  margin-top: 1em;
  display: flex;
  flex-direction: column;
 .BaseButton {
    min-width: auto;
  }
}
</style>
