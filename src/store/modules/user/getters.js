export function username (state) {
  return `${state.firstname} ${state.lastname}`
}

export function currentPage (state) {
  return state.all.currentPage
}

export function total (state) {
  return state.all.total
}

export function perPage (state) {
  return state.all.perPage
}

export function users (state) {
  return state.all.list
}
