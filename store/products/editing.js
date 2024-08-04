import uniqid from 'uniqid'

export const state = () => ({
  id: undefined,
  draftId: undefined,
  name: '',
  description: '',
  images: [],
  specifications: [],
  category: '',
  brand: '',
  stocks: [],
  showStocksPreview: true
})

export const mutations = {
  resetProduct (product) {
    product.id = undefined
    product.draftId = undefined
    product.name = ''
    product.description = ''
    product.images = []
    product.specifications = []
    product.category = ''
    product.brand = ''
    product.stocks = []
  },
  setDraftId (product, id) {
    if (id) {
      product.draftId = id
    }
  },
  // Product Base Informations Mutations
  setProductId (product, id) {
    if (typeof id === 'number') {
      product.id = id
    }
  },
  setProductImages (product, images = []) {
    if (Array.isArray(images)) {
      product.images = [...images]
    }
  },
  setBasicInformations (product, basicInformations = {}) {
    if (typeof basicInformations?.name === 'string') {
      product.name = basicInformations.name
    }
    if (typeof basicInformations?.description === 'string') {
      product.description = basicInformations.description
    }
  },
  setProductCategory (product, category) {
    if (typeof category === 'string') {
      product.category = category
    }
  },
  setProductBrand (product, brand) {
    if (typeof brand === 'string') {
      product.brand = brand
    }
  },
  setProductSpecifications (product, specifications) {
    if (Array.isArray(specifications)) {
      product.specifications = [...specifications]
    }
  },
  // Product Stocks Mutations
  setProductStocks (product, { productStocks = [], dbStocks = [] }) {
    if (productStocks?.length) {
      product.stocks = productStocks.filter(stock => dbStocks.map(dbstock => dbstock.id).includes(stock.stock)).map((stock) => {
        const productvariants = {
          title: stock.variants.title,
          type: stock.variants.type,
          properties: stock.variants.properties || [],
          options: stock.variants.options.map(option => ({
            id: option.id,
            images: option.images,
            instock: Number(option.instock || '0'),
            name: option.name || '',
            names: option.names || [],
            price: Number(option.price || '0')
          })),
          option: {
            id: stock.variants.option?.id || uniqid('variant-'),
            name: stock.variants.option?.name || '',
            instock: Number(stock.variants.option?.instock || '0'),
            price: Number(stock.variants.option?.price || '0')
          }
        }
        const productstock = {
          stock: stock.stock,
          variants: productvariants
        }
        return productstock
      }).concat(
        dbStocks.filter(stock => !productStocks.map(productStock => productStock.stock).includes(stock.id)).map((dbstock) => {
          return {
            stock: dbstock.id,
            variants: {
              title: '',
              type: 'unique',
              properties: [],
              options: [],
              option: {
                id: uniqid('variant-'),
                name: '',
                instock: 0,
                price: 0
              }
            }
          }
        })
      )
    } else {
      product.stocks = dbStocks.map((stock) => {
        const existingProductStock = productStocks?.find(item => item.stock === stock.id)
        if (existingProductStock) {
          const productvariants = {
            title: existingProductStock.variants.title,
            type: existingProductStock.variants.type,
            properties: existingProductStock.variants.properties || [],
            options: existingProductStock.variants.options.map(option => ({
              id: option.id,
              images: option.images,
              instock: Number(option.instock || '0'),
              name: option.name || '',
              names: option.names || [],
              price: Number(option.price || '0')
            })),
            option: {
              id: existingProductStock.variants.option?.id || uniqid('variant-'),
              name: existingProductStock.variants.option?.name || '',
              instock: Number(existingProductStock.variants.option?.instock || '0'),
              price: Number(existingProductStock.variants.option?.price || '0')
            }
          }
          const productstock = {
            stock: existingProductStock.stock,
            variants: productvariants
          }
          return productstock
        } else {
          return {
            stock: stock.id,
            variants: {
              title: '',
              type: 'unique',
              properties: [],
              options: [],
              option: {
                id: uniqid('variant-'),
                name: '',
                instock: 0,
                price: 0
              }
            }
          }
        }
      })
    }
  },
  reorderStocks (product, stocks) {
    const productStocks = stocks.map(stock => product.stocks.find(productStock => productStock.stock === stock)).concat(product.stocks.filter(productStock => !stocks.includes(productStock.stock)))
    product.stocks = productStocks
  },
  toggleStocksPreview (product) {
    product.showStocksPreview = !product.showStocksPreview
  },
  // Variants
  setVariantsTitle (product, { stock, variantsTitle }) {
    if (typeof stock === 'string') {
      const productStock = product.stocks.find(item => item.stock === stock)
      if (productStock && (typeof variantsTitle === 'string' && variantsTitle !== productStock.variants.title)) {
        productStock.variants.title = variantsTitle
      }
    }
  },
  setVariantsType (product, { stock, variantsType }) {
    if (typeof stock === 'string') {
      const productStock = product.stocks.find(item => item.stock === stock)
      if (productStock && (typeof variantsType === 'string' && variantsType !== productStock.variants.type)) {
        productStock.variants.type = variantsType
      }
    }
  },
  setVariantsOption (product, { stock, option }) {
    if (typeof stock === 'string') {
      const productStock = product.stocks.find(item => item.stock === stock)
      if (productStock) {
        productStock.variants.option = {
          id: option.id,
          name: option.name,
          instock: parseFloat(option.instock || 0),
          price: parseFloat(option.price || 0),
          invalidData: option.invalidData
        }
      }
    }
  },
  // Variants Options
  addVariantsOption (product, stock) {
    if (typeof stock === 'string') {
      const productStock = product.stocks.find(item => item.stock === stock)
      const variantsProperties = productStock.variants.properties
      if (productStock) {
        productStock.variants.options.push({
          id: uniqid('variant-'),
          images: [],
          instock: 0,
          name: '',
          names: variantsProperties.map(name => ({ id: name.id, name: '' })),
          price: 0
        })
      }
    }
  },
  setVariantsMultiOptionsOption (product, { stock, optionId, option }) {
    if (typeof stock === 'string' && typeof optionId === 'string') {
      const productStock = product.stocks.find(item => item.stock === stock)
      if (productStock) {
        const currentOption = productStock.variants.options.find(item => item.id === optionId)
        currentOption.name = option.name || ''
        currentOption.names = option.names || currentOption.names || []
        currentOption.images = option.images || currentOption.images || []
        currentOption.instock = parseFloat(option.instock || '0') || 0
        currentOption.price = parseFloat(option.price || '0') || 0
      }
    }
  },
  reorderVariantsOptions (product, { stock, newOptions }) {
    if (typeof stock === 'string' && Array.isArray(newOptions)) {
      const productStock = product.stocks.find(item => item.stock === stock)
      if (productStock) {
        if (productStock.variants.options.length === newOptions.length) {
          productStock.variants.options = newOptions
        }
      }
    }
  },
  deleteVariantsOption (product, { stock, optionId }) {
    if (typeof stock === 'string' && typeof optionId === 'string') {
      const productStock = product.stocks.find(item => item.stock === stock)
      if (productStock) {
        const option = productStock.variants.options.find(item => item.id === optionId)
        const optionIndex = productStock.variants.options.indexOf(option)
        productStock.variants.options.splice(optionIndex, 1)
      }
    }
  },
  // Variants properties
  setVariantsProperties (product, { stock, properties }) {
    if (typeof stock === 'string' && Array.isArray(properties)) {
      const productStock = product.stocks.find(item => item.stock === stock)
      if (productStock) {
        productStock.variants.properties = properties
        // Reordering/Adding/Editing names (properties) in options
        productStock.variants.options = productStock.variants.options.map((option) => {
          const { id, images, instock, price, name } = option
          const names = properties.map(property => ({
            id: property.id,
            name: option.names.find(item => item.id === property.id)?.name || ''
          }))
          return { id, images, name, names, instock, price }
        })
      }
    }
  }
}

export const getters = {
  validStocks: stateproduct => (draftProduct) => {
    const product = draftProduct || stateproduct
    const validStocks = []
    for (const stock of product.stocks) {
      const variantsType = stock.variants.type
      if (variantsType === 'unique') {
        const option = stock.variants.option
        if (typeof option.instock !== 'number' || option.instock < 1) {
          continue
        }
        if (typeof option.price !== 'number' || option.price < 1) {
          continue
        }
        validStocks.push(stock.stock)
      } else if (variantsType === 'simple') {
        const options = stock.variants.options
        if (options.length < 2) {
          continue
        }
        const stringfiedNames = () => {
          return options.map(option => option.name)
        }
        const itHasRepeatedNames = () => {
          const listNames = stringfiedNames().map(name => name?.toUpperCase())
          const counts = {}
          for (const value of listNames) {
            counts[value] = (counts[value] || 0) + 1
            if (counts[value] > 1) {
              return true
            }
          }
          return false
        }
        if (itHasRepeatedNames()) {
          continue
        }
        const invalidOptions = options.filter((option) => {
          if (!option.name) {
            return true
          }
          if (typeof option.instock !== 'number' || option.instock < 1) {
            return true
          }
          if (typeof option.price !== 'number' || option.price < 1) {
            return true
          }
          return false
        })
        if (invalidOptions.length) {
          continue
        }
        validStocks.push(stock.stock)
      } else {
        const options = stock.variants.options
        if (options.length < 2) {
          continue
        }
        const isCompoundOptionNamesValid = (option) => {
          for (const name of option.names) {
            if (!name.name || !name.id) {
              return false
            }
          }
          return true
        }
        const stringfiedNames = () => {
          return options.map(item => item.names).map((name) => {
            return name.map(item => item.name).filter(item => item).join('/')
          })
        }
        const itHasRepeatedNames = () => {
          const listNames = stringfiedNames().map(name => name?.toUpperCase())
          const counts = {}
          for (const value of listNames) {
            counts[value] = (counts[value] || 0) + 1
            if (counts[value] > 1) {
              return true
            }
          }
          return false
        }
        if (itHasRepeatedNames()) {
          continue
        }
        const invalidOptions = options.filter((option) => {
          if (!isCompoundOptionNamesValid(option)) {
            return true
          }
          if (typeof option.instock !== 'number' || option.instock < 1) {
            return true
          }
          if (typeof option.price !== 'number' || option.price < 1) {
            return true
          }
          return false
        })
        if (invalidOptions.length) {
          continue
        }
        validStocks.push(stock.stock)
      }
    }
    return validStocks
  }
}
