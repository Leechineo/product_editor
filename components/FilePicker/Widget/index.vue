<template>
  <div :style="selectable ? 'cursor: pointer;' : ''" @click="select">
    <leechineo-card padding="pa-0" :color="selected && selectable ? 'primary' : ''">
      <v-sheet height="150px">
        <v-img v-if="typePreview === 'image'" :src="imageUrl" height="150px" />
        <v-sheet v-else class="d-flex justify-center align-center" height="150px">
          <v-icon color="primary" size="40px">
            {{ $store.getters['file/getIcon'](file.name) }}
          </v-icon>
        </v-sheet>
        <v-btn
          v-if="deletable"
          style="position: relative;top: -150px;"
          elevation="0"
          color="red darken-3"
          block
          @click="deleteThisOne"
        >
          <v-icon>delete</v-icon>
        </v-btn>
      </v-sheet>
      <v-divider />
      <v-tooltip bottom>
        <template #activator="{ on, attrs }">
          <v-sheet v-bind="attrs" class="px-1 py-3" color="d-flex justify-center" style="user-select:none;" v-on="on">
            <v-sheet class="text-truncate" max-width="130px">
              <span>{{ file.name }}</span>
            </v-sheet>
          </v-sheet>
        </template>
        <span>
          <div class="d-flex flex-column align-center">
            <span>{{ file.name }}</span>
          </div>
        </span>
      </v-tooltip>
    </leechineo-card>
  </div>
</template>

<script>
export default {
  props: {
    file: {
      required: true
    },
    selectable: {
      type: Boolean,
      default: false
    },
    deletable: {
      type: Boolean,
      default: false
    },
    value: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      selected: false,
      deleteDialog: false
    }
  },
  computed: {
    typePreview () {
      const previewCompatible = ['image/png', 'image/jpeg', 'image/svg+xml']
      let mimeType
      if (this.file instanceof File) {
        mimeType = this.file.type
      } else {
        mimeType = this.$store.getters['files/getMimeType'](this.file.name)
      }
      if (previewCompatible.includes(mimeType)) {
        return 'image'
      } else {
        return 'icon'
      }
    },
    imageUrl () {
      if (this.file instanceof File) {
        if (this.typePreview === 'image') {
          return URL.createObjectURL(this.file)
        } else {
          return null
        }
      } else if (this.typePreview === 'image') {
        return this.$leechineo.files.getUrl(this.file)
      } else {
        return null
      }
    }
  },
  watch: {
    selected () {
      this.$emit('input', this.selected)
      this.$emit('selectionChanged')
    }
  },
  methods: {
    select () {
      if (this.selectable) {
        this.selected = !this.selected
      }
    },
    setSelection (value) {
      this.selected = value
    },
    deleteThisOne () {
      this.selected = true
      this.$emit('delete')
    }
  }
}
</script>

<style>

</style>
