export const state = () => ({
  globalDialog: {
    title: '',
    content: '',
    color: '',
    icon: '',
    show: false
  },
  loadingDialog: {
    title: '',
    show: false,
    cancelable: false
  }
})

export const mutations = {
  setGlobalDialog (state, { title, content, color, show, icon }) {
    state.globalDialog = { title, content, color, show, icon }
  },
  setError (state, e) {
    state.error = e
  },
  setLoadingDialog (state, { title, show, cancelable }) {
    state.loadingDialog = { title, show, cancelable }
  }
}
