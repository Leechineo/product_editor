<template>
  <div>
    <div v-if="variants.type === 'unique'" class="mx-3">
      <div v-if="variants.title && variants.option && variants.option.name">
        <v-sheet outlined rounded="lg" class="pa-2">
          {{ variants.title }}: <span class="font-weight-bold">{{ variants.option.name }}</span>
        </v-sheet>
      </div>
    </div>
    <div v-else-if="variants.type === 'simple'" class="px-3">
      <span class="font-weight-bold">
        {{ variants.title }}
      </span>
      <v-select
        v-model="variantSelected"
        class="mt-3"
        outlined
        dense
        :items="variants.options"
        item-text="name"
        item-value="id"
      />
    </div>
    <div v-else>
      <product-preview-variants-compound v-model="variantSelected" :variants="variants" />
    </div>
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
      variantSelected: '',
      showVariant: false
    }
  },
  watch: {
    variantSelected () {
      this.$emit('input', this.variantSelected)
    }
  },
  mounted () {
    if (this.variants.type === 'unique') {
      this.variantSelected = this.variants.option.id
    } else if (this.variants.type === 'simple') {
      this.variantSelected = this.variants?.options[0]?.id
    }
  }
}
</script>

<style>

</style>
