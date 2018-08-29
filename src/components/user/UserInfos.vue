<template>
  <div v-loading="!ready" class="UserInfos">
    <div class="UserInfos__header">
      <h3>{{ username }}</h3>
      <BaseImage :src="user.pictureUrl" fallback-src="/static/img/default-user-picture.png" />
    </div>
    <span v-if="isAdmin" class="UserInfos__admin">{{ $t('administrator') }}</span>
    <span class="UserInfos__group">{{ groupName }}</span>

    <!-- General informations section -->
    <UserInfosSection :title="$t('title.generalInformations')">
      <span>{{ user.email }}</span>
    </UserInfosSection>

    <!-- Activity section -->
    <UserInfosSection :title="$t('title.activity')">
      <span v-if="user.createdAt">{{ $t('infos.createdAt') }} <BaseDate :date="user.createdAt" :relative="false" /></span>
      <span v-if="user.updatedAt">{{ $t('infos.modifiedAt') }} <BaseDate :date="user.updatedAt" /></span>
      <span>Dernière connexion il y a ... ?</span>
    </UserInfosSection>

    <!-- Applications section -->
    <UserInfosSection v-if="apps.length" :title="$t('title.accessibleApps')">
      <ul class="UserInfos__app-list">
        <BaseImage
          v-for="app in apps"
          :key="app.id"
          :src="app.pictureUrl"
          :title="app.name"
          fallback-src="/static/img/logo-default.png"
          class="UserInfos__app"
          draggable="false"/>
      </ul>
    </UserInfosSection>

    <!-- Archive user button -->
    <BaseButton
      class="UserInfos__archive-user"
      type="secondary"
      @click="onArchiveUserClick">
      {{ archiveUserButtonText }}
    </basebutton>
  </div>
</template>

<script>
import api from '@/services/api/v1'
import UserInfosSection from '@/components/user/UserInfosSection'

export default {
  components: {
    UserInfosSection
  },

  props: {
    user: {
      type: Object,
      required: true
    }
  },

  data () {
    return {
      ready: false,
      apps: [],
      waitingArchivingConfirmation: false
    }
  },

  computed: {
    username () {
      const { firstname, lastname } = this.user
      return `${firstname} ${lastname}`
    },

    isAdmin () {
      return this.user.roleName === 'admin'
    },

    groupName () {
      const { groupName } = this.user
      return groupName === 'default'
        ? this.$t('byDefault')
        : groupName
    },

    archiveUserButtonText () {
      const resourceName = this.waitingArchivingConfirmation
        ? 'button.archiveUserConfirmation'
        : 'button.archiveUser'
      return this.$t(resourceName)
    }
  },

  async mounted () {
    // We must download the list of applications that are accessible for this user
    const { status, data: apps } = await api.group.listApplications({
      groupId: this.user.groupId
    })

    // If everything went well then save it in the data
    if (status === 200) {
      this.apps = apps
    }

    this.ready = true
  },

  methods: {
    onArchiveUserClick () {
      if (this.waitingArchivingConfirmation) {
        return this.$emit('delete-user')
      }

      this.waitingArchivingConfirmation = true
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../assets/scss/mixins.scss';
@import '../../assets/scss/colors.scss';

.UserInfos {
  padding: .5rem 1rem;
  display: flex;
  flex-direction: column;
}

.UserInfos__header {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  > h3 {
    margin-right: 1em;
  }

  > .BaseImage {
    border-radius: 50%;
    box-shadow: 0 0 0 1px  rgba(#d9d9d9, .2);
    @include size(54px)
  }
}

.UserInfos__admin {
  color: #ce1e1e;
  user-select: none
}

.UserInfos__group {
  color: $primary-color;
  margin-top: .3em;
}

.UserInfos__app-list {
  display: flex;
  flex-direction: row;
}

.UserInfos__app {
  @include size(40px);
  border-radius: 6px;
  margin-right: 1em;
  margin-top: .5em;
}

.UserInfos__archive-user {
  color: #ce1e1e;
  margin-top: 3em;
  align-self: center;
}
</style>
