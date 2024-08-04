<template>
  <div>
    <product-stock-editor-variants-switcher v-model="selectedWindow" :items="items" clean class="mb-3" width="200px" />
    <v-window v-model="selectedWindow" touchless>
      <v-window-item>
        <product-stock-editor-variants-compound-properties ref="variant-compound-property-editor" :stock="stock" />
      </v-window-item>
      <v-window-item>
        <product-stock-editor-variants-compound-options ref="variant-compound-option-editor" :stock="stock" />
      </v-window-item>
    </v-window>
  </div>
</template>

<script>
export default {
  props: {
    stock: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      items: [
        {
          name: 'Propriedades'
        },
        {
          name: 'Opções'
        }
      ],
      selectedWindow: 0
    }
  },
  methods: {
    validate (validateForms = true) {
      const itemsWithError = []
      const isPropertiesValid = this.$refs['variant-compound-property-editor']?.validate(validateForms)
      const isOptionsValid = this.$refs['variant-compound-option-editor']?.validate(validateForms)
      if (!isPropertiesValid) {
        itemsWithError.push(0)
      }
      if (!isOptionsValid) {
        itemsWithError.push(1)
      }
      if (itemsWithError.length) {
        if (validateForms) {
          this.selectedWindow = itemsWithError[0]
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
