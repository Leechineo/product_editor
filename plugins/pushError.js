export default ({ store }, inject) => {
  inject('pushError', (title, e) => {
    store.commit('setGlobalDialog', {
      title,
      content: e?.response?.data?.message || e || 'Erro desconhecido',
      icon: 'warning',
      color: 'red',
      show: true
    })
  })
}
