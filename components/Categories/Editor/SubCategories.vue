<template>
  <div>
    <leechineo-card v-if="show" class="mx-3 my-3" :title="expand ? '' : category.name || 'Subcategoria ' + (index + 1)">
      <v-btn
        outlined
        depressed
        rounded
        block
        color="primary"
        class="mb-3"
        @click="expand = !expand"
      >
        {{ expand ? 'Ver menos' : 'Expandir' }}
      </v-btn>
      <v-expand-transition>
        <div v-show="expand">
          <v-text-field v-model="category.name" outlined dense :label="`Nome (subcategoria ${(index + 1)})`" />
          <v-btn color="primary" rounded class="mx-2" @click="addSubcategory">
            Adicionar subcategoria
          </v-btn>
          <v-btn outlined color="red" rounded @click="removeSubCategory">
            Remover subcategoria
          </v-btn>
          <div v-for="subcategory, i in category.subcategories" :key="i">
            <categories-editor-sub-categories
              :id="subcategory.id"
              :ref="subcategory.id"
              :index="i"
              :category-restored="subcategory"
            />
          </div>
        </div>
      </v-expand-transition>
    </leechineo-card>
  </div>
</template>

<script>
import uniqid from 'uniqid'

export default {
  props: {
    inTrash: {
      type: Boolean,
      default: false
    },
    id: {
      type: String,
      required: true
    },
    index: {
      type: Number,
      required: true
    },
    categoryRestored: {
      type: Object,
      default () {
        return {
          name: '',
          subcategories: []
        }
      }
    }
  },
  data () {
    return {
      expand: this.categoryRestored.expand ?? true,
      show: true,
      category: {
        id: this.id,
        name: '',
        subcategories: []
      }
    }
  },
  created () {
    if (this.categoryRestored.name) {
      this.category.name = this.categoryRestored.name
    }
    if (this.categoryRestored.subcategories?.length) {
      this.category.subcategories = this.categoryRestored.subcategories.map(subcategory => ({ expand: false, ...subcategory }))
    }
  },
  methods: {
    addSubcategory () {
      this.category.subcategories.push({ id: uniqid('SUBCATEGORY-').toUpperCase(), name: '', subcategories: [] })
    },
    removeSubCategory () {
      this.show = false
    }
  }
}
</script>

<style>

</style>
