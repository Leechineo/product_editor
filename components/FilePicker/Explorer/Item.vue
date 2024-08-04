<template>
  <div style="user-select: none; cursor: pointer;" @click="goToLocation">
    <div class="my-2">
      <v-divider v-if="showTopLine" />
    </div>
    <v-sheet class="px-3">
      <v-sheet color="transparent">
        <v-sheet v-if="!item" class="d-flex justify-start align-center" color="transparent">
          <v-icon color="primary" size="50">
            mdi-folder-arrow-up
          </v-icon>
          <div class="ml-3">
            ...
          </div>
        </v-sheet>
        <v-sheet v-else-if="item.type === 'folder'" class="d-flex justify-start align-center mr-3" color="transparent">
          <v-icon color="primary" size="50">
            folder
          </v-icon>
          <div class="text-truncate text-subtitle-1 ml-3">
            {{ item.name }}
          </div>
        </v-sheet>
        <v-sheet v-else color="transparent d-flex mr-3 align-center">
          <v-expand-x-transition>
            <div v-show="selected">
              <v-icon color="primary" class="mr-3">
                done
              </v-icon>
            </div>
          </v-expand-x-transition>
          <div v-if="$store.getters['files/supportPreview'](item.name)">
            <v-img :src="$leechineo.files.getUrl(item)" height="50px" width="50px" class="rounded" />
          </div>
          <v-icon v-else color="primary" size="50">
            {{ $store.getters['file/getIcon'](item.name) }}
          </v-icon>
          <div class="text-truncate text-subtitle-1 ml-3">
            {{ item.name }}
          </div>
        </v-sheet>
      </v-sheet>
    </v-sheet>
    <div class="my-2">
      <v-divider v-if="showBottomLine" />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    item: {
      type: Object
    },
    selectable: {
      type: Boolean,
      default: false
    },
    selected: {
      type: Boolean,
      default: false
    },
    showTopLine: {
      type: Boolean,
      default: true
    },
    showBottomLine: {
      type: Boolean,
      default: true
    }
  },
  methods: {
    goToLocation () {
      if (!this.item) {
        return this.$emit('goBack')
      } else if (this.item.type === 'folder') {
        return this.$emit('goToPath', this.item.name)
      } else if (this.item.type === 'file') {
        if (this.selectable) {
          if (this.selected) {
            this.$emit('unselectFile', this.item)
          } else {
            this.$emit('fileSelected', this.item)
          }
        } else {
          this.$emit('fileSelected', this.item)
        }
      }
    }
  }
}
</script>

<style>
</style>
