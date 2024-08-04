const update = async ({ app }, id, product) => {
  await app.$axios.$patch('/products', {
    id, ...product
  })
  await app.$leechineo.products.get()
}

export { update }
