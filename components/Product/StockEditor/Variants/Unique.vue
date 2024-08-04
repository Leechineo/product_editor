<template>
  <div class="ma-1">
    <v-text-field v-model="name" outlined dense label="Nome da variante" />
    <v-text-field
      v-model="instock"
      label="Em estoque"
      outlined
      dense
      type="number"
      :error="invalidData && !instock"
    />
    <v-text-field
      v-model="price"
      label="Preço"
      outlined
      dense
      type="number"
      :error="invalidData && !price"
    />
  </div>
</template>

<script>
import uniqid from 'uniqid'

export default {
  props: {
    stock: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      id: uniqid('variant-'),
      name: '',
      instock: '',
      price: '',
      invalidData: false
    }
  },
  computed: {
    option () {
      const { id, name, instock, price } = this
      return {
        id, name, instock, price
      }
    },
    productStock () {
      return this.$store.state.products.editing.stocks.find(item => item.stock === this.stock)
    },
    optionState () {
      return this.productStock?.variants?.option || this.option
    }
  },
  watch: {
    option: {
      deep: true,
      handler () {
        this.$store.commit('products/editing/setVariantsOption', { stock: this.stock, option: this.option })
      }
    },
    optionState: {
      deep: true,
      handler () {
        this.mountOption()
      }
    }
  },
  mounted () {
    this.mountOption()
  },
  methods: {
    mountOption () {
      if (JSON.stringify(this.option) !== JSON.stringify(this.optionState)) {
        this.name = this.optionState?.name || ''
        this.instock = this.optionState?.instock?.toString() !== '0' ? this.optionState?.instock?.toString() || '' : ''
        this.price = this.optionState?.price?.toString() !== '0' ? this.optionState?.price?.toString() || '' : ''
      }
    },
    validate (validateForms = true) {
      if (!this.instock || !this.price) {
        if (validateForms) {
          this.invalidData = true
        }
        return false
      } else {
        return true
      }
    }
  }
}
</script>

<style>

</style>
