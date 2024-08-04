<template>
  <div>
    <div v-if="validStocks.length > 1" class="d-flex ml-2 mb-4 mt-2 justify-space-between align-center">
      <div>
        <div class="text-caption primary--text font-weight-medium">
          {{ productStocksFiltered.length > 1 ? 'Selecionar Estoque' : 'Origem do produto' }}
        </div>
        <leechineo-draggable-list horizontal :drag-items="productStocksFiltered" @dragged="reorderStocks">
          <template #item="{ item, index }">
            <v-sheet
              class="d-flex rounded pa-1 mr-1"
              :style="'user-select:none;' + `${validStocks > 1 && selectedStock === index ? 'cursor:pointer;border: 1px solid rgba(22, 150, 182, .3) !important;' : validStocks.length > 1 ? 'cursor:pointer;' : ''}`"
              :color="product.stocks.length > 1 && selectedStock === index ? 'rgba(22, 150, 182, .3)' : ''"
              outlined
              @click="setSelectedStock(index)"
            >
              <v-img :src="`/resources/countries/${getStockData(item).country}.svg`" max-width="30px" class="rounded" />
              <div class="mx-2 text-caption">
                {{ getStockData(item).name }}
              </div>
            </v-sheet>
          </template>
        </leechineo-draggable-list>
        <div class="d-flex" />
      </div>
      <div>
        <v-icon disabled>
          share
        </v-icon>
        <v-icon disabled>
          favorite_border
        </v-icon>
      </div>
    </div>
    <h5 v-if="validStocks.length" class="text-h5 primary--text font-weight-bold ml-2">
      <span v-if="prices.variantPrice">
        R${{ prices.variantPrice | currencyToBrl }}
      </span>
      <span v-else>
        R${{ prices.minPrice | currencyToBrl }} - {{ prices.maxPrice | currencyToBrl }}
      </span>
    </h5>
    <div class="d-flex justify-space-between align-center mb-2" />
    <div v-if="validStocks.length" class="mb-3 ml-2">
      <v-icon disabled>
        mdi-credit-card
      </v-icon>
      <span class="text--disabled">Em até 6x sem juros.</span>
    </div>
    <h4 class="text-h4 font-weight-medium mb-3 ml-2">
      {{ product.name }}
    </h4>
    <div>
      <div class="d-flex flex-row px-3 align-center mb-3">
        <v-rating
          :value="5"
          half-increments
          dense
          readonly
          background-color="yellow darken-3"
          color="yellow darken-3"
        />
        <div class="ml-1">
          5.0 | 10 pedidos
        </div>
      </div>
    </div>
    <v-window v-if="$store.state.products.editing.showStocksPreview" v-model="selectedStock">
      <v-window-item v-for="stock, index in productStocksFiltered.map(stockFiltered => product.stocks.find(productStock => productStock.stock === stockFiltered))" :key="stock.stock">
        <div class="mb-1">
          <product-preview-variants v-model="selectedVariant[index]" :variants="stock.variants" />
        </div>
        <div class="mb-3">
          <leechineo-card class="d-flex flex-wrap justify-center mx-3">
            <div class="d-flex align-center mb-2">
              <v-icon color="primary">
                local_shipping
              </v-icon>
              <div class="primary--text font-weight-medium ml-2">
                Calcular frete
              </div>
            </div>
            <div class="d-flex flex-wrap">
              <v-text-field
                outlined
                dense
                label="CEP"
                placeholder="00000-000"
                color="primary"
              />
              <div class="d-flex justify-end">
                <v-btn rounded elevation="0" color="primary" class="ml-3">
                  Calcular
                </v-btn>
              </div>
            </div>
          </leechineo-card>
        </div>
        <div class="d-flex justify-end flex-wrap mr-2">
          <v-btn class="ma-1" text color="green" rounded :disabled="!selectedVariant[selectedStock]">
            Comprar Agora
          </v-btn>
          <v-btn class="ma-1" color="primary" rounded :disabled="!selectedVariant[selectedStock]">
            Adicionar ao Carrinho
          </v-btn>
        </div>
      </v-window-item>
    </v-window>
  </div>
</template>

<script>
export default {
  props: {
    product: {
      type: Object,
      default () {
        return {}
      }
    }
  },
  data () {
    return {
      selectedStock: 0,
      selectedVariant: []
    }
  },
  computed: {
    validStocks () {
      return this.$store.getters['products/editing/validStocks'](this.product)
    },
    validFullStocks () {
      return this.validStocks.map(stockId => this.product.stocks.find(stock => stock.stock === stockId))
    },
    productStocksFiltered () {
      return this.product.stocks.filter(stock => this.validStocks.includes(stock.stock)).map(stock => stock.stock)
    },
    variant () {
      if (this.validFullStocks[this.selectedStock]?.variants.type === 'unique') {
        return this.validFullStocks[this.selectedStock]?.variants?.option || {}
      } else {
        return this.validFullStocks[this.selectedStock]?.variants?.options?.find(option => option.id === this.selectedVariant) || {}
      }
    },
    prices () {
      const priceObj = {}
      if (this.validFullStocks[this.selectedStock]?.variants?.type === 'unique') {
        priceObj.variantPrice = this.variant.price
      } else {
        const prices = this.validFullStocks[this.selectedStock]?.variants?.options?.map(option => option.price) || []
        priceObj.maxPrice = Math.max(...prices)
        priceObj.minPrice = Math.min(...prices)
        if (this.variant.id) {
          priceObj.variantPrice = this.variant.price
        }
      }
      return priceObj
    }
  },
  watch: {
    productStocksFiltered: {
      deep: true,
      async handler () {
        this.$store.commit('products/editing/toggleStocksPreview')
        await new Promise((resolve) => {
          setTimeout(() => {
            resolve()
          }, 200)
        })
        this.$store.commit('products/editing/toggleStocksPreview')
      }
    },
    selectedStock () {
      this.$emit('changedStock', this.selectedStock)
      this.$emit('changedVariant', this.selectedVariant[this.selectedStock] || '')
    },
    selectedVariant: {
      deep: true,
      handler () {
        this.$emit('changedVariant', this.selectedVariant[this.selectedStock] || '')
      }
    }
  },
  methods: {
    getStockData (stock) {
      return this.$store.state.stocks.items.find(item => item.id === stock)
    },
    setSelectedStock (value) {
      this.selectedStock = value
    },
    async reorderStocks (stocks) {
      this.$store.commit('products/editing/reorderStocks', this.$leechineo.plugins.newObjFromOther(stocks))
      this.$store.commit('products/editing/toggleStocksPreview')
      await new Promise((resolve) => {
        setTimeout(() => {
          resolve()
        }, 200)
      })
      this.$store.commit('products/editing/toggleStocksPreview')
    }
  }
}
</script>

<style>

</style>
