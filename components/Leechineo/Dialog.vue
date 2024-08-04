<template>
  <v-dialog
    v-model="show"
    :max-width="maxWidth"
    scrollable
    content-class="rounded-lg"
    :persistent="persistent"
  >
    <leechineo-card :title="title" :padding="padding" :max-height="maxHeight" overflow-y>
      <template #title>
        <slot name="title" />
      </template>
      <slot />
      <template #actions>
        <slot name="actions" />
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
    maxHeight: {
      type: String,
      default: ''
    },
    padding: {
      type: String,
      default: ''
    },
    title: {
      type: String,
      default: ''
    },
    persistent: {
      type: Boolean,
      default: false
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
