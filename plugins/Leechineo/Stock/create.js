export const create = async ({ app }, stock) => {
  await app.$axios.$post('/stocks', stock)
  await app.$leechineo.stock.get()
}
