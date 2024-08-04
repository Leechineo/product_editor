<template>
  <div>
    <v-fade-transition>
      <div v-show="show">
        <div style="position: absolute; top: 0px; left: 0px; width: 100vw; height: 100vh; background-color: rgba(0, 0, 0, .75); z-index: 1000;" class="d-flex justify-center align-center flex-column">
          <leechineo-loading />
          <div class="mt-3 text-h5">
            {{ $store.state.loadingDialog.title }}
          </div>
          <v-btn v-if="cancelable" color="primary" class="mt-3" rounded @click="cancel">
            Cancelar
          </v-btn>
        </div>
      </div>
    </v-fade-transition>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      show: this.value,
      error: ''
    }
  },
  computed: {
    showLoadingDialogState () {
      return this.$store.state.loadingDialog.show
    },
    cancelable () {
      return this.$store.state.loadingDialog.cancelable
    }
  },
  watch: {
    show (v) {
      if (!v) {
        this.$store.commit('setLoadingDialog', {
          title: '',
          show: false
        })
      }
    },
    showLoadingDialogState () {
      this.show = this.showLoadingDialogState
    }
  },
  methods: {
    cancel () {
      this.show = false
      this.$router.push('/')
    }
  }
}
</script>

<style scoped>
</style>
