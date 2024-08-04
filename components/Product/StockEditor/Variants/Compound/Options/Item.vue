<template>
  <div>
    <v-row align="start" dense>
      <v-col cols="12" md="6">
        <product-image-selector icon-width="150px" height="250px" :items="localOption.images" @changed="localOption.images = $event">
          <template #actions="{ showEditorDialog }">
            <div class="d-flex mb-3">
              <v-btn class="ma-1" rounded color="primary" elevation="0" @click="showEditorDialog">
                Selecionar
              </v-btn>
              <v-btn class="ma-1" rounded color="primary" elevation="0" @click="localOption.inheritImagesDialog = true">
                Herdar
              </v-btn>
              <leechineo-dialog v-model="localOption.inheritImagesDialog" max-width="750px" title="Herdar imagens" max-height="60vh" padding="pa-2">
                <product-stock-editor-variants-inheritance-images :current-option="localOption" :stock="stock" @inherit="inheritanceImages" />
                <template #actions>
                  <v-btn color="primary" rounded elevation="0" @click="localOption.inheritImagesDialog = false">
                    Fechar
                  </v-btn>
                </template>
              </leechineo-dialog>
            </div>
          </template>
        </product-image-selector>
      </v-col>
      <v-col cols="12" md="6">
        <leechineo-card padding="pa-0">
          <div class="ma-3">
            <div v-for="name, i in localOption.names" :key="name.id">
              <product-stock-editor-variants-compound-options-name-input
                v-model="name.name"
                :label="propertyData(name.id).name || `Propriedade ${i + 1}`"
                :name="name"
                :variants="productStock.variants.options"
              />
            </div>
          </div>
          <v-divider style="margin-top: -18px;" />
          <div class="ma-3 mt-4">
            <v-text-field
              v-model="localOption.instock"
              outlined
              dense
              label="Em estoque"
              type="number"
            />
            <v-text-field
              v-model="localOption.price"
              outlined
              dense
              label="Preço"
              type="number"
            />
          </div>
        </leechineo-card>
      </v-col>
    </v-row>
    <div v-if="optionsState.length > 2" class="d-flex justify-end">
      <v-btn rounded elevation="0" color="cancel" class="mt-3" @click="localOption.deleteDialog = true">
        <v-icon>delete</v-icon>
      </v-btn>
      <leechineo-dialog v-model="localOption.deleteDialog" title="Deletar variante?">
        <template #actions>
          <v-btn class="ma-1" elevation="0" rounded color="primary" @click="localOption.deleteDialog = false">
            Cancelar
          </v-btn>
          <v-btn class="ma-1" elevation="0" rounded color="red darken-3" @click="$store.commit('products/editing/deleteVariantsOption', { stock: stock, optionId: optionState.id })">
            Deletar
          </v-btn>
        </template>
      </leechineo-dialog>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    option: {
      type: String,
      default: ''
    },
    stock: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      localOption: {
        id: '',
        names: [],
        images: [],
        instock: '',
        price: '',
        inheritImagesDialog: false,
        deleteDialog: false
      }
    }
  },
  computed: {
    productStock () {
      return this.$store.state.products.editing.stocks.find(item => item.stock === this.stock) || {}
    },
    propertiesState () {
      return this.productStock?.variants?.properties || []
    },
    optionState () {
      return this.productStock?.variants?.options?.find(option => option.id === this.option) || {}
    },
    optionsState () {
      return this.productStock?.variants?.options || []
    }
  },
  watch: {
    localOption: {
      deep: true,
      handler () {
        this.$store.commit('products/editing/setVariantsMultiOptionsOption', {
          stock: this.stock,
          optionId: this.option,
          option: this.$leechineo.plugins.newObjFromOther(this.localOption)
        })
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
    propertyData (id) {
      return this.propertiesState.find(item => item.id === id)
    },
    inheritanceImages (images) {
      this.localOption.images = images
      this.localOption.inheritImagesDialog = false
    },
    isOptionsDifferent () {
      const localOption = {
        id: this.localOption.id,
        names: this.localOption.names,
        images: this.localOption.images,
        instock: this.localOption.instock,
        price: this.localOption.price
      }
      const stateOption = {
        id: this.optionState.id,
        names: this.optionState.names,
        images: this.optionState.images,
        instock: this.optionState.instock,
        price: this.optionState.price
      }
      return JSON.stringify(localOption) !== JSON.stringify(stateOption)
    },
    mountOption () {
      if (this.isOptionsDifferent()) {
        this.localOption.id = this.optionState.id
        this.localOption.names = this.optionState.names
        this.localOption.images = this.optionState.images
        this.localOption.instock = this.optionState.instock
        this.localOption.price = this.optionState.price
      }
    }
  }
}
</script>

<style>

</style>
