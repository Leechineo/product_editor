<template>
  <div>
    <product-stock-editor-variants-switcher v-model="selectedItem" :items="optionsState" />
    <v-row dense>
      <v-col cols="12" md="6">
        <v-btn class="mb-3 rounded-bl-lg mt-1" color="primary" block small @click="addVariant">
          Adicionar Variante
        </v-btn>
      </v-col>
      <v-col cols="12" md="6">
        <v-btn class="mb-3 rounded-br-lg mt-1" color="primary" block small @click="dialogs.reorder = true">
          Gerenciar
        </v-btn>
      </v-col>
    </v-row>
    <product-stock-editor-variants-reorder v-model="dialogs.reorder" :items="optionsState" @reordered="reorder">
      <template #item="{ item, index }">
        <leechineo-card class="mb-1" :color="manageItemOptionColor(item)">
          <div class="d-flex align-center justify-space-between">
            <div class="mr-2">
              <v-img v-if="item.images[0]" :src="$leechineo.files.getUrl(item.images[0])" height="50px" width="50px" class="rounded-lg" />
              <v-sheet
                v-else
                width="50px"
                height="50px"
                outlined
                rounded="lg"
                class="d-flex justify-center align-center"
              >
                <v-icon color="primary">
                  add_photo_alternate
                </v-icon>
              </v-sheet>
            </div>
            <div class="text-truncate" style="max-width: 40%;">
              {{ item.name || `Variante ${index + 1}` }}
            </div>
            <div>
              <v-btn icon color="primary" @click="goToOption(index)">
                <v-icon>edit</v-icon>
              </v-btn>
            </div>
          </div>
        </leechineo-card>
      </template>
    </product-stock-editor-variants-reorder>
    <v-window v-if="showWindows" v-model="selectedItem">
      <v-window-item v-for="item in optionsState" :key="item.id">
        <product-stock-editor-variants-simple-item :option="item.id" :stock="stock" />
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
      items: [],
      selectedItem: 0,
      showWindows: true,
      dialogs: {
        reorder: false
      }
    }
  },
  computed: {
    options () {
      const items = this.items.map((item) => {
        const { id, name, instock, price, images } = item
        return { id, name, instock, price, images }
      })
      return items
    },
    itHasRepeatedNames () {
      const listNames = this.options.map(option => option.name?.toUpperCase())
      const counts = {}
      for (const value of listNames) {
        counts[value] = (counts[value] || 0) + 1
        if (counts[value] > 1) {
          return true
        }
      }
      return false
    },
    listNames () {
      return this.optionsState.map(option => option.name)
    },
    productStock () {
      return this.$store.state.products.editing.stocks.find(item => item.stock === this.stock)
    },
    optionsState () {
      return this.productStock?.variants?.options || []
    }
  },
  watch: {
    items: {
      deep: true,
      handler () {
        this.items.forEach((item, index) => {
          const { name, instock, price } = item
          if (name && instock && price) {
            this.items[index].invalidData = false
          }
        })
      }
    }
  },
  mounted () {
    if (!this.optionsState.length) {
      this.addVariant()
      this.addVariant()
    }
  },
  methods: {
    manageItemOptionColor (option) {
      const invalidName = !option.name
      const invalidData = !option.price || !option.instock
      if (invalidName || invalidData) {
        return 'red darken-4'
      }
      if (this.listNames.filter(name => name === option.name).length > 1) { // Verify if it has repeated names
        return 'orange'
      }
      return ''
    },
    goToOption (index) {
      this.selectedItem = index
      this.dialogs.reorder = false
    },
    validate (validateForms = true) {
      const optionsWithErrors = []
      this.items.forEach((item, index) => {
        const { name, instock, price } = item
        if (!name || !instock || !price) {
          if (validateForms) {
            this.items[index].invalidData = true
          }
          optionsWithErrors.push(index)
        }
      })
      if (optionsWithErrors.length) {
        if (validateForms) {
          this.selectedItem = optionsWithErrors[0]
        }
        return false
      } else {
        if (this.itHasRepeatedNames) {
          return false
        }
        return true
      }
    },
    inheritanceImages (item, images) {
      const index = this.items.indexOf(this.items.find(_item => _item.id === item.id))
      this.items[index].images = [...images]
      item.inheritImagesDialog = false
    },
    reorder (items) {
      this.showWindows = false
      this.$store.commit('products/editing/reorderVariantsOptions', { stock: this.stock, newOptions: items })
      setTimeout(() => {
        this.showWindows = true
      }, 100)
    },
    addVariant () {
      this.$store.commit('products/editing/addVariantsOption', this.stock)
    }
  }
}
</script>

<style>

</style>
