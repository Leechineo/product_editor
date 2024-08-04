export const state = () => ({
  id: undefined,
  draftId: undefined,
  name: '',
  mappings: [],
  defaultMapping: {
    price: {
      currency: 'BRL',
      value: 0
    },
    arriveTime: {
      min: 13,
      max: 25
    }
  },
  products: []
})

export const mutatins = {}
