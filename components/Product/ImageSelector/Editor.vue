<template>
  <v-dialog
    v-model="show"
    :max-width="maxWidth"
    scrollable
    content-class="rounded-lg"
    :persistent="loading"
  >
    <leechineo-card padding="pa-0" title="Gerenciar Imagens">
      <file-picker
        multiple
        :selected-files="items"
        jpeg
        png
        convert-image
        :path="`products/`"
        customizable-path
        :custom-path="customPath"
        @filesSelected="items = $event"
      >
        <template #content="{ selectFiles }">
          <div v-if="!items.length" class="d-flex justify-center align-center flex-column py-3">
            <div>
              <v-img max-width="200px" src="/resources/landscape.svg" />
            </div>
            <h5 class="text-h5 mt-3">
              Sem imagens
            </h5>
          </div>
          <v-sheet v-else-if="items.length === 1" class="px-2 py-1">
            <product-image-selector-item :item="items[0]" @delete="items.splice(0, 1)" />
          </v-sheet>
          <div v-else>
            <v-sheet max-height="60vh" style="overflow:auto;" class="px-2 py-1">
              <leechineo-draggable-list :drag-items="items" @dragged="items = $event">
                <template #item="{ item }">
                  <product-image-selector-item :item="item" draggable class="my-1" @delete="items.splice(items.indexOf(items.find(_item => item.id === _item.id)), 1)" />
                </template>
              </leechineo-draggable-list>
            </v-sheet>
          </div>
          <v-divider />
          <div class="d-flex justify-end ma-2">
            <v-btn
              rounded
              elevation="0"
              color="primary"
              class="ma-1"
              outlined
              @click="selectFiles()"
            >
              Selecionar
            </v-btn>
            <v-btn rounded elevation="0" color="primary" class="ma-1" @click="done">
              Concluir
            </v-btn>
          </div>
        </template>
      </file-picker>
    </leechineo-card>
  </v-dialog>
</template>

<script>
export default {
  props: {
    value: {
      type: Boolean,
      default: false
    },
    maxWidth: {
      type: String,
      default: '500'
    },
    images: {
      type: Array,
      default () {
        return []
      }
    }
  },
  data () {
    return {
      loading: false,
      show: this.value,
      error: '',
      items: []
    }
  },
  computed: {
    customPath () {
      if (this.$store.state.products.editing.name) {
        return this.$store.state.products.editing.name.replaceAll(' ', '-').trim()
      } else {
        const today = new Date()
        const options = { day: '2-digit', month: '2-digit', year: '2-digit' }
        const dateString = today.toLocaleString('pt-BR', options).replace(/\//g, '')
        return dateString
      }
    }
  },
  watch: {
    show () {
      this.$emit('input', this.show)
    },
    value () {
      this.show = this.value
    },
    images () {
      this.setItems(this.images)
    }
  },
  mounted () {
    this.setItems(this.images)
  },
  methods: {
    filesSelected (items) {
      this.items = this.items.concat(items)
    },
    setItems (items) {
      this.items = items.map((item) => {
        const file = this.$store.state.files.items.find(file => file.id === item)
        return {
          name: file?.path?.split('/').pop(),
          ...file
        }
      })
    },
    done () {
      this.$emit('imagesSelected', this.items)
      this.show = false
    }
  }
}
</script>

<style>
</style>
