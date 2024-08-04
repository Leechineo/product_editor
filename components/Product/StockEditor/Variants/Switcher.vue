<template>
  <div>
    <!-- <v-sheet :outlined="!clean" class="d-flex py-2" style="overflow:auto; user-select: none;">
      <v-sheet v-for="item, i in items" :key="i" :style="disabled ? '' : 'cursor: pointer;'" @click="goToPage(i)">
        <v-sheet :width="width" :color="value === i ? `primary ${disabled ? 'darken-2' : ''}` : `${disabled ? 'grey darken-3' : ''}`" class="mx-2 my-1 pa-1 text-truncate text-center" rounded="lg" outlined>
          <slot name="name" :item="item" :index="i">
            {{ item.name || `${type} ${(i + 1)}` }}
          </slot>
        </v-sheet>
      </v-sheet>
    </v-sheet> -->
    <v-item-group v-model="selected" mandatory class="d-flex">
      <v-slide-group show-arrows>
        <v-slide-item v-for="item, index in items" :key="index">
          <v-item v-slot="{ toggle }">
            <v-sheet
              :width="width"
              :color="color(index)"
              :style="`user-select: none; cursor:${disabled ? '' : 'pointer'};`"
              class="mx-2 my-1 pa-1 text-truncate text-center"
              rounded="lg"
              outlined
              @click="toggle"
            >
              <slot name="name" :item="item" :index="index">
                {{ item.name || `${type} ${(index + 1)}` }}
              </slot>
            </v-sheet>
          </v-item>
        </v-slide-item>
      </v-slide-group>
    </v-item-group>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: Number,
      default: 0
    },
    type: {
      type: String,
      default: 'Variante'
    },
    width: {
      type: String,
      default: '100px'
    },
    clean: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    items: {
      type: Array,
      default () {
        return []
      }
    }
  },
  data () {
    return {
      selected: this.value
    }
  },
  computed: {
  },
  watch: {
    selected () {
      if (this.disabled) {
        return
      }
      this.$emit('input', this.selected)
    }
  },
  methods: {
    goToPage (i) {
      if (this.disabled) {
        return
      }
      this.$emit('input', i)
    },
    color (index) {
      if (index === this.value) {
        return 'primary'
      }
      return ''
    }
  }
}
</script>

<style>

</style>
