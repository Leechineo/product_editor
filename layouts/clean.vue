<template>
  <v-app>
    <v-main :style="`background-color: ${$store.state.primaryBackground} !important;`">
      <v-container class="pa-4">
        <Nuxt />
      </v-container>
    </v-main>
    <GlobalDialog />
  </v-app>
</template>

<script>
export default {

}
</script>

<style>

</style>
