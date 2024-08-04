export const create = async ({ app }, brand) => {
  await app.$axios.$post('/brands', brand)
  await app.$leechineo.brands.get()
}
