export const state = () => ({
  items: []
})

export const mutations = {
  setSettings (state, settings) {
    if (Array.isArray(settings)) {
      state.items = settings
    }
  }
}
