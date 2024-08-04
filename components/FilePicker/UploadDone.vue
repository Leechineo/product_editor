<template>
  <v-dialog
    v-model="show"
    :max-width="maxWidth"
    scrollable
    content-class="rounded-lg"
    :persistent="loading"
  >
    <leechineo-card>
      <v-sheet class="d-flex flex-column align-center">
        <div>
          <v-img src="/general-images/done.svg" max-width="100px" />
        </div>
        <h3 class="mt-2">
          Upload concluído!
        </h3>
        <span>Deseja usar os arquivos recém enviados?</span>
        <v-sheet class="d-flex flex-wrap">
          <v-btn class="ma-1" rounded color="primary" elevation="0" @click="useFiles">
            Sim
          </v-btn>
          <v-btn class="ma-1" rounded color="red darken-3" elevation="0" @click="show = false">
            Não
          </v-btn>
          <v-btn class="ma-1" rounded color="primary" elevation="0" @click="exploreFiles">
            Explorar os arquivos
          </v-btn>
        </v-sheet>
      </v-sheet>
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
    useFiles () {
      this.$emit('useFiles')
      this.show = false
    },
    exploreFiles () {
      this.$emit('exploreFiles')
      this.show = false
    }
  }
}
</script>

<style>
</style>
