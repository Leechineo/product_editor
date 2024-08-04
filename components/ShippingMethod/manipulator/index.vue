<template>
  <div>
    <v-row dense>
      <v-col cols="12" md="6">
        <shipping-method-manipulator-default />
      </v-col>
      <v-col cols="12" md="6">
        <leechineo-card title="Mapeamentos">
          <div class="d-flex mb-3">
            <v-sheet v-for="n in 5" :key="n" :color="n === 1 ? 'primary' : ''" class="rounded px-3 py-1 mx-1" outlined>
              Mapeamento {{ n }}
            </v-sheet>
          </div>
          <v-text-field label="CEP" placeholder="65930-000" outlined dense />
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
          <template #actions>
            <v-btn class="ma-1" rounded color="red darken-3" elevation="0">
              <v-icon>
                delete
              </v-icon>
            </v-btn>
            <v-btn class="ma-1" rounded color="primary" elevation="0">
              Adicionar mapeamento
            </v-btn>
          </template>
        </leechineo-card>
      </v-col>
      <v-col cols="12">
        <leechineo-card title="Configuração por produto">
          <screen-empty title="Sem produtos mapeados" md />
          <template #actions>
            <v-btn rounded color="primary" elevation="0">
              Adicionar
            </v-btn>
          </template>
        </leechineo-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  data () {
    return {
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
