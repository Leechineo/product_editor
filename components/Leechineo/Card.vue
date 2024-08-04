<template>
  <v-sheet
    outlined
    :class="alignment"
    :color="color"
    rounded="lg"
    :max-width="maxWidth"
    :width="width"
  >
    <v-sheet color="transparent">
      <slot name="title">
        <h5 v-if="title" class="text-h5 ma-3 text-truncate">
          {{ title }}
        </h5>
      </slot>
      <v-divider v-if="$slots.title || title" />
      <v-sheet :color="color" :max-height="maxHeight" :height="height" :class="`${padding}` + `${title ? ' rounded-b-lg' : ' rounded-lg'}`" :style="`overflow-y: ${overflowY ? 'auto' : 'hidden'};overflow-x: ${overflowX ? 'auto' : 'hidden'};`">
        <v-sheet v-if="loading" class="d-flex justify-center" color="transparent">
          <leechineo-loading v-if="loading" />
        </v-sheet>
        <v-sheet v-else :class="alignment" :color="color">
          <slot />
        </v-sheet>
      </v-sheet>
    </v-sheet>
    <div>
      <div v-if="$slots.pagination" class="mx-3 mb-5">
        <slot name="pagination" />
      </div>
      <div v-if="$slots.actions">
        <v-divider v-if="$slots.default" />
        <div class="d-flex justify-end mt-3 mb-3 mr-3 flex-wrap">
          <slot name="actions" />
        </div>
      </div>
    </div>
  </v-sheet>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: ''
    },
    loading: {
      type: Boolean,
      default: false
    },
    maxWidth: {
      type: String,
      default: ''
    },
    maxHeight: {
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
    display: {
      type: String,
      default: ''
    },
    flexDirection: {
      type: String,
      default: ''
    },
    justify: {
      type: String,
      default: ''
    },
    align: {
      type: String,
      default: ''
    },
    padding: {
      type: String,
      default: 'py-4 px-3'
    },
    color: {
      type: String,
      default: 'd-flex flex-column justify-space-between'
    },
    overflowX: {
      type: Boolean,
      default: false
    },
    overflowY: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    alignment () {
      const value = []
      if (this.display) {
        value.push('d-' + this.display)
      }
      if (this.flexDirection) {
        value.push('flex-' + this.flexDirection)
      }
      if (this.justify) {
        value.push('justify-' + this.justify)
      }
      if (this.align) {
        value.push('align-' + this.align)
      }
      return value.join(' ')
    }
  }
}
</script>

<style>

</style>
