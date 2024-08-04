<template>
  <div class="ml-6">
    <leechineo-card class="my-3" :title="'Subcategoria ' + (index + 1)">
      <v-text-field v-model="category.name" outlined dense label="Nome da subcategoria" />
      <v-btn color="primary" rounded @click="addSubcategory">
        Adicionar subcategoria
      </v-btn>
      <v-btn outlined color="red" rounded @click="removeSubCategory">
        Remover subcategoria
      </v-btn>
      <template #actions>
        {{ category }}
      </template>
      <div v-for="subcategory, i in category.subcategories" :key="i">
        <categories-creator-sub-categories :index="i" @removeSubcategory="removeSubcategoryListener" @addSubcategory="addSubcategoryListener" @nameChanged="nameListener" />
      </div>
    </leechineo-card>
  </div>
</template>

<script>
export default {
  props: {
    id: {
      type: String,
      required: true
    },
    index: {
      type: Number,
      required: true
    }
  },
  data () {
    return {
      category: {
        name: '',
        subcategories: []
      }
    }
  },
  watch: {
    'category.name' (v) {
      this.$emit('nameChanged', { name: v, index: this.index })
    }
  },
  methods: {
    addSubcategory () {
      this.category.subcategories.push({ name: '', subcategories: {} })
    },
    removeSubCategory () {
      this.$emit('removeSubcategory', this.index)
    },
    removeSubcategoryListener (index) {
      this.category.subcategories.splice(index, 1)
    }
  }
}
</script>

<style>

</style>
