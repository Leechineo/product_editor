const update = async ({ app }, id, category) => {
  await app.$axios.$patch('/categories', {
    id, ...category
  })
  await app.$leechineo.categories.get()
}

export { update }
