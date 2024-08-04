const isMd = ({ store }) => {
  if (typeof window === 'undefined') {
    return false
  } else {
    window.addEventListener('resize', () => {
      store.commit('PageVariables/setIsMd', window.innerWidth)
    })
    store.commit('PageVariables/setIsMd', window.innerWidth)
    return window.innerWidth < 1264 && window.innerWidth >= 960
  }
}

export { isMd }
