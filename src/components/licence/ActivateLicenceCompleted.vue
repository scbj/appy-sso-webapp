<template lang="pug">
ActivateLicenceBaseStep.ActivateLicenceCompleted(
  :title="$t('title.completed')"
  :button="$t('button.logIn')"
  :showButton='false' )
  p.email-sent( v-html="$t('message.emailSent')" )
  .card
    .check-sign
      svg( xmlns='http://www.w3.org/2000/svg' viewBox='0 0 600 600' )
        path( fill='#fff' d='M7.7 404.6s115.2 129.7 138.2 182.7h99c41.5-126.7 202.7-429.1 340.9-535.1 28.6-36.8-43.3-52-101.3-27.6C397 61.3 232 341.7 201.2 409.2c-43.8 11.5-89.8-73.7-89.8-73.7L7.7 404.6z' )
    span.company-name {{ companyName }}
    span.full-name {{ name }}
    span.email {{ email }}
    span.licence-key
      b {{ $t('licenceKey') }}&nbsp;
      span.key {{ licenceKey }}
</template>

<script>
import ActivateLicenceBaseStep from './ActivateLicenceBaseStep'

export default {
  components: {
    ActivateLicenceBaseStep
  },

  data () {
    return {
      licenceKey: this.$store.state.licence.key,
      companyName: this.$store.state.licence.companyName,
      name: this.$store.state.licence.owner.name,
      email: this.$store.state.licence.owner.email
    }
  },

  created () {
    this.$store.dispatch('licence/updateCurrentStep', { step: 0 })
  },

  mounted () {
    this.$store.dispatch('licence/clean')
  }
}
</script>

<style lang="scss" scoped>
.email-sent {
  color: #5C565E;
  font-size: 1.76rem;
  text-align: center;
  white-space:pre;
  transform: translateY(-25px)
}

.card,
.check-sign {
  display: flex;
  align-items: center;
  justify-content: center;
  filter: drop-shadow(0 6px 6px rgba(#393939, .1));
}

.card {
  background: radial-gradient(
    circle at top,
    transparent 0%,
    transparent 42px,
    white 43px,
    white 100%
  );
  font-size: 1.2rem;
  border-radius: 15px;
  margin-top: .7rem;
  padding: 4.5rem 3rem 2.5rem 3rem;
  text-align: center;
  flex-direction: column;
  position: relative;
  width: 460px;

  .check-sign {
    --start-color: #A250E5;
    --stop-color: #7C4BFC;
    background: linear-gradient(
      135deg,
      var(--start-color) 0%,
      var(--stop-color) 100%
    );
    border-radius: 50%;
    position: absolute;
    left: 50%;
    top: 0;
    width: 60px;
    height: 60px;
    transform: translateX(-50%) translateY(-50%);

    svg { width: 48% }
  }
}

span {
  color: #5C565E;

  &.company-name {
    font-size: 1.783em;
    font-weight: 600;
  }

  &.full-name,
  &.email {
    font-size: 1.5em;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    width: 100%;
  }

  &.full-name {
    color: #A250E5;
    font-weight: 600;
    margin-top: .5rem;
  }

  &.licence-key {
    margin-top: 1.8rem;
    b {
      user-select: none;
      font-weight: 600
    }
    .key { font-family: 'Consolas' }
  }
}

span.full-name,
span.company-name,
span.email,
span.key {
  user-select: text;
}
</style>
