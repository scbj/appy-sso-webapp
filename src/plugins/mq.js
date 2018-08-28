import Vue from 'vue'
import VueMq from 'vue-mq'

Vue.use(VueMq, {
  breakpoints: {
    // synchronise this value with the CSS variables
    mobile: 500,
    tablet: 900,
    laptop: 1250,
    desktop: Infinity
  }
})
