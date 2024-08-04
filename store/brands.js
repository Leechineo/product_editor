export const state = () => ({
  items: []
})

export const mutations = {
  setBrands (state, brands) {
    if (Array.isArray(brands)) {
      state.items = brands
    }
  }
}
