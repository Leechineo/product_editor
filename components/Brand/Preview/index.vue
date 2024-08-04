<template>
  <v-sheet
    class="d-flex flex-column align-center justify-space-between"
    width="400px"
    height="220px"
    :color="dark ? '#212121' : '#FAFAFA'"
    rounded="lg"
  >
    <v-sheet class="d-flex align-center justify-space-between px-2 py-1" width="400px" :color="dark ? '#303030' : '#F2F2F2'" rounded="t-lg">
      <div>
        <v-img src="/resources/leechineo-logo.svg" width="35px" />
      </div>
      <v-sheet rounded="lg" width="300px" height="30px" :color="dark ? '#393939' : 'grey lighten-2'" :class="(dark ? 'grey--text text--darken-1' : 'grey--text text--lighten-1') + ' d-flex justify-start align-end pl-3 pb-1'">
        Buscar...
      </v-sheet>
      <v-sheet width="30px" height="30px" color="primary" rounded="circle" class="d-flex justify-center align-center">
        A
      </v-sheet>
    </v-sheet>
    <slot />
  </v-sheet>
</template>

<script>
export default {
  props: {
    dark: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style>

</style>
