<template>
  <ActivateLicenceBaseStep
    :title="$t('title.completed')"
    :button="$t('button.logIn')"
    :show-button="false"
    class="ViewActivateLicenceCompleted">
    <p class="email-sent" v-html="$t('message.emailSent')"/>
    <div class="card">
      <div class="check-sign">
        <CheckSign />
      </div>
      <span
        class="company-name">{{ companyName }}</span><span class="full-name">{{ name }}</span><span class="email">{{ email }}</span><span class="licence-key"><b>{{ $t('licenceKey') }}&nbsp;</b><span class="key">{{ licenceKey }}</span></span>
    </div>
  </ActivateLicenceBaseStep>
</template>

<script>
import ActivateLicenceBaseStep from '@/components/licence/ActivateLicenceBaseStep'

import CheckSign from '@/assets/svg/check-sign.svg'

export default {
  components: {
    ActivateLicenceBaseStep,
    CheckSign
  },

  data () {
    return {
      licenceKey: this.$store.get('ui/licence/key'),
      companyName: this.$store.get('ui/licence/companyName'),
      name: this.$store.get('ui/licence/owner@name'),
      email: this.$store.get('ui/licence/owner@email')
    }
  },

  created () {
    this.$store.set('ui/licence/currentStep', 0)
  },

  mounted () {
    this.$store.dispatch('ui/licence/clean')
  }
}
</script>

<style lang="scss" scoped>
@import '../../assets/scss/colors.scss';

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
    background: linear-gradient(
      135deg,
      $primary-color 0%,
      $secondary-color 100%
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
