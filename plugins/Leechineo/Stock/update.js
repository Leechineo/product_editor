const update = async ({ app }, id, stock) => {
  await app.$axios.$patch('/stocks', {
    id, ...stock
  })
  await app.$leechineo.stock.get()
}

export { update }
