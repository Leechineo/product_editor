import Vue from 'vue'

Vue.filter('currencyToBrl', (value) => {
  const number = parseFloat(value)
  const formattedValue = number.toLocaleString('pt-br', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  })
  return formattedValue
})
