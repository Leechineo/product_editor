<template>
  <div>
    <product-stock-editor-variants-switcher v-model="selectedProperty" :items="properties" type="Propriedade" width="150px" :disabled="disabled" />
    <leechineo-card class="my-3">
      <v-window v-if="showWindows" v-model="selectedProperty">
        <v-window-item v-for="property, i in properties" :key="property.id">
          <v-text-field
            :ref="`property-input-${property.id}`"
            v-model="property.name"
            outlined
            dense
            :label="'Propriedade ' + (i + 1)"
            class="mt-1"
            :disabled="disabled"
          />
          <div class="d-flex justify-end">
            <v-btn
              v-if="properties.length > 2"
              rounded
              elevation="0"
              color="cancel"
              small
              :disabled="disabled"
              @click="deleteProperty(property.id)"
            >
              <v-icon>delete</v-icon>
            </v-btn>
          </div>
        </v-window-item>
      </v-window>
    </leechineo-card>
    <v-row dense>
      <v-col cols="12" md="6">
        <v-btn
          class="mb-3 rounded-bl-lg mt-1"
          color="primary"
          block
          small
          :disabled="disabled"
          @click="addProperty()"
        >
          Adicionar Propriedade
        </v-btn>
      </v-col>
      <v-col cols="12" md="6">
        <v-btn
          class="mb-3 rounded-br-lg mt-1"
          color="primary"
          block
          small
          :disabled="disabled"
          @click="dialogs.reorder = true"
        >
          Reordenar
        </v-btn>
      </v-col>
    </v-row>
    <product-stock-editor-variants-reorder v-model="dialogs.reorder" :items="properties" @reordered="reorderProperties">
      <template #item="{ item, index }">
        <leechineo-card class="mb-1">
          {{ item.name || `Propriedade ${index + 1}` }}
        </leechineo-card>
      </template>
    </product-stock-editor-variants-reorder>
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
      properties: [],
      selectedProperty: 0,
      disabled: false,
      showWindows: true,
      dialogs: {
        reorder: false
      }
    }
  },
  computed: {
    productStock () {
      return this.$store.state.products.editing.stocks.find(item => item.stock === this.stock) || {}
    },
    propertiesState () {
      return this.productStock?.variants?.properties || []
    }
  },
  watch: {
    properties: {
      deep: true,
      handler () {
        this.$store.commit('products/editing/setVariantsProperties', { stock: this.stock, properties: this.$leechineo.plugins.newObjFromOther(this.properties) })
      }
    },
    selectedProperty (index) {
      const id = this.properties[index].id
      this.propertyInputFocus(id)
    }
  },
  mounted () {
    this.mountProperties()
    if (!this.properties.length) {
      this.addProperty(true)
      this.addProperty(true)
    }
  },
  methods: {
    mountProperties () {
      const localProperties = this.properties.map(property => ({
        id: property.id,
        name: property.name
      }))
      if (JSON.stringify(localProperties) !== JSON.stringify(this.propertiesState)) {
        this.properties = this.$leechineo.plugins.newObjFromOther(this.propertiesState)
      }
    },
    reorderProperties (newProperties = []) {
      this.properties = [...newProperties]
      this.updateWindows()
    },
    updateWindows () {
      this.showWindows = false
      setTimeout(() => {
        this.showWindows = true
      }, 200)
    },
    deleteProperty (id) {
      const index = this.properties.indexOf(this.properties.find(property => property.id === id))
      this.properties.splice(index, 1)
    },
    propertyInputFocus (id) {
      setTimeout(() => {
        const ref = `property-input-${id}`
        this.$refs[ref][0].focus()
      }, 200)
    },
    async addProperty (first) {
      this.disabled = true
      const id = uniqid('variant-property-')
      this.properties.push({
        id,
        name: ''
      })
      if (!first) {
        await new Promise((resolve) => {
          setTimeout(() => {
            this.selectedProperty = this.properties.indexOf(this.properties.find(property => property.id === id))
            resolve()
          }, 200)
        })
        this.propertyInputFocus(id)
      }
      this.disabled = false
    }
  }
}
</script>

<style>

</style>
