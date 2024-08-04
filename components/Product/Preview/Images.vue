<template>
  <leechineo-card padding="pa-0" color="transparent" style="overflow:hidden;">
    <v-window v-model="onboarding">
      <v-window-item v-for="(image, i) in images" :key="i">
        <v-img :src="$leechineo.files.getUrl(image)" width="100%" height="400px" />
      </v-window-item>
    </v-window>
    <v-row v-show="images.length > 1" class="mt-2">
      <v-item-group v-model="onboarding" mandatory class="d-flex flex-row">
        <v-slide-group show-arrows style="height:90px">
          <v-slide-item v-for="(image, i) in images" :key="i">
            <v-item v-slot="{ active, toggle }">
              <v-img
                transition="scale-transition"
                :src="$leechineo.files.getUrl(image)"
                :class="`rounded-lg mt-3 ${i === 0 ? `ml-5 mr-2` : `mx-2`} ${active ? 'active' : 'inactive'}`"
                @click="toggle"
              />
            </v-item>
          </v-slide-item>
        </v-slide-group>
      </v-item-group>
    </v-row>
  </leechineo-card>
</template>

<script>
export default {
  props: {
    images: {
      type: Array,
      default () {
        return []
      }
    }
  },
  data () {
    return {
      onboarding: 0
    }
  },
  methods: {
    next () {
      this.onboarding = this.onboarding + 1 === this.length
        ? 0
        : this.onboarding + 1
    },
    prev () {
      this.onboarding = this.onboarding - 1 < 0
        ? this.length - 1
        : this.onboarding - 1
    }
  }
}
</script>

<style scoped>
.active {
  width: 70px;
  height: 60px;
  animation: expand .150s normal;
  transition:  .150s linear all;
}
.inactive {
  width: 50px;
  height: 50px;
  animation: expand .5s reverse;
  transition:  .150s linear all;
}
@keyframes expand {
  from {
    width: 50px;
    height: 50px;
  }
  to {
    width: 70px;
    height: 60px;
  }
}
</style>
