const _delete = async ({ app }, id) => {
  await app.$axios.$delete('/brands', {
    params: { id }
  })
  await app.$leechineo.brands.get()
}

export { _delete }
