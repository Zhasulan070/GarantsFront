<template>
  <div>
    <v-main>
      <v-container >
        <div class="form">

          <v-form>
            <v-text-field
                outlined
                dense
                v-model="bin"
                label="БИН"
            >
            </v-text-field>

            <v-text-field
                outlined
                dense
                v-model="name"
                label="Название компаний"
            >
            </v-text-field>

            <div class="kl_form">
              <v-select
                  outlined
                  dense
                  v-model="kl_type"
                  :items="klTypes"
                  label="КЛ"
              >
              </v-select>

              <v-text-field
                  outlined
                  dense
                  v-model="summa"
                  label="Сумма"
              >
              </v-text-field>

              <v-select
                  outlined
                  dense
                  v-model="currency"
                  :items="['тенге','доллар','евро']"
                  label="Валюта"

              >
              </v-select>
              <v-btn
                  outlined
                  dense
                  class="mr-4"
                  @click="pushKl"
                  color="#4fe612"
              >
                Добавить
              </v-btn>
              <div class="kl_form__content">
                <v-chip v-for="(kl, i) in klArray" :key="i">
                  {{  `${kl.kl_type}, ${kl.summa}, ${kl.currency} ` }}
                </v-chip>
              </div>
            </div>

            <v-text-field
                outlined
                dense
                v-model="beneficator"
                label="Бенефициар"
            >
            </v-text-field>

            <v-btn
                outlined
                dense
                class="mr-4"
                @click="submit"
                color="#4fe612"
            >
              Отправить
            </v-btn>

          </v-form>
        </div>

      </v-container>
    </v-main>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "CreateOrder",
  data(){
    return{
      klTypes: [],
      klArray: [],
      kl_type: '',
      summa: '',
      currency: '',
      bin: '',
      beneficator: '',
      name: '',
      result: {}
    }
  },
  methods: {
    pushKl: function (){
      this.klArray.push(
          {
            kl_type:this.kl_type,
            summa:this.summa,
            currency:this.currency
          }
      )
      this.kl_type=''
      this.summa=''
      this.currency=''
    },

    submit: function (){
      this.result = {
        bin: this.bin,
        name: this.name,
        kl_array: this.klArray,
        beneficator: this.beneficator
      }
      const headers = { "Content-Type": "application/json" };

      axios.get("https://api.npms.io/v2/search?q=vue", { headers })
          .then(response => {
            console.log(response)
          })
    }

  },
  watch: {
    bin(newVal){
      if (newVal.length === 12) {
        console.log('get')
        const headers = { "Content-Type": "application/json" };

        axios.get("https://api.npms.io/v2/search?q=vue", { headers })
            .then(response => {
              let data = response.data
              this.name = data.name
              const headers = { "Content-Type": "application/json" };

              axios.get("https://api.npms.io/v2/search?q=vue", { headers })
                  .then(response => {
                    this.klTypes = response.data.kls
                  })
            })

      }
    }
  }
}
</script>

<style scoped>
  .form{
    width: 400px;
    margin: 48px auto;
  }
  .kl_form{
    margin-bottom: 24px;
    border: 1px solid #dddddd;
    padding: 12px;

  }
  .kl_form__content {
    margin-top: 12px;
  }
</style>