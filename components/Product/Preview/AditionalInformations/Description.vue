<template>
  <div v-html="description" />
</template>

<script>
export default {
  props: {
    description: {
      type: String,
      default: ''
    }
  }
}
</script>

<style>

</style>
