<template>
  <div>
    <leechineo-card title="Especificações" overflow>
      <div v-if="specifications.length" class="mb-2">
        <leechineo-draggable-list :drag-items="specifications" @dragged="specifications = $event">
          <template #item="{ item, index }">
            <leechineo-card class="mb-2" padding="pa-0">
              <div class="d-flex justify-space-between px-3">
                <v-icon v-if="specifications.length > 1" color="primary" class="mr-3" size="20">
                  mdi-format-list-bulleted
                </v-icon>
                <div v-else />
                <div class="d-flex">
                  <div class="d-flex align-center justify-center">
                    <v-sheet class="text-truncate" rounded="sm" max-width="100px" :title="item.title">
                      {{ item.title }}
                    </v-sheet>
                    <v-divider vertical class="mx-3" />
                    <v-sheet max-width="100px" class="text-truncate" color="transparent" :title="item.value">
                      {{ item.value }}
                    </v-sheet>
                  </div>
                </div>
                <div>
                  <v-btn icon color="primary" @click="specification = { ...item }">
                    <v-icon>edit</v-icon>
                  </v-btn>
                  <v-btn icon color="red darken-3" @click="specifications[index].deleteDialog = true">
                    <v-icon>delete</v-icon>
                  </v-btn>
                </div>
                <leechineo-dialog v-model="specifications[index].deleteDialog" :title="'Deletar a especificação ' + item.title + '?'">
                  <template #actions>
                    <v-btn rounded elevation="0" class="ma-1" color="primary" @click="specifications[index].deleteDialog = false">
                      Cancelar
                    </v-btn>
                    <v-btn rounded elevation="0" class="ma-1" color="red darken-3" @click="specifications.splice(index, 1)">
                      Apagar
                    </v-btn>
                  </template>
                </leechineo-dialog>
              </div>
            </leechineo-card>
          </template>
        </leechineo-draggable-list>
      </div>
      <div>
        <v-row dense>
          <v-col cols="12" md="6">
            <v-text-field
              v-model="specification.title"
              outlined
              dense
              style="margin-bottom: -15px;"
              label="Título"
              placeholder="Armazenamento"
            />
          </v-col>
          <v-col cols="12" md="6">
            <v-text-field
              v-model="specification.value"
              outlined
              dense
              style="margin-bottom: -15px;"
              label="Valor"
              placeholder="256GB"
            />
          </v-col>
        </v-row>
        <v-btn
          rounded
          color="primary"
          elevation="0"
          block
          small
          :disabled="disableAddAttButton"
          @click="setSpecification"
        >
          {{ buttonText }}
        </v-btn>
        <v-btn
          v-if="specification.id"
          rounded
          color="red darken-3 mt-2"
          elevation="0"
          block
          small
          @click="cancelEdit"
        >
          Cancelar
        </v-btn>
      </div>
    </leechineo-card>
  </div>
</template>

<script>
import uniqid from 'uniqid'

export default {
  data () {
    return {
      specifications: [],
      specification: {
        id: '',
        title: '',
        value: '',
        deleteDialog: false
      }
    }
  },
  computed: {
    disableAddAttButton () {
      return !this.specification.title || !this.specification.value
    },
    buttonText () {
      if (this.specification.id) {
        return 'Atualizar'
      } else {
        return 'Adicionar'
      }
    },
    productSpecificationsState () {
      return this.$store.state.products.editing.specifications || []
    }
  },
  watch: {
    specifications: {
      deep: true,
      handler () {
        const productSpecifications = this.$leechineo.plugins.newObjFromOther(this.specifications)
        if (JSON.stringify(productSpecifications) !== JSON.stringify(this.productSpecificationsState)) {
          this.$store.commit('products/editing/setProductSpecifications', this.$leechineo.plugins.newObjFromOther(this.specifications))
        }
      }
    },
    productSpecificationsState () {
      this.mountSpecs()
    }
  },
  mounted () {
    this.mountSpecs()
  },
  methods: {
    mountSpecs () {
      const specifications = this.$leechineo.plugins.newObjFromOther(this.productSpecificationsState)
      if (JSON.stringify(specifications) !== JSON.stringify(this.specification)) {
        this.specifications = this.$leechineo.plugins.newObjFromOther(this.productSpecificationsState)
      }
    },
    setSpecification () {
      if (this.specification.id) {
        this.updateSpec()
      } else {
        this.addSpec()
      }
    },
    cancelEdit () {
      this.cleanSpec()
    },
    updateSpec () {
      const currentSpec = this.specifications.find(spec => spec.id === this.specification.id)
      const currentSpecIndex = this.specifications.indexOf(currentSpec)
      this.specifications[currentSpecIndex].title = this.specification.title
      this.specifications[currentSpecIndex].value = this.specification.value
      this.cleanSpec()
    },
    addSpec () {
      if (!this.specification.title || !this.specification.value) {
        return
      }
      this.specifications.push({
        id: uniqid('product-specification-'),
        title: this.specification.title,
        value: this.specification.value,
        deleteDialog: false
      })
      this.cleanSpec()
    },
    cleanSpec () {
      this.specification = {
        id: '',
        title: '',
        value: '',
        deleteDialog: false
      }
    }
  }
}
</script>

<style>

</style>
