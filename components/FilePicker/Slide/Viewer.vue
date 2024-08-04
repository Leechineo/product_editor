<template>
  <div>
    <leechineo-card padding="pa-0">
      <div class="d-flex align-center">
        <v-btn icon @click="back">
          <v-icon>chevron_left</v-icon>
        </v-btn>
        <v-window v-model="onboarding">
          <v-window-item v-for="file, i in files" :key="file.id">
            <file-picker-slide-item :file="file" :total="files.length" :current="i + 1" />
          </v-window-item>
        </v-window>
        <v-btn icon @click="next">
          <v-icon>chevron_right</v-icon>
        </v-btn>
      </div>
    </leechineo-card>
  </div>
</template>

<script>
export default {
  props: {
    files: {
      type: Array,
      required: true
    }
  },
  data () {
    return {
      onboarding: null
    }
  },
  methods: {
    back () {
      if (this.onboarding < 1) {
        this.onboarding = this.files.length - 1
      } else {
        this.onboarding--
      }
    },
    next () {
      if (this.onboarding >= this.files.length - 1) {
        this.onboarding = 0
      } else {
        this.onboarding++
      }
    }
  }
}
</script>

<style>

</style>
