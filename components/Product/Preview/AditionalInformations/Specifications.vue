<template>
  <div>
    <leechineo-card padding="pa-0">
      <v-simple-table>
        <template>
          <thead>
            <tr>
              <th class="text-left">
                Especificação
              </th>
              <th class="text-left">
                Descrição
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="spec in specifications" :key="spec.id">
              <td>
                <v-sheet class="my-2">
                  {{ spec.title }}
                </v-sheet>
              </td>
              <td>
                <v-sheet class="my-2">
                  {{ spec.value }}
                </v-sheet>
              </td>
            </tr>
          </tbody>
        </template>
      </v-simple-table>
    </leechineo-card>
  </div>
</template>

<script>
export default {
  props: {
    specifications: {
      type: Array,
      default () {
        return []
      }
    }
  }
}
</script>

<style>
.theme--dark.v-data-table > .v-data-table__wrapper > table > tbody > tr:hover:not(.v-data-table__expanded__content):not(.v-data-table__empty-wrapper) {
  background: none !important;
}
</style>
