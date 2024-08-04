<template>
  <div>
    <v-row class="mt-2">
      <v-col cols="12" xl="3">
        <v-text-field v-model="variantsTitle" label="Título das variantes" outlined dense />
        <v-item-group
          v-model="selectedVariantType"
          class="shrink mr-6"
          mandatory
          tag="v-flex"
        >
          <v-item
            v-for="variantType in variantTypes"
            :key="variantType"
            v-slot="{ active, toggle }"
          >
            <v-sheet style="cursor: pointer; user-select:none;" @click="toggle">
              <v-btn
                :input-value="active"
                icon
                color="primary"
                @click="toggle"
              >
                <v-icon>mdi-record</v-icon>
              </v-btn>
              <span :class="active ? 'primary--text' : ''">{{ variantType }}</span>
            </v-sheet>
          </v-item>
        </v-item-group>
      </v-col>
      <v-col cols="12" xl="9">
        <leechineo-card>
          <v-window v-model="selectedVariantType" vertical touchless>
            <v-window-item>
              <product-stock-editor-variants-unique ref="uniq-variant-editor" :stock="stock" />
            </v-window-item>
            <v-window-item>
              <product-stock-editor-variants-simple ref="simple-variant-editor" :stock="stock" />
            </v-window-item>
            <v-window-item>
              <product-stock-editor-variants-compound ref="compound-variant-editor" :stock="stock" />
            </v-window-item>
          </v-window>
        </leechineo-card>
      </v-col>
    </v-row>
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
      selectedVariantType: 0,
      variantsTitle: '',
      variants: {},
      editableOptions: [],
      editableProperties: [],
      variantTypes: [
        'Única',
        'Simples',
        'Composta'
      ]
    }
  },
  computed: {
    productStock () {
      return this.$store.state.products.editing.stocks.find(item => item.stock === this.stock)
    },
    variantsTitleState () {
      return this.productStock?.variants?.title || ''
    },
    variantsTypeState () {
      return this.productStock?.variants?.type || 'unique'
    }
  },
  watch: {
    selectedVariantType () {
      const types = ['unique', 'simple', 'compound']
      const type = types[this.selectedVariantType]
      this.$store.commit('products/editing/setVariantsType', { stock: this.stock, variantsType: type })
    },
    variantsTitle () {
      this.$store.commit('products/editing/setVariantsTitle', { stock: this.stock, variantsTitle: this.variantsTitle })
    },
    variantsTitleState () {
      this.mountVariantsTitle()
    },
    variantsTypeState () {
      this.mountVariantsType()
    }
  },
  mounted () {
    this.mountVariantsTitle()
    this.mountVariantsType()
  },
  methods: {
    mountVariantsTitle () {
      if (this.variantsTitle !== this.variantsTitleState) {
        this.variantsTitle = this.variantsTitleState
      }
    },
    mountVariantsType () {
      const types = ['unique', 'simple', 'compound']
      const index = types.indexOf(this.variantsTypeState)
      if (index !== this.selectedVariantType) {
        this.selectedVariantType = index
      }
    },
    validate (validateForms) {
      if (this.selectedVariantType === 0) {
        return this.$refs['uniq-variant-editor']?.validate(validateForms)
      } else if (this.selectedVariantType === 1) {
        return this.$refs['simple-variant-editor']?.validate(validateForms) && !!this.variantsTitle
      } else if (this.selectedVariantType === 2) {
        return this.$refs['compound-variant-editor']?.validate(validateForms)
      }
      return false
    },
    isValid () {
      return this.validate(false) || false
    }
  }
}
</script>

<style>

</style>
