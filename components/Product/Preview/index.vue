<template>
  <div>
    <div class="d-flex flex-column">
      <v-sheet class="pr-2 mb-3" color="transparent">
        <v-row>
          <v-col v-if="images.length" cols="12" md="4" xl="3">
            <product-preview-images :images="images" />
          </v-col>
          <v-col cols="12" :md="images.length ? '8' : '12'" :xl="images.length ? '9' : '12'">
            <product-preview-basic-informations :product="product" @changedStock="selectedStock = $event" @changedVariant="selectedVariant = $event" />
          </v-col>
        </v-row>
      </v-sheet>
      <v-sheet v-if="product.description || product.specifications.length" color="transparent">
        <product-preview-aditional-informations :product="product" />
      </v-sheet>
    </div>
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
      selectedVariant: ''
    }
  },
  computed: {
    validStocks () {
      return this.$store.getters['products/editing/validStocks'](this.product)
    },
    validFullStocks () {
      return this.validStocks.map(stockId => this.product.stocks.find(stock => stock.stock === stockId))
    },
    variant () {
      if (this.validFullStocks[this.selectedStock]?.variants.type === 'unique') {
        return this.validFullStocks[this.selectedStock]?.variants?.option || {}
      } else {
        return this.validFullStocks[this.selectedStock]?.variants?.options?.find(option => option.id === this.selectedVariant) || {}
      }
    },
    images () {
      if (this.variant.id && this.variant.images?.length) {
        return this.variant.images
      } else {
        return this.product.images
      }
    }
  }
}
</script>

<style>

</style>
