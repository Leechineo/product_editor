export const state = () => ({
  isMobile: false,
  isMd: false
})

export const mutations = {
  setIsMobile (state, size) {
    state.isMobile = size < 960
  },
  setIsMd (state, size) {
    state.isMd = size < 1264 && size >= 960
  }
}
