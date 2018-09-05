<template>
  <main :class="$mq" class="ViewSettings">
    <h2 class="ViewSettings__title">{{ $t('settings') }}</h2>
    <h4 v-show="updateProfileSuccessfully" class="ViewSettings__status">
      <BaseIcon name="md-checkmark-circle" />
      <span>{{ $t('message.saved') }}</span>
    </h4>
    <UserInfosSection :title="$t('label.firstname')">
      <BaseTextEditable
        :value="firstname"
        :placeholder="$t('placeholder.empty.firstname')"
        @changed="update({ firstname: $event })" />
    </UserInfosSection>
    <UserInfosSection :title="$t('label.lastname')">
      <BaseTextEditable
        :value="lastname"
        :placeholder="$t('placeholder.empty.lastname')"
        @changed="update({ lastname: $event })" />
    </UserInfosSection>
    <UserInfosSection :title="$t('label.email')">
      {{ email }}
    </UserInfosSection>
    <UserInfosSection :title="$t('label.company')">
      {{ companyName || 'Chargement...' }}
    </UserInfosSection>
    <UserInfosSection :title="$t('label.group')">
      {{ groupName }}
    </UserInfosSection>
    <UserInfosSection v-if="$mq === 'mobile'" title="Langue préférée">
      <BaseLanguageSwitch class="ViewSettings__language-select" />
    </UserInfosSection>
    <BaseButton
      :align-with-text="true"
      class="ViewSettings__log-out-button"
      type="secondary"
      @click="logout">
      {{ $t('button.logOut') }}
    </BaseButton>
  </main>
</template>

<script>
import { get } from 'vuex-pathify'

import UserInfosSection from '@/components/user/UserInfosSection'

export default {
  components: {
    UserInfosSection
  },

  data () {
    return {
      updateProfileSuccessfully: false
    }
  },

  computed: {
    pictureUrl: get('user/current@pictureUrl'),
    firstname: get('user/current@firstname'),
    lastname: get('user/current@lastname'),
    email: get('user/current@email'),
    companyName: get('company/current@name'),

    groupName () {
      const groupName = this.$store.get('user/current@groupName')
      return groupName === 'default'
        ? this.$t('byDefault')
        : groupName
    }
  },

  mounted () {
    this.$store.dispatch('company/fetch')
  },

  methods: {
    async update (payload) {
      this.updateProfileSuccessfully = false
      const user = await this.$store.dispatch('user/updateSelf', payload)
      if (user) {
        this.updateProfileSuccessfully = true
      }
    },

    logout () {
      this.$store.dispatch('auth/logout')
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../assets/scss/mixins.scss';

.ViewSettings {
  position: relative;
}

.ViewSettings.mobile {
  padding: 1rem;
}

.ViewSettings__title {
  user-select: none;
}

.ViewSettings__language-select {
  align-self: flex-start;
}

.UserInfosSection {
  max-width: 10rem;
  width: 40%;
}

.ViewSettings__status {
  font-weight: normal;
  position: absolute;
  right: 0;
  top: 0;
  margin: 1rem 3rem;

  > span {
    margin-left: 1rem;
  }
}

.ViewSettings__log-out-button {
  color: #ce1e1e;
  margin-top: 2rem;
}
</style>
