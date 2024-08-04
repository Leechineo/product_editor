export const state = () => ({
  items: []
})

export const mutations = {
  setStocks (state, stocks) {
    if (Array.isArray(stocks)) {
      state.items = stocks
    }
  }
}
