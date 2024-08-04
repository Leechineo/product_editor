<template>
  <v-dialog
    v-model="show"
    :max-width="maxWidth"
    scrollable
    content-class="rounded-lg"
    :persistent="loading"
  >
    <leechineo-card>
      <div>
        <v-window v-model="selected">
          <v-window-item v-for="window in windows.pages" :key="window.window">
            <v-sheet v-if="window.window !== 0" style="user-select: none;" outlined class="d-flex justify-space-between align-center px-5 rounded-lg mb-3 mt-3" height="80px">
              <div>
                <v-btn icon color="primary" @click="goBack(true)">
                  <v-icon>format_list_bulleted</v-icon>
                </v-btn>
                <v-btn color="primary" icon @click="goBack()">
                  <v-icon>arrow_back_ios</v-icon>
                </v-btn>
              </div>
              <span class="text-h6 font-weight-bold text-truncate">{{ window.name }}</span>
            </v-sheet>
            <v-sheet v-else outlined class="d-flex justify-center align-center px-5 rounded-lg mb-3 mt-3" style="user-select: none;" height="80px">
              <span class="text-h6 font-weight-bold text-truncate">Categorias</span>
            </v-sheet>
            <leechineo-card v-if="$store.state.categories.items.length" rounded="lg" padding="pa-0">
              <div v-for="category, i in selectedCategorySubcategories" :key="category.id">
                <div v-if="category.subcategories.length" :style="`${i !== selectedCategorySubcategories.length - 1 ? $variables.isDarkMode ? 'border-bottom: thin solid rgba(255, 255, 255, 0.12);' : 'border-bottom: thin solid rgba(0, 0, 0, 0.12);' : ''} cursor: pointer; user-select: none;`" class="d-flex justify-space-between align-center py-3 px-3" @click="goToCategory(category.window)">
                  <span>{{ category.name }}</span>
                  <v-icon>
                    chevron_right
                  </v-icon>
                </div>
                <div v-else :style="`${i !== selectedCategorySubcategories.length - 1 ? $variables.isDarkMode ? 'border-bottom: thin solid rgba(255, 255, 255, 0.12);' : 'border-bottom: thin solid rgba(0, 0, 0, 0.12);' : ''} cursor: pointer; user-select: none;`" class="d-flex justify-space-between align-center py-3 px-3" @click="select(category)">
                  <span>{{ category.name }}</span>
                  <v-icon color="primary">
                    done
                  </v-icon>
                </div>
              </div>
            </leechineo-card>
            <v-sheet v-else class="d-flex justify-center align-center my-4 pa-2">
              <div>
                <v-img src="/resources/list.svg" max-width="200px" />
              </div>
              <div class="text-h4">
                Sem categorias
              </div>
            </v-sheet>
            <v-btn
              v-if="window.window !== 0"
              block
              small
              rounded
              color="primary"
              class="mt-3 white--text"
              elevation="0"
              @click="select(window)"
            >
              Selecionar {{ window.name }}
            </v-btn>
            <v-btn small rounded block color="red darken-2 mt-2" @click="show = false">
              Cancelar
            </v-btn>
          </v-window-item>
        </v-window>
      </div>
    </leechineo-card>
  </v-dialog>
</template>

<script>
export default {
  props: {
    value: {
      type: Boolean,
      default: false
    },
    maxWidth: {
      type: String,
      default: '500'
    }
  },
  data () {
    return {
      loading: false,
      show: this.value,
      error: '',
      selected: 0,
      categories: this.$store.state.categories.items,
      history: [0]
    }
  },
  // eslint-disable-next-line require-await
  async fetch () {
    // this.categories = await this.$leechineo.categories.get() //TODO category
    this.findSelectedCategoryPage()
  },
  computed: {
    selectedCategorySubcategories () {
      if (this.selected === 0) {
        return this.windows.pages.filter(e => e.id?.split('-')[0] === 'CATEGORY')
      }
      if (this.windows.pages) {
        const foundCategory = this.windows.pages.find(e => e.window === this.selected)
        return foundCategory?.subcategories?.map(subcategory => ({
          window: this.windows.pages.find(e => e.id === subcategory.id)?.window,
          ...subcategory
        })) || []
      }
      return []
    },
    windows () {
      const windows = this.windowsQuantityCalculator(this.categories)
      return windows
    }
  },
  watch: {
    show () {
      this.$emit('input', this.show)
    },
    value () {
      this.show = this.value
    }
  },
  methods: {
    findSelectedCategoryPage () {
      const selectedCategory = this.windows.pages.find(category => category.id === this.$route.query.category)
      if (selectedCategory && selectedCategory.window !== 0) {
        this.selected = selectedCategory.window
      } else {
        const subCategoryFather = this.windows.pages.find((category) => {
          const subCategoryChild = category.subcategories?.find(subcategory => subcategory.id === this.$route.query.category)
          if (subCategoryChild) {
            return true
          } else {
            return false
          }
        })
        if (subCategoryFather) {
          this.selected = subCategoryFather.window
        }
      }
    },
    select (category) {
      this.$emit('selected', category.id)
      this.show = false
    },
    goToCategory (categoryPage) {
      this.selected = categoryPage
      this.history.push(categoryPage)
    },
    goBack (begin = false) {
      if (begin) {
        this.history = []
        this.selected = 0
      } else {
        this.history.pop()
        if (this.history.length < 1) {
          this.selected = 0
        }
        this.selected = this.history[this.history.length - 1]
      }
    },
    windowsQuantityCalculator (categories = [], initialQuantity = 0, initialWindows = [{ window: 0, name: 'all' }]) {
      let windows = initialQuantity
      const pages = initialWindows
      for (const category of categories) {
        if (category.subcategories?.length) {
          const result = this.windowsQuantityCalculator(category.subcategories, windows, pages)
          windows = result.quantity + 1
          pages.push({ window: windows, ...category })
        }
      }
      return {
        quantity: windows, pages
      }
    }
  }
}
</script>

<style>
</style>
