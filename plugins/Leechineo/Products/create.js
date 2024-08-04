const create = async ({ app }, product) => {
  await app.$axios.$post('/products', product)
  await app.$leechineo.products.get({ page: 1 })
}

export { create }
