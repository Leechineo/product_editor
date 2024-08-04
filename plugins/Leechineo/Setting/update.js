const update = async ({ app }, id, category) => {
  await app.$axios.$patch('/setting', {
    id, ...category
  })
  await app.$leechineo.brands.get()
}

export { update }
