const _delete = async ({ app }, id) => {
  await app.$axios.$delete('/stocks', {
    params: { id }
  })
  await app.$leechineo.stock.get()
}

export { _delete }
