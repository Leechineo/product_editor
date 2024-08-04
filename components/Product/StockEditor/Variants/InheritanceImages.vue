<template>
  <div>
    <div v-if="!options.filter(option => option.images.length).length" class="d-flex justify-center flex-column align-center py-5">
      <div>
        <v-img src="/resources/posting_photo.svg" max-width="400px" class="my-3" />
      </div>
      <div class="text-h4 mt-3">
        Sem images
      </div>
    </div>
    <v-row v-else dense>
      <template v-for="option, index in optionsWithImages">
        <v-col v-if="option.images.length && option.id !== currentOption.id" :key="option.id" cols="12" md="4">
          <leechineo-card :title="itemTitle(option, index)" padding="px-2 pt-2">
            <product-image-selector icon-width="100px" height="150px" width="250px" :items="option.images">
              <template #actionsWithImages>
                <div />
              </template>
              <template #actions>
                <div v-show="false" />
              </template>
            </product-image-selector>
            <v-btn rounded color="primary" elevation="0" class="ma-2" @click="inheritance(option.images)">
              Herdar
            </v-btn>
          </leechineo-card>
        </v-col>
      </template>
    </v-row>
  </div>
</template>

<script>
export default {
  props: {
    stock: {
      type: String,
      default: ''
    },
    currentOption: {
      type: Object,
      default () {
        return {}
      }
    }
  },
  computed: {
    itemTitle: () => (option, index) => {
      if (option.name) {
        return option.name
      } else if (option.names) {
        return option.names.map(item => item.name).join('') ? option.names.map(item => item.name).filter(name => name).join('/') : `Variante ${index + 1}`
      } else {
        return `Variante ${index + 1}`
      }
    },
    productStock () {
      return this.$store.state.products.editing.stocks.find(item => item.stock === this.stock)
    },
    options () {
      return this.productStock?.variants?.options || []
    },
    optionsWithImages () {
      // Remove options with repeated images
      const imagesOnly = this.options.map(option => option.images)
      const stringfiedImages = imagesOnly.map(images => JSON.stringify(images))
      const imagesWithoutRepeated = Array.from(new Set(stringfiedImages))
      const optionsFiltered = []
      imagesWithoutRepeated.forEach((images) => {
        const option = this.options.find(opt => JSON.stringify(opt.images) === images)
        optionsFiltered.push(option)
      })
      return optionsFiltered
    }
  },
  methods: {
    inheritance (images) {
      this.$emit('inherit', images)
    }
  }
}
</script>

<style>

</style>
