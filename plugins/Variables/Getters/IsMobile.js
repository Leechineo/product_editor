const isMobile = ({ store }) => {
  if (typeof window === 'undefined') {
    return false
  } else {
    window.addEventListener('resize', () => {
      store.commit('PageVariables/setIsMobile', window.innerWidth)
    })
    store.commit('PageVariables/setIsMobile', window.innerWidth)
    return window.innerWidth < 960
  }
}

export { isMobile }
