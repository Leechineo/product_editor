<template>
  <div>
    <v-menu
      v-show="$store.state.auth.loggedIn"
      bottom
      min-width="200px"
      rounded="lg"
      offset-y
    >
      <template #activator="{ on }">
        <v-btn
          v-show="$store.state.auth.loggedIn"
          icon
          large
          v-on="on"
        >
          <v-avatar
            color="primary"
            :size="size || '38'"
          >
            <span :class="`white--text font-weight-medium ${font ? `font-${font}` : ''}`">{{ initials }}</span>
          </v-avatar>
        </v-btn>
      </template>
      <leechineo-card padding="pa-0">
        <v-list-item-content class="justify-center">
          <div class="mx-auto text-center">
            <v-avatar
              color="primary"
              size="48"
              class="ml-3 mb-2"
            >
              <span class="white--text text-h6">{{ initials }}</span>
            </v-avatar>
            <h3>{{ user.name }} {{ user.surname }}</h3>
            <p class="text-caption mt-1">
              {{ user.email }}
            </p>
            <v-btn
              depressed
              rounded
              color="red"
              block
              text
              @click="logoutDialog = true"
            >
              Sair
            </v-btn>
          </div>
        </v-list-item-content>
      </leechineo-card>
    </v-menu>
    <v-menu
      v-show="!$store.state.auth.loggedIn"
      bottom
      min-width="200px"
      rounded
      :dark="$variables.isDarkMode"
      offset-y
    >
      <template #activator="{ on, attrs }">
        <v-btn
          v-show="!$store.state.auth.loggedIn"
          icon
          color="primary"
          large
          v-bind="attrs"
          v-on="on"
        >
          <v-icon :size="size || '38'">
            account_circle
          </v-icon>
        </v-btn>
      </template>
      <leechineo-card>
        <v-sheet class="d-flex flex-column">
          <v-btn text to="/login" rounded>
            Entrar
          </v-btn>
          <v-btn text to="/criar-conta" rounded class="mt-2">
            Criar conta
          </v-btn>
        </v-sheet>
      </leechineo-card>
    </v-menu>
    <leechineo-dialog v-model="logoutDialog" title="Deseja sair da sua conta?">
      <template #actions>
        <v-btn rounded elevation="0" color="primary" class="ma-1" @click="logoutDialog = false">
          Cancelar
        </v-btn>
        <v-btn rounded elevation="0" color="red darken-3" class="ma-1" @click="logout">
          Sair
        </v-btn>
      </template>
    </leechineo-dialog>
  </div>
</template>

<script>
export default {
  props: {
    user: {
      type: Object,
      required: true
    },
    font: {
      type: String,
      default: ''
    },
    size: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      logoutDialog: false
    }
  },
  computed: {
    initials () {
      const firstLetterName = this.user.name[0]
      const firstLetterSurname = this.user.surname[0]
      return firstLetterName + firstLetterSurname
    }
  },
  methods: {
    async logout () {
      this.logoutDialog = false
      this.$leechineo.loading()
      try {
        await this.$auth.logout()
        this.$router.push('/login')
      } catch (e) {
        this.$pushError('Falha ao sair', e)
      }
      this.$leechineo.loading()
    }
  }
}
</script>

<style>

</style>
