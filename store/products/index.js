export const state = () => ({
  items: [],
  totalItems: 0,
  page: 1,
  selected: 0
})

export const mutations = {
  addAddress (state, product) {
    if (!(state.items.filter(_product => _product._id === product._id).length)) {
      state.items.push(product)
    }
  },
  setProducts (state, products) {
    if (Array.isArray(products)) {
      state.items = products
    }
  },
  setTotalItems (state, quantity) {
    if (typeof quantity === 'number') {
      state.totalItems = quantity
    }
  },
  setPage (state, page) {
    if (typeof page === 'number' && page > 0 && page <= Math.ceil(state.totalItems / 3)) {
      state.page = page
    }
  },
  setSelected (state, selected) {
    state.selected = selected
  },
  deleteItem (state, id) {
    const product = state.items.find(_product => _product._id === id)
    const index = state.items.indexOf(product)
    state.items.splice(index, 1)
  }
}
