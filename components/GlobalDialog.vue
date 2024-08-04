<template>
  <v-dialog
    v-model="show"
    max-width="500"
    scrollable
    content-class="rounded-lg"
  >
    <leechineo-card :title="dialogData.title">
      <v-sheet v-if="dialogData.content || dialogData.icon" outlined rounded="lg" class="d-flex justify-center flex-column align-center pa-3">
        <v-icon v-if="dialogData.icon" :color="dialogData.color || 'white'" size="50">
          {{ dialogData.icon }}
        </v-icon>
        <div v-if="dialogData.content" :class="`${dialogData.color || 'white'}--text text-center my-3`">
          {{ dialogData.content }}
        </div>
      </v-sheet>
      <template #actions>
        <v-btn rounded elevation="0" color="primary" @click="show = false">
          Ok
        </v-btn>
      </template>
    </leechineo-card>
  </v-dialog>
</template>

<script>
export default {
  data () {
    return {
      show: this.value,
      error: ''
    }
  },
  computed: {
    showErrorDialogState () {
      return this.$store.state.globalDialog.show
    },
    dialogData () {
      return this.$store.state.globalDialog
    }
  },
  watch: {
    show (v) {
      if (!v) {
        this.$store.commit('setGlobalDialog', {
          title: '',
          content: '',
          show: false
        })
      }
    },
    showErrorDialogState () {
      this.show = this.showErrorDialogState
    }
  }
}
</script>

<style>
</style>
