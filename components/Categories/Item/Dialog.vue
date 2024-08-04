<template>
  <v-dialog
    v-model="show"
    :max-width="maxWidth"
    scrollable
    content-class="rounded-lg"
    :persistent="loading"
  >
    <leechineo-card :title="category.name">
      <categories-item :category="category" :read-only="readOnly" />
    </leechineo-card>
  </v-dialog>
</template>

<script>
export default {
  props: {
    category: {
      type: Object,
      required: true
    },
    readOnly: {
      type: Boolean,
      default: true
    },
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
  }
}
</script>

<style>
</style>
