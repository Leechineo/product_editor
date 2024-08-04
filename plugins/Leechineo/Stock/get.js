export const get = async ({ app, store }, id) => {
  const stocks = await app.$axios.$get('/stocks', {
    params: { id }
  })
  store.commit('stocks/setStocks', stocks)
  return stocks
}
