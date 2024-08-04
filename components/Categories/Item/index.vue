<template>
  <div>
    <leechineo-card class="my-2">
      <div class="d-flex align-center justify-space-between">
        <div class="d-flex">
          <span v-if="type === 'SUBCATEGORY'" class="material-symbols-outlined primary--text mt-1">
            line_start_diamond
          </span>
          <v-sheet v-if="type === 'SUBCATEGORY'" :color="category.subcategories.length ? 'primary' : 'transparent'" class="px-3 py-1 rounded" style="margin-left: -2px;">
            {{ category.name }}
          </v-sheet>
          <span v-else>
            {{ category.name }}
          </span>
        </div>
        <div v-if="!readOnly">
          <v-btn
            v-if="type === 'CATEGORY' && !hideActions"
            rounded
            color="primary"
            class="mr-2"
            @click="dialogs.editor = true"
          >
            <v-icon>edit</v-icon>
          </v-btn>
          <v-btn v-if="type === 'CATEGORY' && !hideActions" rounded color="red" class="mr-2" @click="dialogs.delete = true">
            <v-icon>delete</v-icon>
          </v-btn>
          <v-btn
            v-show="category.subcategories.length"
            color="primary"
            outlined
            rounded
            class="ml-5"
            elevation="0"
            @click="show = !show"
          >
            {{ !show ? 'Expandir' : 'Recolher' }}
          </v-btn>
        </div>
        <div v-else>
          <v-btn v-show="category.subcategories.length" rounded color="primary" elevation="0" @click="show = !show">
            {{ !show ? 'Expandir' : 'Recolher' }}
          </v-btn>
        </div>
      </div>
      <categories-editor v-if="type === 'CATEGORY'" v-model="dialogs.editor" :category="category" />
      <v-expand-transition v-if="expansible">
        <div v-show="show">
          <categories-item v-for="subcategory, i in category.subcategories" :key="i" :category="subcategory" />
        </div>
      </v-expand-transition>
      <categories-item-dialog v-else v-model="show" :category="category" :read-only="readOnly" />
    </leechineo-card>
    <v-dialog v-if="type === 'CATEGORY'" v-model="dialogs.delete" max-width="500px" :persistent="loading">
      <leechineo-card title="Deletar categoria?">
        <categories-item v-if="category" :category="category" :hide-actions="true" />
        <template #actions>
          <v-btn
            :disabled="loading"
            rounded
            elevation="0"
            color="primary"
            outlined
            @click="dialogs.delete = false"
          >
            Cancelar
          </v-btn>
          <v-btn
            :disabled="loading"
            :loading="loading"
            rounded
            elevation="0"
            color="red"
            class="ml-2"
            @click="deleteCategory"
          >
            Deletar
          </v-btn>
        </template>
      </leechineo-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  props: {
    expansible: {
      type: Boolean,
      default: true
    },
    readOnly: {
      type: Boolean,
      default: false
    },
    category: {
      type: Object,
      required: true
    },
    hideActions: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      show: false,
      loading: false,
      dialogs: {
        editor: false,
        delete: false
      }
    }
  },
  computed: {
    type () {
      const id = this.category.id
      const type = id.split('-')[0]
      return type
    }
  },
  methods: {
    async deleteCategory () {
      this.loading = true
      try {
        await this.$leechineo.categories.delete(this.category.id)
      } catch (e) {
        this.$pushError('Erro ao excluir categoria', e)
      }
      this.dialogs.delete = false
      this.loading = false
    }
  }
}
</script>

<style>
.material-symbols-outlined {
  font-variation-settings:
  'FILL' 1,
  'wght' 400,
  'GRAD' 0,
  'opsz' 48
}
</style>
