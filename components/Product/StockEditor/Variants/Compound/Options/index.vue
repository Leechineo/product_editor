<template>
  <div>
    <product-stock-editor-variants-switcher v-model="selectedItem" :items="optionsState" width="150px">
      <template #name="{ item, index }">
        <v-tooltip bottom :disabled="!item.names.map(item => item.name).join('')" color="primary darken-2">
          <template #activator="{ on, attrs }">
            <div v-bind="attrs" class="text-truncate" v-on="on">
              {{ item.names.map(item => item.name).join('') ? item.names.map(item => item.name).filter(name => name).join('/') : `Variante ${index + 1}` }}
            </div>
          </template>
          <div>
            <span v-for="name in item.names" :key="name.id">
              <v-chip v-if="name.name" color="primary" class="ma-1">
                {{ name.name }}
              </v-chip>
            </span>
          </div>
        </v-tooltip>
      </template>
    </product-stock-editor-variants-switcher>
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
            <div class="text-truncate" style="max-width: 60%;">
              {{ item.names.map(item => item.name).join('') ? item.names.map(item => item.name).filter(name => name).join('/') : `Variante ${index + 1}` }}
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
    <v-window v-if="showWindows" v-model="selectedItem" touchless>
      <v-window-item v-for="option in optionsState" :key="option.id">
        <product-stock-editor-variants-compound-options-item :stock="stock" :option="option.id" />
        <!-- TODO v-if="selectedItem !== index" -->
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
    listNames () {
      return this.optionsState.map(item => item.names).map((name) => {
        return name.map(item => item.name).filter(item => item).join('/')
      })
    },
    productStock () {
      return this.$store.state.products.editing.stocks.find(item => item.stock === this.stock)
    },
    optionsState () {
      return this.productStock?.variants?.options || []
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
      const stringfiedNames = option.names.map(name => name.name).join('/')
      const invalidNames = !!(option.names.filter(name => !name.name).length > 1)
      const invalidData = !option.price || !option.instock
      if (invalidNames || invalidData) {
        return 'red darken-4'
      }
      if (this.listNames.filter(names => names === stringfiedNames).length > 1) { // Verify if it has repeated names
        return 'orange'
      }
      return ''
    },
    goToOption (index) {
      this.selectedItem = index
      this.dialogs.reorder = false
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
