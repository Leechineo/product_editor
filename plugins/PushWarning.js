export default ({ store }, inject) => {
  inject('pushWarning', (title, e) => {
    store.commit('setGlobalDialog', {
      title,
      content: e?.response?.data?.message || e || 'Erro interno do servidor, tente novamente mais tarde.',
      icon: 'warning',
      color: 'orange',
      show: true
    })
  })
}
