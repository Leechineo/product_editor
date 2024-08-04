export const get = async ({ app, store }, id) => {
  let url = '/brands/'
  if (id) {
    url = `/brands/${id}`
  }
  const brands = await app.$axios.$get(url, {
    params: { id }
  })
  store.commit('brands/setBrands', brands)
  return brands
}
