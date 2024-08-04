<template>
  <v-dialog
    v-model="show"
    :max-width="maxWidth"
    scrollable
    content-class="rounded-lg"
    :persistent="loading"
  >
    <v-window v-model="window">
      <file-picker-upload-done v-model="done" @exploreFiles="window = 1" @useFiles="useFilesUploadedRecently" />
      <file-picker-delete-dialog v-model="deleteDialog" :files="selectedFiles" @confirm="deleteFiles(true)" />
      <v-window-item>
        <leechineo-card overflow-y max-height="60vh">
          <input
            v-show="false"
            :id="inputID"
            type="file"
            :multiple="multiple"
            :accept="accept.join(', ')"
            @change="onFileChange"
          >
          <template v-if="!loading" #title>
            <div class="pa-3">
              <v-row dense>
                <v-col cols="4" class="d-none d-md-block">
                  <v-btn
                    class="ma-1"
                    rounded
                    elevation="0"
                    color="red darken-2"
                    @click="show = false"
                  >
                    <v-icon>close</v-icon>
                  </v-btn>
                </v-col>
                <v-col cols="6" md="4">
                  <div v-if="files.length > 1" class="d-flex justify-start justify-md-center">
                    <v-btn class="ma-1" rounded elevation="0" color="primary" @click="selectAll">
                      <v-icon>select_all</v-icon>
                    </v-btn>
                    <v-btn
                      class="ma-1"
                      rounded
                      elevation="0"
                      color="red darken-2"
                      :disabled="selectedFiles.length < 1"
                      @click="deleteFiles(false)"
                    >
                      Apagar
                    </v-btn>
                  </div>
                </v-col>
                <v-col cols="6" md="4">
                  <div class="d-flex justify-end">
                    <v-btn
                      v-if="storedFiles.length"
                      rounded
                      color="primary"
                      elevation="0"
                      class="ma-1"
                      @click="window = 1"
                    >
                      <v-icon>
                        cloud
                      </v-icon>
                      <v-icon size="15" class="ml-2">
                        arrow_forward_ios
                      </v-icon>
                    </v-btn>
                  </div>
                </v-col>
              </v-row>
            </div>
          </template>
          <v-sheet v-if="loading" class="d-flex flex-column align-center">
            <leechineo-loading />
            <h2 class="mt-2">
              Enviando arquivos...
            </h2>
          </v-sheet>
          <div v-else-if="!files.length" class="d-flex justify-center">
            <div>
              <v-img src="/components/FilePicker/upload_files.svg" max-width="200px" />
            </div>
          </div>
          <div v-else>
            <v-row dense justify="center">
              <v-col v-for="file, i in files" :key="i" cols="6" md="4">
                <file-picker-widget
                  :ref="file.id"
                  v-model="file.selected"
                  :file="file"
                  class="ma-1"
                  :selectable="files.length > 1"
                  :deletable="files.length < 2"
                  @selectionChanged="updateFilesSelected"
                  @delete="deleteFiles(false)"
                />
              </v-col>
            </v-row>
          </div>
          <leechineo-card v-if="customizablePath && !loading" class="mt-2">
            <div class="d-flex justify-center align-center">
              <div class="mr-2">
                {{ path }}
              </div>
              <v-text-field
                v-model="customPath"
                outlined
                dense
                style="margin-bottom: -25px;"
                label="Caminho customizado"
                :error="disableSendButton"
              />
            </div>
          </leechineo-card>
          <template v-if="!loading" #actions>
            <v-btn class="ma-1" rounded elevation="0" color="primary" @click="fileSelector">
              <v-icon>folder</v-icon>
            </v-btn>
            <v-btn
              v-if="files.length > 0"
              class="ma-1"
              rounded
              elevation="0"
              color="primary"
              :disabled="disableSendButton"
              @click="upload"
            >
              Enviar
            </v-btn>
            <v-btn
              class="ma-1"
              rounded
              elevation="0"
              color="red darken-2 d-md-none"
              @click="show = false"
            >
              Cancelar
            </v-btn>
          </template>
        </leechineo-card>
      </v-window-item>
      <v-window-item>
        <file-picker-explorer
          :multiple="multiple"
          :can-be-done="selectedFiles.length > 0"
          :accept="accept"
          :current-selected-files="currentSelectedFiles"
          @goToUpload="window = 0"
          @close="show = false"
          @selectedFile="selectedFile"
        />
      </v-window-item>
    </v-window>
  </v-dialog>
</template>

<script>
import uniqid from 'uniqid'

export default {
  props: {
    value: {
      type: Boolean,
      default: false
    },
    maxWidth: {
      type: String,
      default: '600'
    },
    multiple: {
      type: Boolean,
      default: false
    },
    accept: {
      type: Array,
      default () {
        return []
      }
    },
    convertImage: {
      type: Boolean,
      default: false
    },
    currentSelectedFiles: {
      type: Array,
      default () {
        return []
      }
    },
    customizablePath: {
      type: Boolean,
      default: false
    },
    preCustomPath: {
      type: String,
      default: ''
    },
    path: {
      type: String,
      default: ''
    },
    required: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      loading: false,
      window: 1,
      show: this.value,
      customPath: '',
      error: '',
      deleteDialog: false,
      files: [],
      selectedFiles: [],
      done: false,
      storedFiles: [],
      uploadedFiles: []
    }
  },
  computed: {
    inputID () {
      return 'input-file-picker-' + uniqid()
    },
    disableSendButton () {
      return /\/{2}/.test(this.customPath + '/')
    }
  },
  watch: {
    show () {
      this.$emit('input', this.show)
    },
    value () {
      this.show = this.value
    },
    preCustomPath () {
      this.customPath = this.preCustomPath
    }
  },
  async mounted () {
    await this.$leechineo.files.get()
    this.storedFiles = this.$store.state.files.items
    this.customPath = this.preCustomPath
  },
  methods: {
    useFilesUploadedRecently () {
      const files = this.uploadedFiles.map(file => ({
        name: file.path.split('/')[file.path.split('/').length - 1],
        type: 'file',
        id: file.id
      }))
      this.selectedFile(files)
    },
    async upload () {
      this.loading = true
      try {
        const uploadedFiles = []
        let path = this.path
        if (this.customizablePath) {
          path = this.path + this.customPath + '/'
        }
        for (const file of this.files) {
          const uploadedFile = await this.$leechineo.files.upload(file, `${path}${file.name}`, { convertImage: this.convertImage })
          uploadedFiles.push(uploadedFile)
        }
        this.uploadedFiles = uploadedFiles
        this.done = true
        this.files = []
      } catch (e) {
        this.$pushError('Falha ao fazer upload', e)
      }
      this.loading = false
    },
    selectedFile (item) {
      this.$emit('filesSelected', item)
      this.show = false
    },
    setSelection (value = false) {
      for (const index in this.files) {
        if (this.$refs[this.files[index].id]) {
          this.$refs[this.files[index].id][0].setSelection(value)
        }
      }
    },
    updateFilesSelected () {
      this.selectedFiles = this.files.filter(file => file.selected)
    },
    deleteFiles (confirm) {
      this.updateFilesSelected()
      if (confirm) {
        this.setSelection(false)
        this.selectedFiles.forEach(fileSelected => this.files.splice(this.files.indexOf(fileSelected), 1))
      } else {
        this.deleteDialog = true
      }
    },
    selectAll () {
      const isAllSelected = this.files.map(file => file.selected).every(selected => selected === true)
      if (isAllSelected) {
        for (const index in this.files) {
          this.$refs[this.files[index].id][0].setSelection(false)
        }
      } else {
        for (const index in this.files) {
          this.$refs[this.files[index].id][0].setSelection(true)
        }
      }
    },
    fileSelector () {
      document.querySelector(`#${this.inputID}`).click()
    },
    onFileChange (e) {
      function theFileExists (newFile, currentFiles) {
        let fileExists = false
        for (const file of currentFiles) {
          if (file.name === newFile.name && file.lastModified === newFile.lastModified && file.size === newFile.size) {
            fileExists = true
          } else {
            continue
          }
        }
        return fileExists
      }
      for (const file of e.target.files) {
        if (theFileExists(file, this.files)) {
          continue
        }
        file.id = `${uniqid().toUpperCase()}-${file.lastModified}`
        file.selected = false
        if (!this.multiple) {
          this.files = [file]
        } else {
          this.files.push(file)
        }
      }
      e.target.value = ''
      this.setSelection(false)
      this.done = false
      this.selectedFiles = []
    }
  }
}
</script>

<style>
</style>
