const isDarkMode = () => {
  if (typeof window === 'undefined') {
    return false
  } else {
    const mediaQueryObj = window.matchMedia('(prefers-color-scheme: dark)')
    const isDarkMode = mediaQueryObj.matches
    return isDarkMode
  }
}

export { isDarkMode }
