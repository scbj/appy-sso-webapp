<template lang="pug">
.ViewDashboard( v-if="$mq !== 'mobile'" )
  BaseCard
    h2 Résumé des statistiques
    h3 Plusieurs graphiques ou données numériques 📈📊
    p Omitto iuris dictionem in libera civitate contra leges senatusque consulta; caedes relinquo; libidines praetereo, quarum acerbissimum extat indicium et ad insignem memoriam turpitudinis et paene ad iustum odium imperii nostri, quod constat nobilissimas virgines.
  BaseCard.ViewDashboard__actions
    .ViewDashboard__manage-users
      router-link( :to="{ name: 'dashboardUsers' }" )
        button Gérer les utilisateurs
    .ViewDashboard__manage-groups
      router-link( :to="{ name: 'dashboardGroups' }" )
        button Gérer les groupes
  router-view
</template>

<style lang="scss" scoped>
.ViewDashboard__actions {
  margin-top: 2rem;
  display: flex;
  justify-content: space-around;
}

button::-moz-focus-inner {
  // Remove dotted outline on Firefox
  border: 0;
}

button {
  overflow: hidden;
  cursor: pointer;
  user-select: none;
  --start-color: #A250E5;
  --stop-color: #7C4BFC;
  color: white;
  background: linear-gradient(
    135deg,
    var(--start-color) 0%,
    var(--stop-color) 100%
  );
  background: var(--start-color);
  font-family: "lato";
  font-size: 1.45rem;
  font-weight: 600;
  // letter-spacing: .2em;
  border-radius: 5px;
  min-width: 12.7em;
  position: relative;
  box-shadow:
    0 3px 10px -3px rgba(black, .8);
  transition: box-shadow .2s ease-out;

  &:hover {
    box-shadow:
      0 8px 37px -8px rgba(black, .7);
  }

  &:active {
    box-shadow:
      0 0px 8px -2px rgba(black, .5),
      0 0 0 1px rgba(black, .06) inset;
    transition-duration: .06s;
  }
}
</style>
