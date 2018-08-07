import api from '@/api/v1'

export async function removeActiveGroup ({ getters, commit, dispatch, rootState }) {
  const group = getters.activeGroup
  const { status } = await api.group.remove({ groupId: group.id })

  // We must delete the group from the existing list
  if (status === 200) {
    const groups = [...rootState.group.all]
    const index = groups.indexOf(group)
    groups.splice(index, 1)
    commit('group/SET_ALL', groups, { root: true })

    // We must select the default group
    dispatch('setDefaultGroupAsActive')
  }
}

export function setDefaultGroupAsActive ({ commit, rootState }) {
  const defaultGroup = rootState.group.defaultGroup
  if (defaultGroup) {
    commit('SET_ACTIVE_GROUP_ID', defaultGroup.id)
  }
}
