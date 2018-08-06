<template>
  <li
    class="DashboardGroupListItem"
    :class="{
      'DashboardGroupListItem_read-only': readOnly,
      'DashboardGroupListItem_empty': !hasUsers,
      'DashboardGroupListItem_active': isActive
    }"
  >
    <span class="DashboardGroupListItem__name">{{ name }}</span>
    <span v-if="hasUsers" class="DashboardGroupListItem__count">{{ count }}</span>
  </li>
</template>

<script>
import { get } from 'vuex-pathify'

export default {
  props: {
    group: {
      type: Object,
      required: true
    },
    readOnly: {
      type: Boolean,
      default: false
    },
    overrideName: {
      type: String,
      default: ''
    }
  },

  computed: {
    activeGroupId: get('ui/dashboard/groups/activeGroupId'),

    name () {
      const { name } = this.group
      return this.overrideName || name
    },

    count () {
      return this.group.userCount
    },

    hasUsers () {
      return !!this.count
    },

    isActive () {
      return this.group.id === this.activeGroupId
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../assets/scss/colors.scss';

.DashboardGroupListItem {
  padding: .3em 0;
  margin: .2em 0;
  position: relative;
  user-select: none;

  &:hover::after { opacity: 1 }

  &.DashboardGroupListItem_read-only {
    .DashboardGroupListItem__name {
      font-style: italic
    }
  }

  &.DashboardGroupListItem_empty{
    .DashboardGroupListItem__name {
      opacity: .6;
    }
  }

  &.DashboardGroupListItem_active {
    color: $primaryColor;

    .DashboardGroupListItem__name { opacity: 1 }
  }

  &.DashboardGroupListItem_active::before {
    opacity: 1;
    // transition-duration: .0s;
  }
}

.DashboardGroupListItem::before {
  $size: .3em;
  content: '';
  background: $primaryColor;
  border-radius: 50%;
  opacity: 0;
  position: absolute;
  top: 50%;
  left: -1.4em;
  width: $size;
  height: $size;
  transform: translateY(-50%);
  transition: opacity .08s ease-in-out;
}

.DashboardGroupListItem::after {
  $side-padding: -0.6em;

  content: '';
  // background: rgba($primaryColor, .1);
  background: rgba(black, .04);
  border-radius: 6px;
  opacity: 0;
  position: absolute;
  top: 0;
  bottom: 0;
  left: $side-padding;
  right: $side-padding;
}

.DashboardGroupListItem__count {
  color: $primaryColor;
  margin-left: .5em;
}
</style>
