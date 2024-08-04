export const get = async ({ app, store }) => {
  const files = await app.$axios.$get('/files')
  store.commit('files/setFiles', files)
  return files
}
