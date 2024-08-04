<template>
  <div>
    <v-sheet class="pa-2" rounded="lg" outlined>
      <div>
        {{ stock.name }}
      </div>
      <div>
        Moeda: {{ stock.currency }}
      </div>
    </v-sheet>
    <div class="mt-1">
      <v-row dense>
        <v-col cols="6">
          <v-btn elevation="0" color="primary" block @click="dialogs.edit = true">
            <v-icon>edit</v-icon>
          </v-btn>
        </v-col>
        <v-col cols="6">
          <v-btn color="cancel" elevation="0" block @click="dialogs.delete = true">
            <v-icon>delete</v-icon>
          </v-btn>
        </v-col>
      </v-row>
    </div>
    <leechineo-dialog v-model="dialogs.delete" :title="`Deseja deletar o estoque ${stock.name}`" :persistent="loading">
      <template #actions>
        <v-btn class="ma-1" color="primary" rounded :disabled="loading">
          Cancelar
        </v-btn>
        <v-btn class="ma-1" color="cancel" rounded :loading="loading" @click="deleteStock">
          Deletar
        </v-btn>
      </template>
    </leechineo-dialog>
    <stock-editor v-model="dialogs.edit" :edit-stock="stock" />
  </div>
</template>

<script>
export default {
  props: {
    stock: {
      type: Object,
      default () {
        return {}
      }
    }
  },
  data () {
    return {
      dialogs: {
        delete: false,
        edit: false
      },
      loading: false
    }
  },
  methods: {
    async deleteStock () {
      this.loading = true
      try {
        await this.$leechineo.stock.delete(this.stock.id)
        this.dialogs.edit = false
      } catch (e) {
        this.$pushError('Falha ao deletar estoque', e)
      }
      this.loading = false
    }
  }
}
</script>

<style>

</style>
