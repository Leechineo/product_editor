<template>
  <div>
    <v-tooltip bottom :disabled="!hideName || (!name && !item.name)">
      <template #activator="{ on, attrs }">
        <div :style="(selectable ? 'cursor: pointer;' : '') + 'user-select: none;'" v-bind="attrs" @click="select" v-on="on">
          <v-sheet
            v-if="editable"
            style="position: absolute; z-index: 1;"
            class="ma-1"
            rounded
            outlined
          >
            <v-btn icon x-small color="primary" @click="dialogs.edit = true">
              <v-icon>edit</v-icon>
            </v-btn>
            <v-btn icon x-small color="cancel" @click="dialogs.delete = true">
              <v-icon>
                delete
              </v-icon>
            </v-btn>
          </v-sheet>
          <v-sheet
            :ref="ref"
            :color="['#F5F5F5', '#1E1E1E'].includes(`${color || item.color && item.color.dark}`) ? '' : `${color || item.color && item.color.dark}`"
            :width="width"
            :light="`${color || item.color && item.color.dark}` === '#F5F5F5'"
            class="align-center justify-center"
            rounded="lg"
            outlined
            :height="height"
          >
            <v-sheet :color="selected && selectable ? 'rgba(22, 150, 182, .7)' : 'transparent'" :height="height" :width="width" rounded="lg" class="d-flex justify-center align-center pa-2">
              <div :class="hideName ? '' : 'mr-4'">
                <img v-if="logo || item.icon && item.icon.dark" :src="$leechineo.files.getUrl(`${logo || item.icon && item.icon.dark}`)" alt="" width="70px">
              </div>
              <v-sheet v-if="!hideName" :style="`color: ${textColor(`${color || item.color && item.color.dark}`)};`" color="transparent" max-width="180px">
                <h1 class="text-h4 text-truncate">
                  {{ name || item.name }}
                </h1>
              </v-sheet>
              <v-expand-x-transition>
                <div v-show="selected">
                  <v-icon size="40" class="ml-4">
                    done
                  </v-icon>
                </div>
              </v-expand-x-transition>
            </v-sheet>
          </v-sheet>
          <leechineo-dialog v-model="dialogs.delete" :title="`Deseja deletar a marca ${item.name}?`">
            <template #actions>
              <v-btn
                rounded
                elevation="0"
                color="primary"
                class="ma-1"
                :disabled="loading"
                @click="dialogs.delete = false"
              >
                Cancelar
              </v-btn>
              <v-btn
                rounded
                elevation="0"
                color="cancel"
                class="ma-1"
                :loading="loading"
                @click="deleteBrand"
              >
                Deletar
              </v-btn>
            </template>
          </leechineo-dialog>
          <brand-editor v-model="dialogs.edit" :edit-brand="brand" />
        </div>
      </template>
      <span> {{ name || brand.name }} </span>
    </v-tooltip>
  </div>
</template>

<script>
import uniqid from 'uniqid'

export default {
  props: {
    color: {
      type: String,
      default: ''
    },
    width: {
      type: String,
      default: ''
    },
    height: {
      type: String,
      default: ''
    },
    logo: {
      type: String,
      default: ''
    },
    name: {
      type: String,
      default: ''
    },
    hideName: {
      type: Boolean,
      default: false
    },
    brand: {
      type: Object,
      default () {
        return {}
      }
    },
    brandId: {
      type: String,
      default: ''
    },
    editable: {
      type: Boolean,
      default: false
    },
    selectable: {
      type: Boolean,
      default: false
    },
    selected: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      loading: false,
      item: {},
      dialogs: {
        delete: false,
        edit: false
      }
    }
  },
  computed: {
    ref () {
      return uniqid('brand-', '-component')
    },
    textColor: () => (backgroundColor) => {
      if (!backgroundColor) {
        return ''
      }
      const hexToRgb = hex =>
        hex
          .replace(/^#?([a-f\d])([a-f\d])([a-f\d])$/i, (m, r, g, b) => `#${r}${r}${g}${g}${b}${b}`)
          .substring(1)
          .match(/.{2}/g)
          .map(x => parseInt(x, 16))
      const [r, g, b] = hexToRgb(backgroundColor)
      const brightness = (r * 299 + g * 587 + b * 114) / 1000
      return brightness > 128 ? '#212121' : '#FAFAFA'
    }
  },
  watch: {
    async brandId () {
      await this.setBrandById()
    },
    brand: {
      deep: true,
      handler () {
        this.item = this.brand
      }
    }
  },
  async mounted () {
    if (this.brandId) {
      await this.setBrandById()
    } else if (this.brand?.name) {
      this.item = this.brand
    }
  },
  methods: {
    async setBrandById () {
      this.item = await this.$leechineo.brands.get(this.brandId)
    },
    select () {
      this.$emit('selected', this.brand.id)
    },
    async deleteBrand () {
      this.loading = true
      try {
        await this.$leechineo.brands.delete(this.brand.id)
        this.dialogs.delete = false
      } catch (e) {
        this.$pushError('Falha ao deletar marca', e)
      }
      this.loading = false
    }
  }
}
</script>

<style>

</style>
