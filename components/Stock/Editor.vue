<template>
  <v-dialog
    v-model="show"
    :max-width="maxWidth"
    scrollable
    content-class="rounded-lg"
    :persistent="loading"
  >
    <leechineo-card>
      <v-select
        v-model="countrySelected"
        :items="countries"
        item-text="country"
        item-value="abbr"
        outlined
        dense
        :disabled="loading"
      />
      <v-text-field
        v-model="stock.name"
        :error="!!stock.nameError"
        :messages="[stock.nameError]"
        label="Nome do Estoque / Localização"
        outlined
        dense
        :disabled="loading"
      />
      <v-text-field v-model="stock.shippingMethod" label="Método de envio" disabled outlined dense />
      <v-text-field v-model="stock.currency" label="Moeda" disabled outlined dense />
      <template #actions>
        <v-btn
          :disabled="loading"
          rounded
          elevation="0"
          color="cancel"
          class="ma-1"
          @click="show = false"
        >
          Fechar
        </v-btn>
        <v-btn
          :loading="loading"
          rounded
          elevation="0"
          color="primary"
          class="ma-1"
          @click="saveStock"
        >
          Salvar
        </v-btn>
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
    editStock: {
      type: Object,
      default: undefined
    }
  },
  data () {
    return {
      loading: false,
      show: this.value,
      error: '',
      countrySelected: { country: 'Brasil', abbr: 'br' },
      countries: [
        { country: 'Brasil', abbr: 'br' },
        { country: 'China', abbr: 'cn' }
      ],
      stock: {
        id: '',
        name: '',
        shippingMethod: '61e20e4a1c156f4cd0fd3788',
        currency: 'BRL',
        nameError: ''
      }
    }
  },
  watch: {
    stock: {
      deep: true,
      handler () {
        if (this.stock.name) {
          this.stock.nameError = ''
        }
      }
    },
    show () {
      this.$emit('input', this.show)
    },
    value () {
      this.show = this.value
    }
  },
  mounted () {
    if (this.editStock) {
      this.stock = {
        id: this.editStock.id,
        name: this.editStock.name,
        shippingMethod: this.editStock.shippingMethod,
        currency: this.editStock.currency,
        nameError: ''
      }
    }
  },
  methods: {
    async saveStock () {
      if (!this.stock.name) {
        this.stock.nameError = 'Insina um nome'
        return
      }
      this.loading = true
      try {
        const stockToSave = {
          name: this.stock.name,
          country: this.countrySelected.abbr,
          shippingMethod: this.stock.shippingMethod,
          currency: this.stock.currency
        }
        if (this.stock.id) {
          await this.$leechineo.stock.update(this.stock.id, stockToSave)
        } else {
          await this.$leechineo.stock.create(stockToSave)
          this.stock = {
            name: '',
            country: this.countrySelected,
            shippingMethod: '',
            currency: '',
            nameError: ''
          }
        }
        this.show = false
      } catch (e) {
        this.$pushError('Erro ao criar estoque', e)
      }
      this.loading = false
    }
  }
}
</script>

<style>
</style>
