<template>
  <div>
    <v-row v-if="$store.state.stocks.items.length" dense>
      <v-col cols="12" md="4" lg="3">
        <leechineo-card padding="pa-2" style="overflow: auto;" title="Estoque">
          <v-list nav>
            <v-list-item-group v-model="stock" color="primary" mandatory>
              <v-list-item v-for="stock in $store.state.stocks.items" :key="stock.id">
                <v-list-item-content>
                  <v-list-item-title>
                    <div class="d-flex align-center">
                      <v-expand-x-transition>
                        <v-sheet v-show="!!validStocks.find(item => item === stock.id)">
                          <v-icon color="green" class="mr-1">
                            done
                          </v-icon>
                        </v-sheet>
                      </v-expand-x-transition>
                      {{ stock.name }}
                    </div>
                  </v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list-item-group>
          </v-list>
          <v-btn text block @click="dialogs.createStock = true">
            <v-icon color="primary">
              add
            </v-icon>
          </v-btn>
        </leechineo-card>
      </v-col>
      <v-col cols="12" md="8" lg="9">
        <leechineo-card padding="pa-2" style="overflow: auto;" title="Variantes">
          <v-window v-model="stock" vertical touchless>
            <v-window-item v-for="stockItem in $store.state.stocks.items" :key="stockItem.id">
              <product-stock-editor-variants :ref="`variants-${stockItem.id}`" :stock="stockItem.id" />
            </v-window-item>
          </v-window>
        </leechineo-card>
      </v-col>
    </v-row>
    <leechineo-card v-else>
      <div class="d-flex justify-center flex-column align-center">
        <div class="my-3">
          <v-img src="/resources/empty_cart.svg" max-width="300px" />
        </div>
        <div class="text-h4 my-3">
          Onde vamos armazenar esse produto?
        </div>
        <v-btn rounded color="primary" elevation="0" class="my-3" @click="dialogs.createStock = true">
          Adicionar Estoque
        </v-btn>
      </div>
    </leechineo-card>
    <stock-editor v-model="dialogs.createStock" />
  </div>
</template>

<script>
export default {
  data () {
    return {
      stock: 0,
      dialogs: {
        createStock: false
      }
    }
  },
  computed: {
    validStocks () {
      return this.$store.getters['products/editing/validStocks']()
    }
  }
}
</script>

<style>

</style>
