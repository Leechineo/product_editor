import mime from 'mime-types'

export const state = () => ({
  items: []
})

export const mutations = {
  setFiles (state, items) {
    state.items = items
  },
  addFile (state, item) {
    state.items.push(item)
  }
}

export const getters = {
  getMimeType: _ => (name) => {
    const ext = name.split('.').pop()
    return mime.lookup(ext)
  },
  supportPreview: _ => (name) => {
    const previewCompatible = ['image/png', 'image/jpeg', 'image/svg+xml', 'image/gif', 'image/webp']
    const ext = name.split('.').pop()
    const type = mime.lookup(ext)
    if (previewCompatible.includes(type)) {
      return true
    } else {
      return false
    }
  },
  getIcon: _ => (name) => {
    const ext = name.split('.').pop()
    const type = mime.lookup(ext)
    const pdfTypes = ['application/pdf', 'application/x-pdf', 'application/acrobat']
    if (pdfTypes.includes(type)) {
      return 'picture_as_pdf'
    } else {
      return 'attachment'
    }
  }
}
