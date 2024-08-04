import uniqid from 'uniqid'

export const create = ({ app, store }) => {
  const draftId = uniqid('draft-')
  if (typeof localStorage === 'undefined') {
    return
  }
  if (!localStorage.productEditDrafts) {
    localStorage.setItem('productEditDrafts', '[]')
  }
  const allDrafts = JSON.parse(localStorage.productEditDrafts)
  const product = store.state.products.editing
  if (product.id) {
    const productDraft = allDrafts.find(draft => draft.id === product.id)
    if (productDraft) {
      store.commit('products/editing/setDraftId', productDraft.draftId)
      return
    }
  } else {
    const currentUnsavedDraft = allDrafts.find(draft => !draft.id)
    if (currentUnsavedDraft) {
      store.commit('products/editing/setDraftId', currentUnsavedDraft.draftId)
      return
    }
  }
  store.commit('products/editing/setDraftId', draftId)
  allDrafts.push(app.$leechineo.plugins.newObjFromOther({
    ...store.state.products.editing,
    createdAt: Date.now(),
    updatedAt: Date.now()
  }))
  localStorage.setItem('productEditDrafts', JSON.stringify(allDrafts))
}
