<template>
  <div>
    <product-manipulator v-if="!loading" :edit-product="product" />
  </div>
</template>

<script>
import { getMatches } from '@tauri-apps/api/cli'

export default {
  data () {
    return {
      product: undefined,
      loading: true
    }
  },
  async mounted () {
    const id = parseInt(await this.getProductId())
    if (id) {
      this.$leechineo.loading({ title: 'Carregando Produto' })
      if (!this.$store.state.products.items.find(item => item.id === id)) {
        const product = await this.$leechineo.products.get({ id })
        console.log(product)
        if (!product) {
          this.$router.push('/')
        } else {
          this.product = product
        }
      } else {
        this.product = this.$store.state.products.items.find(item => item.id === id)
      }
      this.$leechineo.loading({ show: false })
      this.loading = false
    }
  },
  methods: {
    async getProductId () {
      const matches = await getMatches()
      return matches.args.productId?.value
    }
  }
}
</script>

<style>

</style>
