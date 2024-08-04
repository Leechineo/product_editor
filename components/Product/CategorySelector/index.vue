<template>
  <leechineo-card title="Categoria">
    <div v-if="categorySeleted">
      <categories-item :category="categorySeleted" :expansible="false" read-only />
    </div>
    <v-row dense>
      <v-col cols="12" md="6">
        <v-btn
          block
          elevation="0"
          rounded
          color="primary"
          small
          @click="dialogs.selector = true"
        >
          {{ categorySelectedId ? 'Mudar' : 'Selecionar' }}
        </v-btn>
      </v-col>
      <v-col cols="12" md="6">
        <v-btn
          block
          elevation="0"
          rounded
          color="primary"
          small
          @click="dialogs.creator = true"
        >
          Criar
        </v-btn>
      </v-col>
    </v-row>
    <product-category-selector-dialog v-model="dialogs.selector" @selected="setCategory" />
    <categories-editor v-model="dialogs.creator" />
  </leechineo-card>
</template>

<script>
export default {
  props: {
    category: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      categorySelectedId: '',
      dialogs: {
        selector: false,
        creator: false
      },
      categorySeleted: null
    }
  },
  watch: {
    async categorySelectedId () {
      this.categorySeleted = await this.updateCategorySelected()
    },
    category () {
      this.categorySelectedId = this.category
    }
  },
  mounted () {
    this.categorySelectedId = this.category
  },
  methods: {
    setCategory (categoryid) {
      this.$emit('selected', categoryid)
      this.categorySelectedId = categoryid
    },
    // eslint-disable-next-line require-await
    async updateCategorySelected () {
      if (this.categorySelectedId) {
        // return await this.$leechineo.categories.get(this.categorySelectedId) //TODO category
      }
      return null
    }
  }
}
</script>

<style>

</style>
