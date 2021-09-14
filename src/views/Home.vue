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

    <v-main class="form">
      <v-container>
        <v-form>
          <v-text-field
              outlined
              dense
              v-model="email"
              label="E-mail"
          ></v-text-field>

          <v-text-field
              outlined
              dense
              v-model="password"
              label="Password"
          ></v-text-field>

          <v-btn
              class="mr-4"
              @click="CheckAutentication"
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
      email:'',
      password:''
    }
  },
  created() {
    console.log(1)
  },
  mounted() {
    console.log(2)
  },
  methods:{
    CheckAutentication(){
      if (this.email=="admin" && this.password=="admin")
        this.$router.push('/main')
    }
  }
}
</script>
<style>
.form{
  width: 600px;
  margin: 48px auto;
}
</style>
