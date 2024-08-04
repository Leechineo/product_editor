export const get = async ({ app, store }, { page, id }) => {
  let urlPath = '/products'
  if (id) {
    urlPath = `/products/${id}`
  }
  const result = await app.$axios.$get(urlPath)
  // store.commit('products/setPage', page || 1)
  // store.commit('products/setProducts', result.items)
  // store.commit('products/setTotalItems', result.total)
  return result
}
