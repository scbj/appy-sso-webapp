<template>
  <div class="GuestUser">
    <!-- Cloud and airplane background illustration  -->
    <GuestUserBackground class="GuestUser__background" />

    <div class="GuestUser__content">
      <h3 class="GuestUser__title">{{ $t('title.guestUser') }}</h3>
      <span class="GuestUser__group">{{ groupName }}</span>
      <span class="GuestUser__invitation-sent" v-html="$t('message.invitationSent')" />
      <span class="GuestUser__email">{{ user.email }}</span>
      <BaseButton
        class="UserInfos__cancel-invitation"
        type="secondary"
        @click="onCancelInvitationClick">
        {{ $t('button.cancelInvitation') }}
      </basebutton>
    </div>

  </div>
</template>

<script>
import GuestUserBackground from './GuestUserBackground'

export default {
  components: {
    GuestUserBackground
  },

  props: {
    user: {
      type: Object,
      required: true
    }
  },

  computed: {
    groupName () {
      const { groupName } = this.user
      return groupName === 'default'
        ? this.$t('byDefault')
        : groupName
    }
  },

  methods: {
    onCancelInvitationClick () {
      this.$emit('delete-user')
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../assets/scss/colors.scss';
@import '../../assets/scss/vars.scss';

.GuestUser {
  position: relative;
}

.GuestUser__content {
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  z-index: $z-index-modal + 2;
}

.GuestUser__background {
  margin: -2rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  z-index: $z-index-modal + 1;
}

.GuestUser__title {
  margin-top: 1.3em;
  user-select: none;
}

.GuestUser__group {
  margin-top: .5em;
}

.GuestUser__invitation-sent {
  color: $primary-color;
  margin-top: 4em;
  text-align: center;
  user-select: none;
}

.GuestUser__email {
  margin-top: 1em;
}

.UserInfos__cancel-invitation {
  color: white;
  margin-top: 11em;
}
</style>
