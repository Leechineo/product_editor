<template>
  <v-dialog
    v-model="show"
    :max-width="maxWidth"
    scrollable
    content-class="rounded-lg"
    :persistent="loading"
  >
    <leechineo-card fixed-actions overflow-y max-height="60vh" title="Gerenciar">
      <leechineo-draggable-list :drag-items="items" @dragged="itemsToOrder = $event">
        <template #item="{ item, index }">
          <slot name="item" :item="item" :index="index" />
        </template>
      </leechineo-draggable-list>
      <template #actions>
        <v-btn class="ma-1" elevation="0" rounded color="red darken-3" @click="show = false">
          Cancelar
        </v-btn>
        <v-btn class="ma-1" elevation="0" rounded color="primary" @click="done">
          Confirmar
        </v-btn>
      </template>
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
    items: {
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
      itemsToOrder: []
    }
  },
  watch: {
    show () {
      this.$emit('input', this.show)
    },
    value () {
      this.show = this.value
      this.itemsToOrder = [...this.items]
    }
  },
  mounted () {
    this.itemsToOrder = [...this.items]
  },
  methods: {
    done () {
      this.$emit('reordered', this.itemsToOrder)
      this.show = false
    }
  }
}
</script>

<style>
</style>
