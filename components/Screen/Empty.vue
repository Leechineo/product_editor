<template>
  <div class="d-flex justify-center align-center flex-column">
    <div>
      <v-img src="/resources/empty.svg" :max-width="imageWidth" />
    </div>
    <div :class="`mt-3 ${textSize}`">
      {{ title }}
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: 'Vazio'
    },
    sm: {
      type: Boolean,
      default: false
    },
    md: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    imageWidth () {
      if (this.sm) {
        return '100px'
      }
      if (this.md) {
        return '200px'
      }
      return '300px'
    },
    textSize () {
      if (this.sm) {
        return 'text-h6'
      }
      if (this.md) {
        return 'text-h5'
      }
      return 'text-h4'
    }
  }
}
</script>

<style>

</style>
