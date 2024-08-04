<template>
  <leechineo-card padding="pt-3 px-2" title="Informações básicas">
    <v-text-field v-model="infos.name" outlined dense label="Nome do produto (250)" maxlength="100" />
    <v-textarea v-model="infos.description" outlined dense label="Descrição do produto (10000)" maxlength="10000" />
  </leechineo-card>
</template>

<script>
export default {
  data () {
    return {
      infos: {
        name: '',
        description: ''
      }
    }
  },
  computed: {
    productNameState () {
      return this.$store.state.products.editing.name || ''
    },
    productDescriptionState () {
      return this.$store.state.products.editing.description || ''
    }
  },
  watch: {
    infos: {
      deep: true,
      handler () {
        this.$store.commit('products/editing/setBasicInformations', this.infos)
      }
    },
    productNameState () {
      if (this.productNameState !== this.infos.name) {
        this.infos.name = this.productNameState
      }
    },
    productDescriptionState () {
      if (this.productDescriptionState !== this.infos.description) {
        this.infos.description = this.productDescriptionState
      }
    }
  },
  mounted () {
    this.infos.name = this.$store.state.products.editing.name
    this.infos.description = this.$store.state.products.editing.description
  }
}
</script>

<style>

</style>
