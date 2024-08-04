<template>
  <div>
    <leechineo-card title="Padrão">
      <v-text-field v-model="shippingMethodName" label="Nome do método de envio" placeholder="Ex: China Express" outlined dense />
      <v-select
        v-model="selectedCurrency"
        :items="currencies"
        item-text="name"
        item-value="code"
        outlined
        dense
        label="Moeda"
      />
      <v-row dense>
        <v-col cols="12" md="6">
          <v-text-field outlined dense type="number" label="Tempo mínimo" placeholder="15" />
        </v-col>
        <v-col cols="12" md="6">
          <v-text-field outlined dense type="number" label="Tempo máximo" placeholder="25" />
        </v-col>
      </v-row>
    </leechineo-card>
  </div>
</template>

<script>
export default {
  data () {
    return {
      shippingMethodName: '',
      selectedCurrency: 'BRL',
      currencies: [
        {
          code: 'BRL',
          name: 'Real'
        },
        {
          code: 'USD',
          name: 'Dólar'
        }
      ]
    }
  }
}
</script>

<style>

</style>
