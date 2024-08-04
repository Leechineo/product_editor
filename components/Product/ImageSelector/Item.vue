<template>
  <div style="user-select: none;">
    <v-sheet outlined class="d-flex align-center py-2 pl-3 justify-space-between" rounded>
      <v-sheet class="d-flex align-center" max-width="90%">
        <v-icon v-if="draggable" color="primary" class="mr-3" size="20">
          mdi-format-list-bulleted
        </v-icon>
        <img width="60px" :src="$leechineo.files.getUrl(item.id)" class="rounded">
        <v-sheet class="ml-2 text-truncate" max-width="70%">
          <strong>
            {{ item.name }}
          </strong>
        </v-sheet>
      </v-sheet>
      <v-btn icon color="cancel" class="mr-3" @click="dialogs.delete = true">
        <v-icon>delete</v-icon>
      </v-btn>
    </v-sheet>
    <leechineo-dialog v-model="dialogs.delete" title="Deseja deletar a imagem?">
      <div class="d-flex justify-center align-center">
        <div>
          <v-img :src="$leechineo.files.getUrl(item.id)" max-width="200px" class="my-3 rounded-lg" />
        </div>
      </div>
      <template #actions>
        <v-btn class="ma-1" rounded color="primary" elevation="0" @click="dialogs.delete = false">
          Cancelar
        </v-btn>
        <v-btn class="ma-1" rounded color="cancel" elevation="0" @click="$emit('delete')">
          Deletar
        </v-btn>
      </template>
    </leechineo-dialog>
  </div>
</template>

<script>
export default {
  props: {
    draggable: {
      type: Boolean,
      default: false
    },
    item: {
      type: Object,
      default () {
        return {}
      }
    }
  },
  data () {
    return {
      dialogs: {
        delete: false
      }
    }
  }
}
</script>

<style>

</style>
