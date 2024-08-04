<template>
  <v-dialog
    v-model="show"
    :max-width="maxWidth"
    scrollable
    content-class="rounded-lg"
    :persistent="loading"
  >
    <leechineo-card title="Deseja deletar os arquivos?" overflow-y max-height="60vh">
      <v-row dense justify="center">
        <v-col v-for="file, i in files" :key="i" cols="6" md="4">
          <file-picker-widget
            :ref="file.id"
            v-model="file.selected"
            :file="file"
            class="ma-1"
          />
        </v-col>
      </v-row>
      <template #actions>
        <v-btn class="ma-1" elevation="0" rounded color="primary" @click="show = false">
          Cancelar
        </v-btn>
        <v-btn class="ma-1" elevation="0" rounded color="red darken-3" @click="confirm">
          Deletar
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
      default: '600'
    },
    files: {
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
      error: ''
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
    confirm () {
      this.$emit('confirm')
      this.show = false
    }
  }
}
</script>

<style>
</style>
