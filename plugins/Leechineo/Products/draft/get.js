export const get = ({ store }) => {
  if (typeof localStorage === 'undefined') {
    return
  }
  if (!localStorage.productEditDrafts) {
    return
  }
  const allDrafts = JSON.parse(localStorage.productEditDrafts)
  const product = store.state.products.editing
  const currentUnsavedDraft = allDrafts.find(draft => draft.draftId === product.draftId)
  return currentUnsavedDraft
}
