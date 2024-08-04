<template>
  <div>
    <leechineo-card>
      <div class="d-flex">
        <div
          v-for="item, index in windows"
          :key="item.name"
        >
          <v-sheet
            v-if="show(item)"
            outlined
            :color="index === window ? 'primary' : ''"
            rounded="pill"
            class="px-3 py-1 mx-1"
            style="cursor: pointer;user-select: none;"
            @click="setWindow(index)"
          >
            {{ item.name }}
          </v-sheet>
        </div>
      </div>
    </leechineo-card>
    <div v-if="product.brand">
      <brand :brand-id="product.brand" class="mt-2" />
    </div>
    <v-window v-if="product.description || product.specifications.length" v-model="window">
      <v-window-item v-if="product.description">
        <leechineo-card class="mt-2" padding="pa-5">
          <product-preview-aditional-informations-description :description="product.description" />
        </leechineo-card>
      </v-window-item>
      <v-window-item v-if="product.specifications.length">
        <product-preview-aditional-informations-specifications :specifications="product.specifications" class="mt-2" />
      </v-window-item>
    </v-window>
  </div>
</template>

<script>
export default {
  props: {
    product: {
      type: Object,
      default () {
        return {}
      }
    }
  },
  data () {
    return {
      window: 0,
      windows: [
        {
          id: 'description',
          name: 'Descrição'
        },
        {
          id: 'specifications',
          name: 'Especificações'
        }
      ]
    }
  },
  methods: {
    setWindow (index) {
      this.window = index
    },
    show (item) {
      if (item.id === 'description') {
        return !!this.product.description
      } else {
        return !!this.product.specifications.length
      }
    }
  }
}
</script>

<style>

</style>
