const findCategory = (id, categories) => {
  for (const category of categories) {
    if (category.id === id) {
      return category
    } else if (category.subcategories?.length) {
      const categoryFound = findCategory(id, category.subcategories)
      if (categoryFound?.id === id) {
        return categoryFound
      }
    }
  }
  return null
}

export const get = async ({ app, store }, id) => {
  if (id) {
    if (store.state.categories.items.length) {
      return findCategory(id, store.state.categories.items)
    }
  }
  const categories = await app.$axios.$get('/categories/', {
    params: { id }
  })
  store.commit('categories/setCategories', categories)
  return categories
}
