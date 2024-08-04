<template>
  <div>
    <div v-if="!essentialDataLoaded" />
    <div v-else>
      <div class="mb-15">
        <v-sheet />
        <v-window v-model="page" touchless>
          <v-window-item>
            <v-row justify="center" dense>
              <v-col cols="12" md="6" lg="4">
                <product-image-selector :product-name="product.name" :items="product.images" @changed="setProductImages" />
              </v-col>
              <v-col cols="12" md="6" lg="4">
                <product-editor-basic-informations />
                <product-category-selector class="mt-2" :category="product.category" @selected="setProductCategory" />
              </v-col>
              <v-col cols="12" lg="4">
                <v-row dense>
                  <v-col cols="12" md="6" lg="12">
                    <product-brand-selector :brand="product.brand" @changed="setProductBrand" />
                  </v-col>
                  <v-col cols="12" md="6" lg="12">
                    <product-specifications-editor />
                  </v-col>
                </v-row>
              </v-col>
            </v-row>
          </v-window-item>
          <v-window-item>
            <product-stock-editor />
          </v-window-item>
          <v-window-item>
            <product-preview :product="product" />
          </v-window-item>
        </v-window>
        <div class="d-flex" style="position: fixed; bottom: 10px; right:10px;">
          <v-btn v-if="page !== 0" rounded color="primary" class="ma-1" @click="previous">
            Anterior
          </v-btn>
          <v-btn
            v-if="page < 2"
            rounded
            color="primary"
            class="ma-1"
            :disabled="page === 1 && (!validStocks.length || !product.name)"
            @click="next"
          >
            Próximo
          </v-btn>
          <v-btn v-else rounded color="primary" class="ma-1" @click="publish">
            Publicar
          </v-btn>
        </div>
      </div>
    </div>
    <leechineo-dialog v-model="dialogs.draft" title="Deseja restaurar o rascunho desta edição?" persistent>
      <div class="pa-3">
        Se você não restaurar, o rascunho será sobrescrito pela edição atual.
      </div>
      <template #actions>
        <v-btn rounded text color="primary" class="ma-1" @click="dialogs.draftPreview = true">
          Visualizar
        </v-btn>
        <v-btn rounded elevation="0" class="ma-1" color="red darken-3" @click="cancelDraftRestoration">
          Cancelar
        </v-btn>
        <v-btn rounded elevation="0" class="ma-1" color="primary" @click="restoreDraft">
          Restaurar
        </v-btn>
      </template>
    </leechineo-dialog>
    <leechineo-dialog v-model="dialogs.draftPreview" max-height="60vh" max-width="80vw" padding="pa-3">
      <template #title>
        <div class="pa-3 d-flex">
          <v-sheet
            v-for="item, i in 2"
            :key="i"
            :color="dialogs.draftPreviewPage === i ? 'primary' : ''"
            outlined
            class="px-3 py-1 mx-1 rounded"
            style="user-select: none;cursor:pointer;"
            @click="setDraftPage(i)"
          >
            {{ i === 0 ? 'Visualizar rascunho' : 'Visualizar produto original' }}
          </v-sheet>
        </div>
      </template>
      <v-window v-model="dialogs.draftPreviewPage">
        <v-window-item>
          <product-preview :product="draft" />
        </v-window-item>
        <v-window-item>
          <product-preview :product="editingProductState" />
        </v-window-item>
      </v-window>
      <template #actions>
        <v-btn rounded class="ma-1" elevation="0" color="red darken-3" @click="dialogs.draftPreview = false">
          Fechar
        </v-btn>
      </template>
    </leechineo-dialog>
  </div>
</template>

<script>
import { appWindow } from '@tauri-apps/api/window'

export default {
  props: {
    editProduct: {
      type: Object,
      default () {
        return {}
      }
    }
  },
  data () {
    return {
      page: 0,
      pages: [
        {
          title: 'Vamos começar!'
        },
        {
          title: 'E qual a categoria desse produto?'
        },
        {
          title: 'De qual marca é esse produto?'
        }
      ],
      essentialDataLoaded: false,
      brand: '',
      dialogs: {
        draft: false,
        draftPreview: false,
        draftPreviewPage: 0
      },
      draft: {}
    }
  },
  computed: {
    product () {
      return this.$store.state.products.editing
    },
    stocksState () {
      return this.$store.state.stocks.items
    },
    validStocks () {
      return this.$store.getters['products/editing/validStocks']()
    },
    editingProductState () {
      return this.$store.state.products.editing
    }
  },
  watch: {
    stocksState: {
      deep: true,
      handler () {
        this.$store.commit('products/editing/setProductStocks', { dbStocks: this.stocksState, productStocks: this.editProduct.stocks })
      }
    },
    editingProductState: {
      deep: true,
      handler () {
        if (this.essentialDataLoaded) {
          this.$leechineo.products.draft.update()
        }
      }
    }
  },
  async mounted () {
    try {
      // Load essential data like brands, stocks, category and files
      this.$leechineo.loading({ title: 'Carregando marcas (1/4)', show: true })
      await this.$leechineo.brands.get()
      this.$leechineo.loading({ title: 'Carregando estoques (2/4)', show: true })
      await this.$leechineo.stock.get()
      this.$leechineo.loading({ title: 'Carregando categorias (3/4)', show: true })
      // await this.$leechineo.categories.get() //TODO category
      this.$leechineo.loading({ title: 'Carregando arquivos (4/4)', show: true })
      await this.$leechineo.files.get()
      // Set stocks on the state editing product
      this.$store.commit('products/editing/setProductStocks', { dbStocks: this.stocksState, productStocks: this.editProduct.stocks })
      // Load data of existing product in edit case
      if (this.editProduct.id) {
        this.$store.commit('products/editing/setProductId', this.editProduct.id)
        this.setProductImages(this.editProduct.images)
        this.$store.commit('products/editing/setBasicInformations', {
          name: this.editProduct.name,
          description: this.editProduct.description
        })
        this.setProductCategory(this.editProduct.category)
        this.setProductBrand(this.editProduct.brand)
        this.$store.commit('products/editing/setProductSpecifications', this.editProduct.specifications.map(spec => ({ deleteDialog: false, ...spec })))
      }
      this.$leechineo.products.draft.create()
      this.showDraftDialog()
      this.$leechineo.loading({ show: false })
    } catch (e) {
      this.$leechineo.loading({ show: false })
      this.$pushError('Falha ao carregar os dados', e)
    }
  },
  beforeDestroy () {
    this.$store.commit('products/editing/resetProduct')
  },
  methods: {
    setDraftPage (i) {
      this.dialogs.draftPreviewPage = i
    },
    restoreDraft () {
      this.$leechineo.products.draft.restore()
      this.dialogs.draft = false
      this.essentialDataLoaded = true
    },
    cancelDraftRestoration () {
      this.dialogs.draft = false
      this.essentialDataLoaded = true
    },
    arefDraftAndProductEquals () {
      const formattedProduct = product => ({
        name: product.name,
        description: product.description,
        images: product.images,
        specifications: product.specifications,
        category: product.category,
        brand: product.brand,
        stocks: product.stocks.map(stock => ({
          stock: stock.stock,
          variants: {
            option: {
              instock: stock.variants.option.instock,
              name: stock.variants.option.name,
              price: stock.variants.option.price
            },
            options: stock.variants.options.map(option => ({
              names: option.names.map(name => ({
                name: name.name
              })),
              name: option.name,
              instock: option.instock,
              price: option.price
            }))
          }
        }))
      })
      const product = formattedProduct(this.editingProductState)
      const draft = formattedProduct(this.$leechineo.products.draft.get())
      return JSON.stringify(product) === JSON.stringify(draft)
    },
    isProductValid (product) {
      return product.name && this.$store.getters['products/editing/validStocks'](product)
    },
    showDraftDialog () {
      if (!this.arefDraftAndProductEquals() && this.isProductValid(this.$leechineo.products.draft.get())) {
        this.draft = this.$leechineo.products.draft.get()
        this.dialogs.draft = true
      } else {
        this.essentialDataLoaded = true
      }
    },
    setProductBrand (brand) {
      this.$store.commit('products/editing/setProductBrand', brand)
    },
    setProductCategory (category) {
      this.$store.commit('products/editing/setProductCategory', category)
    },
    setProductImages (images) {
      this.$store.commit('products/editing/setProductImages', images)
    },
    previous () {
      if (this.page < 1) {
        this.page = this.pages.length - 1
      } else {
        this.page--
      }
    },
    next () {
      if (this.page >= this.pages.length - 1) {
        this.page = 0
      } else {
        this.page++
      }
    },
    async publish () {
      this.$leechineo.loading({ title: 'Publicando...' })
      const name = this.product.name.trim()
      const description = this.product.description.trim()
      const specifications = this.product.specifications.map(spec => ({
        id: spec.id,
        title: spec.title,
        value: spec.value
      }))
      const stocks = this.validStocks.map(stock => this.product.stocks.find(productStock => productStock.stock === stock))
      const { id, images, brand, category } = this.product
      const product = { name, description, images, specifications, brand, category, stocks }
      try {
        if (this.product.id) {
          await this.$leechineo.products.update(id, product)
        } else {
          await this.$leechineo.products.create(product)
        }
      } catch (e) {
        this.$pushError('Falha ao salvar o produto', e)
      }
      this.$leechineo.loading()
      await appWindow.close()
    }
  }
}
</script>

<style>
</style>
