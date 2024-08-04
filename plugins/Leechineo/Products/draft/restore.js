export const restore = ({ store }) => {
  if (typeof localStorage === 'undefined') {
    return
  }
  if (!localStorage.productEditDrafts) {
    return
  }
  const allDrafts = JSON.parse(localStorage.productEditDrafts)
  const product = store.state.products.editing
  const currentUnsavedDraft = allDrafts.find(draft => draft.draftId === product.draftId)
  store.commit('products/editing/setProductStocks', { dbStocks: store.state.stocks.items, productStocks: currentUnsavedDraft.stocks })
  if (currentUnsavedDraft.draftId) {
    store.commit('products/editing/setProductId', currentUnsavedDraft.id)
    store.commit('products/editing/setProductImages', currentUnsavedDraft.images)
    store.commit('products/editing/setBasicInformations', {
      name: currentUnsavedDraft.name,
      description: currentUnsavedDraft.description
    })
    store.commit('products/editing/setProductCategory', currentUnsavedDraft.category)
    store.commit('products/editing/setProductBrand', currentUnsavedDraft.brand)
    store.commit('products/editing/setProductSpecifications', currentUnsavedDraft.specifications.map(spec => ({ deleteDialog: false, ...spec })))
  }
}
