<template>
  <v-dialog
    v-model="show"
    max-width="600"
    scrollable
    content-class="rounded-lg"
    :persistent="loading"
  >
    <leechineo-card title="Categorias de ícones">
      <div class="d-flex flex-wrap justify-center align-center">
        <v-sheet
          v-for="category, i in iconsCategories"
          :key="i"
          width="100px"
          style="cursor: pointer;"
          height="100px"
          rounded="lg"
          outlined
          class="pa-2 ma-2 d-flex justify-center align-center flex-column"
        >
          <v-icon color="primary">
            {{ category.icon }}
          </v-icon>
          <v-tooltip bottom>
            <template #activator="{on, attrs}">
              <span class="pt-2 text-truncate" style="max-width: 75px;" v-bind="attrs" v-on="on">{{ category.translated }}</span>
            </template>
            <span>{{ category.translated }}</span>
          </v-tooltip>
        </v-sheet>
      </div>
      <template #actions>
        <v-btn color="red" rounded elevation="0" @click="show = false">
          Cancelar
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
    }
  },
  data () {
    return {
      iconsCategories: [
        {
          name: 'action',
          icon: 'delete',
          translated: 'Ações'
        },
        {
          name: 'alert',
          icon: 'notifications_active',
          translated: 'Alertas'
        },
        {
          name: 'av',
          icon: 'cast',
          translated: 'Cast'
        },
        {
          name: 'communication',
          icon: 'chat',
          translated: 'Comunicação'
        },
        {
          name: 'content',
          icon: 'content_copy',
          translated: 'Conteúdo'
        },
        {
          name: 'device',
          icon: 'devices',
          translated: 'Dispositivos'
        },
        {
          name: 'editor',
          icon: 'format_size',
          translated: 'Editor de texto'
        },
        {
          name: 'file',
          icon: 'folder_open',
          translated: 'Arquivos'
        },
        {
          name: 'hardware',
          icon: 'memory',
          translated: 'Hardware'
        },
        {
          name: 'image',
          icon: 'image',
          translated: 'Edição de imagem'
        },
        {
          name: 'maps',
          icon: 'map',
          translated: 'Mapa'
        },
        {
          name: 'navigation',
          icon: 'arrow_back_ios',
          translated: 'Navegação'
        },
        {
          name: 'notification',
          icon: 'mark_email_unread',
          translated: 'Notificações'
        },
        {
          name: 'places',
          icon: 'storefront',
          translated: 'Estabelecimentos'
        },
        {
          name: 'social',
          icon: 'share',
          translated: 'Redes sociais'
        },
        {
          name: 'toggle',
          icon: 'check_box',
          translated: 'Toggle'
        }
      ],
      loading: false,
      show: this.value,
      error: ''
    }
  },
  watch: {
    show () {
      this.$emit('input', this.show)
    },
    value () {
      this.show = this.value
    }
  }
}
</script>

<style>
</style>
