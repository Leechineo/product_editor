export const getUrl = ({ app }, file) => {
  let id
  if (typeof file === 'undefined') {
    return
  }
  if (typeof file === 'string') {
    id = file
  } else {
    id = file.id
  }
  return app.$axios.defaults.baseURL + `files/${id}`
}
