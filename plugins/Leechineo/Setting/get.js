export const get = async ({ app, store }, name) => {
  if (store.state.auth?.loggedIn) {
    const settings = await app.$axios.$get('/settings', {
      params: { name }
    })
    store.commit('setting/setSettings', settings)
    return settings
  }
}
