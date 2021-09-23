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
              v-model="username"
              label="Юзернейм"
          ></v-text-field>

          <v-text-field
              outlined
              dense
              v-model="password"
              type="password"
              label="Пароль"
          ></v-text-field>

          <v-btn
              class="mr-4"
              @click="login"
          >
            Войти
          </v-btn>

        </v-form>
      </v-container>

    </v-main>

  </div>
</template>

<script lang="ts">
// import router from "../router";
import axios from "axios";
import {mapGetters} from "vuex";

export default {
  name: 'Home',
  data(){
    return{
      username:'',
      password:''
    }
  },

  mounted() {

  },
  computed: {
    ...mapGetters({
      userData: 'getUserData'
    })
  },
  methods:{
    async submit(){
      const params = {
        username: this.username,
        password:this.password
      }
      let {data} = await axios.post(
          "http://localhost:5000/api/Auth/loginByUserId", params,
          {withCredentials: true}
      )
      return data
    },
    login() {
      this.submit().then((data) => {
        if (data.statusCode > -1) {
          this.$store.commit('setUserData', data.result)
          setTimeout(()=> {
            this.$router.push('/orders')

          }, 2000)

        }
      })
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
