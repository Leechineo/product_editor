<template>
  <div class="pa-3">
    <div v-if="variants.title" class="mb-3">
      <span class="font-weight-bold">{{ variants.title }}</span>
    </div>
    <v-row dense>
      <v-col v-for="property, index in variants.properties" :key="property.id">
        <v-sheet min-width="200px" color="transparent">
          <v-select
            v-model="selectedOptions[property.id]"
            style="margin-bottom: -25px;"
            outlined
            dense
            :label="property.name"
            :items="items[index]"
            :disabled="index !== 0 && !selectedOptions[variants.properties[index - 1] ? variants.properties[index - 1].id : '']"
            item-text="name"
            @input="setOptionsSelectedRange(index)"
          />
        </v-sheet>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  props: {
    variants: {
      type: Object,
      default () {
        return {}
      }
    }
  },
  data () {
    return {
      selectedOptions: {}
    }
  },
  computed: {
    selectedOption () {
      if (Object.keys(this.selectedOptions).length !== this.variants.properties.length) {
        return ''
      } else {
        const optionSelected = this.variants.options.find((option) => {
          const nameThatMatches = []
          for (const propertyID in this.selectedOptions) {
            const name = option.names.find(item => item.id === propertyID)
            if (name && name.name === this.selectedOptions[propertyID]) {
              nameThatMatches.push(1)
            }
          }
          return nameThatMatches.length === this.variants.properties.length
        })
        return optionSelected.id
      }
    },
    items () {
      const properties = this.variants.properties
      const items = []
      for (const propertyIndex in properties) {
        const property = properties[propertyIndex]
        const selectedOptionsRange = this.getObjRange(this.selectedOptions, 0, propertyIndex)
        console.log(selectedOptionsRange)
        const filteredVariantsOptions = this.variants.options.filter((option) => {
          const notMatch = []
          for (const selectedOptionKey in selectedOptionsRange) {
            const name = option.names.find(item => item.id === selectedOptionKey)
            if (name.name !== selectedOptionsRange[selectedOptionKey]) {
              notMatch.push(1)
            }
          }
          return !notMatch.length
        })
        const names = filteredVariantsOptions.map(option => option.names).flat().filter(name => name.id === property.id)
        if (!names.find(name => name.name === this.selectedOptions[property.id])) {
          this.cleanOptionSelected(property.id)
        }
        items.push(names)
      }
      return items
    }
  },
  watch: {
    selectedOption () {
      this.$emit('input', this.selectedOption)
    },
    selectedOptions: {
      deep: true,
      handler (e) {
        console.log(e)
      }
    }
  },
  methods: {
    getObjRange (obj, startIndex, endIndex) {
      const keys = Object.keys(obj)
      const subKeys = keys.slice(startIndex, endIndex)
      const subObj = subKeys.reduce((result, key) => {
        result[key] = obj[key]
        return result
      }, {})
      return subObj
    },
    cleanOptionSelected (propertyID) {
      delete this.selectedOptions[propertyID]
    },
    setOptionsSelectedRange (endIndex) {
      const newOptionsSelected = this.getObjRange(this.selectedOptions, 0, endIndex + 1)
      this.selectedOptions = newOptionsSelected
    }
  }
}
</script>

<style scoped>
.v-text-field.v-text-field--enclosed .v-text-field__details {
  display: none !important;
}
</style>
