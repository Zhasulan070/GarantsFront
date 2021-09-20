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
              @click="submit"
          >
            Войти
          </v-btn>

        </v-form>
      </v-container>

    </v-main>

  </div>
</template>

<script lang="ts">

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

  methods:{
    submit: function (){
      fetch("http://localhost:5000/api/Auth/login",{
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        credentials: 'include',
        body: JSON.stringify({
          username: this.username,
          password:this.password
        })
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
