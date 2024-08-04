const update = async ({ app }, id, category) => {
  await app.$axios.$patch('/brands', {
    id, ...category
  })
  await app.$leechineo.brands.get()
}

export { update }
