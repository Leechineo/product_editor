<template>
  <v-dialog
    v-model="show"
    :max-width="maxWidth"
    scrollable
    fullscreen
    content-class="rounded-lg"
    :persistent="loading"
  >
    <leechineo-card title="Criar categoria">
      <v-text-field v-model="newCategory.name" outlined dense label="Nome da categoria" />
      <v-btn outlined color="primary" rounded @click="addSubCategory">
        Adicionar subcategoria
      </v-btn>
      <div class="d-flex flex-wrap">
        <categories-editor-sub-categories
          v-for="subcategory, i in newCategory.subcategories"
          :id="subcategory.id"
          :key="i"
          :ref="subcategory.id"
          :index="i"
          :aria-checked="subcategory.id"
          :category-restored="subcategory"
        />
      </div>
      <template #actions>
        <v-btn
          outlined
          color="red"
          class="mr-2"
          rounded
          elevation="0"
          :disabled="loading"
          @click="show = false"
        >
          Cancelar
        </v-btn>
        <v-btn
          color="primary"
          rounded
          elevation="0"
          :loading="loading"
          :disabled="loading"
          @click="done"
        >
          Salvar
        </v-btn>
      </template>
    </leechineo-card>
  </v-dialog>
</template>

<script>
import uniqid from 'uniqid'

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
    category: {
      type: Object,
      default () {
        return {}
      }
    }
  },
  data () {
    return {
      showTrash: false,
      loading: false,
      show: this.value,
      error: '',
      dialogs: {
        iconSelector: false
      },
      newCategory: {
        _id: this.category._id,
        id: this.category.id || uniqid('CATEGORY-').toUpperCase(),
        name: this.category.name || '',
        subcategories: this.category.subcategories?.map(category => ({ show: true, expand: false, ...category })) || []
      },
      categoryName: ''
    }
  },
  computed: {
    trashed () {
      return (id) => {
        if (this.$refs[id]) {
          return !this.$refs[id][0].show
        }
        return false
      }
    }
  },
  watch: {
    show () {
      this.$emit('input', this.show)
    },
    value () {
      this.show = this.value
    }
  },
  methods: {
    addSubCategory () {
      this.newCategory.subcategories.push({ id: uniqid('SUBCATEGORY-').toUpperCase() })
    },
    extractRefsData (refs, currentCategory = { id: '', name: '', subcategories: [] }) {
      for (const key in refs) {
        for (const ref in refs[key]) {
          if (!refs[key][ref].show) {
            continue
          }
          const subcategory = { ...refs[key][ref].category }
          if (Object.keys(refs[key][ref]?.$refs || {})?.length) {
            currentCategory.subcategories.push(this.extractRefsData(refs[key][ref].$refs, { id: subcategory.id, name: subcategory.name, subcategories: [] }))
          } else {
            currentCategory.subcategories.push({ id: subcategory.id, name: subcategory.name, subcategories: [] })
          }
        }
      }
      return currentCategory
    },
    async done () {
      this.loading = true
      const category = this.extractRefsData(this.$refs, { id: this.newCategory.id, name: this.newCategory.name, subcategories: [] })
      try {
        if (this.newCategory._id) {
          await this.$leechineo.categories.update(this.newCategory._id, category)
        } else {
          await this.$leechineo.categories.create(category)
        }
      } catch (e) {
        this.$pushError('Falha ao ' + this.category._id ? 'salvar as alterações' : 'salvar a categoria', e)
      }
      this.show = false
      this.loading = false
      if (!this.category._id) {
        this.newCategory = {
          id: uniqid('CATEGORY-').toUpperCase(),
          name: '',
          subcategories: []
        }
      }
    }
  }
}
</script>

<style>
</style>
