<template>
  <div>
    <v-app-bar
        elevation="1"
        color="white"
    >
      <v-container>
        <v-btn>
          <router-link to="/create-order">
            Создать заявку
          </router-link>
        </v-btn>
      </v-container>
    </v-app-bar>

    <v-main>
      <v-container>
        <v-form>
          <v-text-field
              v-model="email"
              label="E-mail"
          ></v-text-field>

          <v-text-field
              v-model="password"
              label="Password"
          ></v-text-field>

          <v-btn
              class="mr-4"
              @click="submit"
          >
            submit
          </v-btn>

        </v-form>
      </v-container>

    </v-main>

  </div>
</template>

<script>

export default {
  name: 'Home',
  data(){
    return{
      bin: ''
    }
  },
  created() {
    console.log(1)
  },
  mounted() {
    console.log(2)
  },
  methods:{

  }
}
</script>
