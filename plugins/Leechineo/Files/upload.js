export const upload = async ({ app }, file, path, params) => {
  const sanitizedPath = path.replace(/\.(?=.*\.)/g, '-').replace(/-/g, '').replaceAll(' ', '').trim()
  const formData = new FormData()
  formData.append('file', file)
  const fileObject = await app.$axios.$post('/files', formData, {
    params: {
      path: sanitizedPath,
      ...params
    },
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
  await app.$leechineo.files.get()
  return fileObject
}
