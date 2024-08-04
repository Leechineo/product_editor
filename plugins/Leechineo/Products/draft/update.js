export const update = ({ store }) => {
  if (typeof localStorage === 'undefined') {
    return
  }
  if (!localStorage.productEditDrafts) {
    return
  }
  const allDrafts = JSON.parse(localStorage.productEditDrafts)
  const product = store.state.products.editing
  let currentUnsavedDraft = allDrafts.find(draft => draft.draftId === product.draftId)
  currentUnsavedDraft = {
    ...product,
    ...{
      createdAt: currentUnsavedDraft.createdAt,
      updatedAt: Date.now()
    }
  }
  const indexOfDraft = allDrafts.indexOf(allDrafts.find(draft => draft.draftId === currentUnsavedDraft.draftId))
  allDrafts[indexOfDraft] = currentUnsavedDraft
  localStorage.setItem('productEditDrafts', JSON.stringify(allDrafts))
}
