<template>
  <div>
    <v-autocomplete
      v-model="selected"
      outlined
      dense
      :label="label"
      hide-no-data
      :search-input.sync="searchString"
      :items="suggestions"
      :error="error"
    />
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: String,
      default: ''
    },
    label: {
      type: String,
      default: ''
    },
    error: {
      type: Boolean,
      default: false
    },
    variants: {
      type: Array,
      default () {
        return []
      }
    },
    name: {
      type: Object,
      default () {
        return {}
      }
    }
  },
  data () {
    return {
      searchString: '',
      selected: ''
    }
  },
  computed: {
    suggestions () {
      const names = this.variants.map(variant => variant.names).flatMap(item => item).filter(item => item.id === this.name.id)
      const suggestions = names.map(name => name.name).filter(name => name)
      return suggestions
    }
  },
  watch: {
    searchString () {
      this.$emit('input', this.searchString)
      this.selected = this.searchString
    }
  },
  mounted () {
    this.selected = this.value
  }
}
</script>

<style>

</style>
