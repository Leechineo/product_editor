<template>
  <v-expand-transition>
    <v-sheet v-show="show" :class="error ? 'error--text' : ''" height="20px">
      <div>
        <slot>
          {{ message }}
        </slot>
      </div>
    </v-sheet>
  </v-expand-transition>
</template>

<script>
export default {
  props: {
    message: {
      type: String,
      default: ''
    },
    show: {
      type: Boolean,
      default: false
    },
    error: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style>

</style>
