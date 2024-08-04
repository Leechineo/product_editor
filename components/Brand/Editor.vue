<template>
  <v-dialog
    v-model="show"
    :max-width="maxWidth"
    scrollable
    content-class="rounded-lg"
    :persistent="loading"
  >
    <leechineo-card>
      <v-row dense>
        <v-col cols="6">
          <v-text-field
            v-model="brand.name"
            outlined
            dense
            :disabled="loading"
            label="Nome da marca"
            :error="!!brand.nameError"
            :messages="[ brand.nameError ]"
          />
        </v-col>
        <v-col cols="6">
          <v-text-field v-model="brand.website" outlined dense :disabled="loading" label="Website da marca" />
        </v-col>
      </v-row>
      <v-sheet class="d-flex justify-center">
        <div v-for="picker, i in brand.pickers" :key="i">
          <file-picker
            v-model="brand[picker.icon]"
            class="ma-1"
            width="400px"
            height="220px"
            :background="brand[picker.color]"
            svg
            path="brands/"
            :error="!!brand.fileError"
            :message="brand.fileError"
            :title="picker.filePickerName"
          >
            <template #content="{ selectFiles }">
              <brand-preview :dark="picker.color === 'backgroundColorDark'">
                <brand v-if="brand[picker.icon] || brand.name" :color="brand[picker.color]" :logo="brand[picker.icon]" width="300px" :name="brand.name" />
                <div v-else>
                  <v-img src="/resources/coffe.svg" width="90px" />
                </div>
                <div class="d-flex">
                  <v-btn
                    v-if="picker.sendLogoIcon === 'arrow_circle_left'"
                    :disabled="(brand.icon === brand.iconDark || !brand.iconDark) || loading"
                    icon
                    :dark="picker.color === 'backgroundColorDark'"
                    :light="picker.color === 'backgroundColor'"
                    @click="sendIcon(picker.icon)"
                  >
                    <v-icon>{{ picker.sendLogoIcon }}</v-icon>
                  </v-btn>
                  <v-btn icon :dark="picker.color === 'backgroundColorDark'" :light="picker.color === 'backgroundColor'" :disabled="loading" @click="selectFiles()">
                    <v-icon>change_circle</v-icon>
                  </v-btn>
                  <v-btn
                    v-if="picker.sendLogoIcon === 'arrow_circle_right'"
                    :disabled="(brand.icon === brand.iconDark || !brand.icon) || loading"
                    icon
                    :dark="picker.color === 'backgroundColorDark'"
                    :light="picker.color === 'backgroundColor'"
                    @click="sendIcon(picker.icon)"
                  >
                    <v-icon>{{ picker.sendLogoIcon }}</v-icon>
                  </v-btn>
                </div>
              </brand-preview>
            </template>
          </file-picker>
        </div>
      </v-sheet>
      <v-sheet class="d-flex justify-center">
        <v-sheet
          v-for="picker, i in brand.pickers"
          :key="i"
          width="400px"
          class="ma-1 pa-2 d-flex flex-column justify-center align-center"
          outlined
          rounded="lg"
        >
          <div>
            {{ picker.title }}
          </div>
          <v-sheet
            :color="brand[picker.color]"
            outlined
            rounded
            width="350px"
            height="30px"
            class="my-2 d-flex justify-center align-center"
          >
            <v-btn
              v-if="picker.color === 'backgroundColorDark'"
              :disabled="brand.backgroundColorDark === brand.backgroundColor || loading"
              icon
              :color="textColor(brand[picker.color])"
              @click="brand.backgroundColor = brand.backgroundColorDark"
            >
              <v-icon>{{ picker.sendLogoIcon }}</v-icon>
            </v-btn>
            <v-btn
              v-if="picker.color === 'backgroundColor'"
              icon
              small
              class="ml-2"
              elevation="0"
              :color="textColor(brand[picker.color])"
              @click="brand.showBackgroundColorPicker = !brand.showBackgroundColorPicker"
            >
              <v-icon>
                palette
              </v-icon>
            </v-btn>
            <span :style="`color: ${textColor(brand[picker.color])};`">
              {{ brand[picker.color] }}
            </span>
            <v-btn
              v-if="picker.color === 'backgroundColor'"
              :disabled="brand.backgroundColorDark === brand.backgroundColor || loading"
              icon
              :color="textColor(brand[picker.color])"
              @click="brand.backgroundColorDark = brand.backgroundColor"
            >
              <v-icon>{{ picker.sendLogoIcon }}</v-icon>
            </v-btn>
            <v-btn
              v-if="picker.color === 'backgroundColorDark'"
              icon
              small
              class="ml-2"
              elevation="0"
              :color="textColor(brand[picker.color])"
              @click="brand.showBackgroundColorPicker = !brand.showBackgroundColorPicker"
            >
              <v-icon>
                palette
              </v-icon>
            </v-btn>
          </v-sheet>
          <v-sheet>
            <v-expand-transition>
              <v-sheet v-show="brand.showBackgroundColorPicker">
                <v-color-picker v-model="brand[picker.color]" :disabled="loading" />
                <div class="d-flex justify-center">
                  <v-btn elevation="0" rounded color="primary" small @click="brand[picker.color] = defaultColors[picker.color]">
                    Restaurar cor padrão
                  </v-btn>
                </div>
              </v-sheet>
            </v-expand-transition>
          </v-sheet>
        </v-sheet>
      </v-sheet>
      <template #actions>
        <v-btn
          rounded
          elevation="0"
          color="red darken-3"
          class="ma-1"
          :disabled="loading"
          @click="show = false"
        >
          Fechar
        </v-btn>
        <v-btn
          rounded
          elevation="0"
          color="primary"
          class="ma-1"
          :loading="loading"
          @click="saveBrand"
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
      default: '840'
    },
    editBrand: {
      type: Object
    }
  },
  data () {
    return {
      loading: false,
      show: this.value,
      error: '',
      defaultColors: {
        backgroundColor: '#F5F5F5',
        backgroundColorDark: '#1E1E1E'
      },
      brand: {
        name: '',
        icon: '',
        iconDark: '',
        backgroundColor: '#F5F5F5',
        backgroundColorDark: '#1E1E1E',
        showBackgroundColorPicker: false,
        fileError: '',
        nameError: '',
        website: '',
        pickers: [
          {
            color: 'backgroundColor',
            title: 'Cor de fundo para o ícone do modo claro:',
            filePickerName: 'Ícone light',
            icon: 'icon',
            sendLogoIcon: 'arrow_circle_right'
          },
          {
            color: 'backgroundColorDark',
            title: 'Cor de fundo para o ícone do modo escuro:',
            filePickerName: 'Ícone dark',
            icon: 'iconDark',
            sendLogoIcon: 'arrow_circle_left'
          }
        ]
      }
    }
  },
  computed: {
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
    show () {
      this.$emit('input', this.show)
    },
    value () {
      this.show = this.value
    },
    brand: {
      deep: true,
      handler () {
        if (this.brand.name) {
          this.brand.nameError = ''
        }
        if (this.brand.icon || this.brand.iconDark) {
          this.brand.fileError = ''
        }
        if (this.brand.icon && !this.brand.iconDark) {
          this.brand.iconDark = this.brand.icon
        }
        if (this.brand.iconDark && !this.brand.icon) {
          this.brand.icon = this.brand.iconDark
        }
      }
    }
  },
  mounted () {
    if (this.editBrand) {
      this.brand = {
        name: this.editBrand.name,
        icon: this.editBrand.icon?.default || '',
        iconDark: this.editBrand.icon?.dark || '',
        backgroundColor: this.editBrand.color?.default || '',
        backgroundColorDark: this.editBrand.color?.dark || '',
        showBackgroundColorPicker: false,
        fileError: '',
        nameError: '',
        website: this.editBrand.brandWebsite,
        pickers: [
          {
            color: 'backgroundColor',
            title: 'Cor de fundo para o ícone do modo claro:',
            filePickerName: 'Ícone light',
            icon: 'icon',
            sendLogoIcon: 'arrow_circle_right'
          },
          {
            color: 'backgroundColorDark',
            title: 'Cor de fundo para o ícone do modo escuro:',
            filePickerName: 'Ícone dark',
            icon: 'iconDark',
            sendLogoIcon: 'arrow_circle_left'
          }
        ]
      }
    }
  },
  methods: {
    validate () {
      const errors = []
      if (!this.brand.name) {
        this.brand.nameError = 'Insira um nome'
        errors.push(1)
      }
      if (!this.brand.icon && !this.brand.iconDark) {
        this.brand.fileError = 'Selecione ao menos um ícone'
        errors.push(1)
      }
      return !errors.length
    },
    async saveBrand () {
      if (!this.validate()) {
        return
      }
      this.loading = true
      try {
        const brand = {
          name: this.brand.name,
          icon: {
            default: this.brand.icon,
            dark: this.brand.iconDark
          },
          color: {
            default: this.brand.backgroundColor,
            dark: this.brand.backgroundColorDark
          },
          brandWebsite: this.brand.website
        }
        if (this.editBrand) {
          await this.$leechineo.brands.update(this.editBrand.id, brand)
        } else {
          await this.$leechineo.brands.create(brand)
          this.brand = {
            name: '',
            icon: '',
            iconDark: '',
            backgroundColor: '#F5F5F5',
            backgroundColorDark: '#1E1E1E',
            showBackgroundColorPicker: false,
            fileError: '',
            nameError: '',
            website: '',
            pickers: [
              {
                color: 'backgroundColor',
                title: 'Cor de fundo para o ícone do modo claro:',
                filePickerName: 'Ícone light',
                icon: 'icon',
                sendLogoIcon: 'arrow_circle_right'
              },
              {
                color: 'backgroundColorDark',
                title: 'Cor de fundo para o ícone do modo escuro:',
                filePickerName: 'Ícone dark',
                icon: 'iconDark',
                sendLogoIcon: 'arrow_circle_left'
              }
            ]
          }
        }
        this.show = false
      } catch (e) {
        this.$pushError('Erro ao salvar a marca', e)
      }
      this.loading = false
    },
    sendIcon (from) {
      if (from === 'icon') {
        this.brand.iconDark = this.brand.icon
      } else {
        this.brand.icon = this.brand.iconDark
      }
    }
  }
}
</script>

<style>
</style>
