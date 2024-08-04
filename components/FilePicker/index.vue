<template>
  <div>
    <slot :select-files="selectFiles" name="content">
      <leechineo-card
        :width="width"
        :height="height"
        display="flex"
        justify="center"
        align="center"
        padding="pa-0"
        style="overflow: hidden;"
      >
        <div class="d-flex align-center px-2 py-3 justify-center flex-column">
          <div v-if="files.length" class="mt-3 mt-md-0">
            <div v-if="files.length === 1" class="">
              <file-picker-widget :file="files[0]" :background="background" />
            </div>
            <div v-else>
              <file-picker-slide-viewer :files="files" :background="background" />
            </div>
          </div>
          <div v-else class="d-flex justify-center flex-column align-center">
            <v-img src="/components/FilePicker/add_files.svg" max-width="100px" />
            <strong>{{ title }}</strong>
          </div>
          <v-btn color="primary" rounded class="mt-3" @click="showDialog = true">
            <v-icon>edit_document</v-icon>
          </v-btn>
        </div>
      </leechineo-card>
    </slot>
    <file-picker-dialog
      v-model="showDialog"
      :accept="acceptFilesType"
      :multiple="multiple"
      :required="required"
      :path="path"
      :current-selected-files="selectedFiles.length ? selectedFiles : files"
      :convert-image="convertImage"
      :customizable-path="customizablePath"
      :pre-custom-path="customPath"
      @filesSelected="onFilesSelected"
    />
    <leechineo-message :show="!!message" :error="error" class="ml-1 mt-1">
      {{ message }}
    </leechineo-message>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: String,
      default: ''
    },
    multiple: {
      type: Boolean,
      default: false
    },
    svg: {
      type: Boolean,
      default: false
    },
    png: {
      type: Boolean,
      default: false
    },
    jpeg: {
      type: Boolean,
      default: false
    },
    pdf: {
      type: Boolean,
      default: false
    },
    required: {
      type: Boolean,
      default: false
    },
    accept: {
      type: String,
      default: ''
    },
    path: {
      type: String,
      default: ''
    },
    customizablePath: {
      type: Boolean,
      default: false
    },
    customPath: {
      type: String,
      default: ''
    },
    title: {
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
    background: {
      type: String,
      default: ''
    },
    message: {
      type: String,
      default: ''
    },
    error: {
      type: Boolean,
      default: true
    },
    convertImage: {
      type: Boolean,
      default: false
    },
    selectedFiles: {
      type: Array,
      default () {
        return []
      }
    }
  },
  data () {
    return {
      showDialog: false,
      files: []
    }
  },
  computed: {
    acceptFilesType () {
      let acceptionList = []
      if (this.svg) {
        acceptionList.push('image/svg+xml')
      }
      if (this.png) {
        acceptionList.push('image/png')
      }
      if (this.jpeg) {
        acceptionList.push('image/jpeg')
      }
      if (this.pdf) {
        acceptionList.push('application/pdf')
      }
      if (this.accept) {
        acceptionList = [...acceptionList, this.accept.split(',').map(item => item.trim())]
      }
      return acceptionList
    }
  },
  watch: {
    value () {
      if (!this.value) {
        this.files = []
      }
    }
  },
  methods: {
    selectFiles () {
      this.showDialog = true
    },
    onFilesSelected (files) {
      if (Array.isArray(files) && (files.length > 1 || this.multiple)) {
        this.files = files
        this.$emit('filesSelected', files)
      } else if (Array.isArray(files)) {
        this.files = files
        this.$emit('input', files[0].id)
      } else {
        this.files = [files]
        this.$emit('input', files.id)
      }
    }
  }
}
</script>

<style>

</style>
