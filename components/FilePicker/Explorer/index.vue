<template>
  <div>
    <leechineo-card overflow-y padding="pa-0" height="60vh">
      <template #title>
        <div class="pa-3">
          <v-row dense align="center">
            <v-col cols="4" sm="2">
              <v-btn color="primary" rounded elevation="0" class="ma-1" @click="$emit('goToUpload')">
                <v-icon size="15" class="mr-2">
                  arrow_back_ios
                </v-icon>
                <v-icon>folder</v-icon>
              </v-btn>
            </v-col>
            <v-col cols="6" sm="8">
              <v-sheet v-if="items.length" class="d-flex" rounded style="overflow-x: auto;user-select: none;">
                <v-sheet
                  v-for="path, i in ['Início', ...currentPath]"
                  :key="i"
                  :outlined="currentPath[currentPath.length - 1] !== path"
                  class="px-3 py-1 mx-1"
                  rounded
                  :style="currentPath[currentPath.length - 1] !== path ? 'cursor: pointer;' : ''"
                  @click="pathBar(i)"
                >
                  /{{ path }}
                </v-sheet>
              </v-sheet>
            </v-col>
            <v-col cols="2" class="d-none d-sm-block">
              <div class="d-flex justify-end">
                <v-btn
                  class="ma-1"
                  rounded
                  elevation="0"
                  color="red darken-2"
                  @click="$emit('close')"
                >
                  <v-icon>close</v-icon>
                </v-btn>
              </div>
            </v-col>
          </v-row>
        </div>
      </template>
      <v-sheet v-if="items.length">
        <file-picker-explorer-item v-if="currentPath.length" :show-top-line="false" @goBack="currentPath.pop()" />
        <file-picker-explorer-item
          v-for="(item, i) in items"
          :key="i"
          :ref="item.type === 'file' ? 'file-picker-explorer-item-' + item.id : ''"
          :show-top-line="false"
          :show-bottom-line="i !== items.length - 1"
          :item="item"
          :selectable="multiple"
          :selected="selectedFiles.find(_item => _item.id === item.id) ? true : false"
          @goToPath="currentPath.push($event)"
          @fileSelected="fileSelected($event)"
          @unselectFile="unselectFile"
        />
      </v-sheet>
      <div v-else class="d-flex justify-center align-center flex-column mt-3">
        <div>
          <v-img src="/components/FilePicker/no_files.svg" max-width="200px" />
        </div>
        <h3 class="text-h5 mt-3">
          Sem arquivos
        </h3>
      </div>
      <template #actions>
        <v-btn
          color="primary"
          rounded
          elevation="0"
          class="ma-1"
          :disabled="selectedFiles.length < 1"
          @click="fileSelected()"
        >
          Concluir
        </v-btn>
      </template>
    </leechineo-card>
  </div>
</template>

<script>
export default {
  props: {
    currentSelectedFiles: {
      type: Array,
      default () {
        return []
      }
    },
    multiple: {
      type: Boolean,
      default: false
    },
    canBeDone: {
      type: Boolean,
      default: false
    },
    accept: {
      type: Array,
      default () {
        return []
      }
    }
  },
  data () {
    return {
      currentPath: [],
      selectedFiles: []
    }
  },
  computed: {
    items () {
      let filteredFiles = []
      if (this.accept.length) {
        filteredFiles = this.$store.state.files.items.filter(file => this.accept.includes(this.$store.getters['files/getMimeType'](file.path)))
      } else {
        filteredFiles = this.$store.state.files.items
      }
      const fragmentedItems = filteredFiles.map((item) => {
        const path = item.path.split('/')
        const currentPath = path.slice(0, this.currentPath.length)
        if (JSON.stringify(this.currentPath) === JSON.stringify(currentPath)) {
          return path[this.currentPath.length]
        } else {
          return undefined
        }
      }).filter(item => item)
      const items = Array.from(new Set(fragmentedItems)).map((item) => {
        const isFolder = !item.includes('.')
        let id
        if (!isFolder) {
          id = this.$store.state.files.items.find(file => file.path.includes(item)).id
        }
        return {
          name: item,
          id,
          type: isFolder ? 'folder' : 'file'
        }
      }).sort((a, b) => {
        if (a.type === 'folder' && b.type === 'file') {
          return -1
        }
        if (a.type === 'file' && b.type === 'folder') {
          return 1
        }
        return 0
      })
      return items
    }
  },
  watch: {
    currentSelectedFiles: {
      deep: true,
      handler () {
        this.selectedFiles = [...this.currentSelectedFiles]
      }
    }
  },
  mounted () {
    this.selectedFiles = [...this.currentSelectedFiles]
  },
  methods: {
    pathBar (index) {
      index--
      if (index < 0) {
        this.currentPath = []
      } else {
        this.currentPath = this.currentPath.slice(0, index + 1)
      }
    },
    fileSelected (item) {
      if (this.multiple) {
        if (!item) {
          this.$emit('selectedFile', Array.from(new Set(this.selectedFiles)))
          if (!this.currentSelectedFiles.length) {
            this.selectedFiles = []
          }
        } else {
          this.selectedFiles.push(item)
        }
      } else {
        this.$emit('selectedFile', item)
      }
    },
    unselectFile (item) {
      const currentItem = this.selectedFiles.find(_item => _item.id === item.id)
      const currentItemIndex = this.selectedFiles.indexOf(currentItem)
      this.selectedFiles.splice(currentItemIndex, 1)
    }
  }
}
</script>

<style>

</style>
