const create = async ({ app }, category) => {
  await app.$axios.$post('/categories', category)
  await app.$leechineo.categories.get()
}

export { create }
