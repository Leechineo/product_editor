<template>
  <div>
    <div v-if="images.length" style="position: absolute; z-index: 1;">
      <slot name="actionsWithImages">
        <v-sheet class="ma-1" rounded>
          <v-btn icon color="primary" @click="dialogs.editor = true">
            <v-icon>edit</v-icon>
          </v-btn>
        </v-sheet>
      </slot>
    </div>
    <leechineo-card padding="pa-0" style="overflow: hidden;">
      <div v-if="images.length" />
      <div v-else :class="flex ? 'd-flex justify-center align-center flex-' + flex : ''">
        <v-sheet :height="height" class="d-flex justify-center align-center">
          <div>
            <v-img :max-width="iconWidth" src="/resources/posting_photo.svg" />
          </div>
        </v-sheet>
        <slot name="actions" :show-editor-dialog="showEditorDialog">
          <v-btn
            v-if="dense"
            rounded
            elevation="0"
            color="primary"
            small
            class="mb-2"
            @click="dialogs.editor = true"
          >
            Selecionar fotos
          </v-btn>
          <v-sheet v-else height="100px" class="d-flex justify-center align-center">
            <v-btn rounded elevation="0" color="primary" @click="dialogs.editor = true">
              Selecionar fotos
            </v-btn>
          </v-sheet>
        </slot>
      </div>
      <v-window v-model="onboarding">
        <v-window-item v-for="(image, i) in images" :key="i">
          <v-img :src="$leechineo.files.getUrl(image)" :width="width" :height="height" class="d-flex align-center">
            <div v-if="false" class="d-flex justify-space-between px-2">
              <v-sheet class="rounded-circle d-flex justify-center align-center" width="30px" height="30px">
                <v-btn small icon @click="prev">
                  <v-icon>chevron_left</v-icon>
                </v-btn>
              </v-sheet>
              <div class="d-flex justify-space-between px-2">
                <v-sheet class="rounded-circle d-flex justify-center align-center" width="30px" height="30px">
                  <v-btn small icon @click="next">
                    <v-icon>chevron_right</v-icon>
                  </v-btn>
                </v-sheet>
              </div>
            </div>
          </v-img>
        </v-window-item>
      </v-window>
      <v-row v-show="images.length > 1" class="mt-2">
        <v-item-group v-model="onboarding" mandatory class="d-flex flex-row">
          <v-slide-group show-arrows style="height:100px">
            <v-slide-item v-for="(image, i) in images" :key="i">
              <v-item v-slot="{ active, toggle }">
                <v-img
                  transition="scale-transition"
                  :src="$leechineo.files.getUrl(image)"
                  :class="`rounded-lg my-3 ${i === 0 ? `ml-5 mr-2` : `mx-2`} ${active ? 'active' : 'inactive'}`"
                  @click="toggle"
                />
              </v-item>
            </v-slide-item>
          </v-slide-group>
        </v-item-group>
      </v-row>
      <product-image-selector-editor v-model="dialogs.editor" :images="items" :product-name="productName" @imagesSelected="setImages" />
    </leechineo-card>
  </div>
</template>

<script>
export default {
  props: {
    iconWidth: {
      type: String,
      default: '300px'
    },
    height: {
      type: String,
      default: '400px'
    },
    flex: {
      type: String,
      default: 'column'
    },
    dense: {
      type: Boolean,
      default: false
    },
    width: {
      type: String,
      default: '100%'
    },
    items: {
      type: Array,
      default () {
        return []
      }
    },
    productName: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      onboarding: 0,
      images: [],
      dialogs: {
        editor: false
      }
    }
  },
  watch: {
    items () {
      this.images = [...this.items]
    }
  },
  mounted () {
    if (this.items.length && !this.images.length) {
      this.images = [...this.items]
    }
  },
  methods: {
    showEditorDialog () {
      this.dialogs.editor = true
    },
    next () {
      this.onboarding = this.onboarding + 1 === this.length
        ? 0
        : this.onboarding + 1
    },
    prev () {
      this.onboarding = this.onboarding - 1 < 0
        ? this.length - 1
        : this.onboarding - 1
    },
    setImages (images) {
      this.images = images.map(image => image.id)
      this.$emit('changed', this.images)
    }
  }
}
</script>

<style scoped>
.active {
  width: 70px;
  height: 60px;
  animation: expand .150s normal;
  transition:  .150s linear all;
}
.inactive {
  width: 50px;
  height: 50px;
  animation: expand .5s reverse;
  transition:  .150s linear all;
}
@keyframes expand {
  from {
    width: 50px;
    height: 50px;
  }
  to {
    width: 70px;
    height: 60px;
  }
}
</style>
