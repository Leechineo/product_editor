<template>
  <div>
    <leechineo-card title="Marca">
      <v-row dense>
        <v-col v-for="item in $store.state.brands.items" :key="item.id">
          <brand
            :brand="item"
            :hide-name="true"
            height="100px"
            selectable
            :selected="item.id === selectedBrand"
            @selected="setSelectedBrand"
          />
        </v-col>
      </v-row>
      <v-btn
        rounded
        elevation="0"
        color="primary"
        small
        block
        class="mt-3"
        @click="dialogs.creator = true"
      >
        Criar
      </v-btn>
    </leechineo-card>
    <brand-editor v-model="dialogs.creator" />
  </div>
</template>

<script>
export default {
  props: {
    brand: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      selectedBrand: '',
      dialogs: {
        creator: false
      }
    }
  },
  watch: {
    selectedBrand () {
      this.$emit('changed', this.selectedBrand)
    },
    brand () {
      this.selectedBrand = this.brand
    }
  },
  mounted () {
    this.selectedBrand = this.brand
  },
  methods: {
    setSelectedBrand (brandId) {
      if (this.selectedBrand === brandId) {
        this.selectedBrand = ''
      } else {
        this.selectedBrand = brandId
      }
    }
  }
}
</script>

<style>

</style>
