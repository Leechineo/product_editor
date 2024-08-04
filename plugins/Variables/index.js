import { isDarkMode } from './Getters/isDarkMode'
import { isMd } from './Getters/isMd'
import { isMobile } from './Getters/IsMobile'

export default (nuxt, inject) => {
  inject('variables', {
    isMobile: isMobile(nuxt),
    isMd: isMd(nuxt),
    isDarkMode: isDarkMode()
  })
}
