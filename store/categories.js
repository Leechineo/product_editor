export const state = () => ({
  items: []
})

export const mutations = {
  setCategories (state, categories) {
    if (Array.isArray(categories)) {
      state.items = categories
    }
  }
}
