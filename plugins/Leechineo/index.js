import { Products } from './Products'
import { Categories } from './Categories'
import { Files } from './Files'
import { Brands } from './Brands'
import { Stock } from './Stock'
import { Setting } from './Setting'
import { Plugins } from './_Plugins'

const Loading = ({ store }) => {
  return (params = { show: undefined, title: '', cancelable: false }) => {
    const currentShowState = store.state.loadingDialog.show
    if (typeof params?.show === 'undefined') {
      params.show = !currentShowState
    }
    store.commit('setLoadingDialog', { title: params?.title || '', show: params?.show, cancelable: params?.cancelable || false })
  }
}

export default (nuxt, inject) => {
  inject('leechineo', {
    products: Products(nuxt),
    categories: Categories(nuxt),
    files: Files(nuxt),
    brands: Brands(nuxt),
    stock: Stock(nuxt),
    setting: Setting(nuxt),
    loading: Loading(nuxt),
    plugins: Plugins
  })
}
