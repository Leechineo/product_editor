<template>
  <div>
    <v-sheet
      v-if="typePreview === 'image'"
      class="ma-1"
      rounded="lg"
      max-width="200px"
      max-height="130px"
    >
      <v-img :src="imageUrl" class="rounded-lg" width="200px" height="125px">
        <div v-if="total && current" class="d-flex justify-end">
          <v-sheet class="pa-1 ma-1" outlined rounded="lg">
            {{ current }}/{{ total }}
          </v-sheet>
        </div>
      </v-img>
    </v-sheet>
    <v-sheet
      v-else
      class="ma-1"
      rounded="lg"
      max-width="200px"
      max-height="130px"
    >
      <v-sheet color="transparent" width="200px" height="125px" class="d-flex justify-center align-center flex-column" style="user-select: none;">
        <div v-if="total && current" style="position: absolute;">
          <div style="position: relative; left: 70px;bottom: 40px;" class="d-flex justify-end">
            <v-sheet class="pa-1 ma-1" outlined rounded="lg">
              {{ current }}/{{ total }}
            </v-sheet>
          </div>
        </div>
        <v-icon size="30px" color="primary">
          {{ $store.getters['file/getIcon'](file.name) }}
        </v-icon>
        <v-sheet max-width="180px">
          <v-tooltip bottom>
            <template #activator="{ on, attrs }">
              <div v-bind="attrs" class="text-truncate primary--text" v-on="on">
                {{ file.name }}
              </div>
            </template>
            <span>{{ file.name }}</span>
          </v-tooltip>
        </v-sheet>
      </v-sheet>
    </v-sheet>
  </div>
</template>

<script>
export default {
  props: {
    file: {
      required: true
    },
    total: {
      type: Number,
      default: 0
    },
    current: {
      type: Number,
      default: 0
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
  }
}
</script>

<style>

</style>
