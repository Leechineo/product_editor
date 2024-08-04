const _delete = async ({ app }, id) => {
  await app.$axios.$delete('/categories/', {
    params: { id }
  })
  await app.$leechineo.categories.get()
}

export { _delete }
