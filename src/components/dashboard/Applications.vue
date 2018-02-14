<template lang="pug">
.ay-applications
  .app( v-for="app in apps" :key="app.name" )
    img.logo( :src="app.logoUrl" :alt="app.name" )
    span.name( v-text="app.name" )
</template>

<script>
export default {
  data () {
    return {
      apps: [
        {
          name: 'Brainstormin',
          logoUrl: '/static/img/logo-brainstormin.png'
        },
        {
          name: 'Progress',
          logoUrl: '/static/img/logo-progress.png'
        },
        {
          name: 'Sondage',
          logoUrl: '/static/img/logo-sondage.png'
        },
        {
          name: 'TextIt',
          logoUrl: '/static/img/logo-textit.png'
        }
      ]
    }
  }
}
</script>

<style lang="scss">
.ay-applications {
  display: flex;
  flex-flow: wrap;

  * {
    // border: 1px solid rgba(red, .08);
  }
}

.app {
  cursor: pointer;
  display: flex;
  flex-direction: column;
  margin: 1rem;
  padding: 0 2rem;
  box-shadow: 0 0px 5px 0 rgba(0,0,0,.0);
  transition: background-color .3s ease-in-out,
              box-shadow .3s ease-in-out;

  &:hover {
    background-color: white;
    box-shadow: 0 8px 16px 0 rgba(0,0,0,.1);
    transition: background-color .1s ease-in-out,
                box-shadow .1s ease-in-out;
  }

  img.logo {
    width: 120px;
    height: 120px;
    margin-top: 2rem;
  }

  span.name {
    font-family: "source-sans-pro";
    font-weight: 500;
    font-size: 1.3rem;
    line-height: 4em;
  }
}
</style>
