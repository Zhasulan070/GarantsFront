<template>
  <div>
    <v-app-bar
        elevation="1"
        color="white"
    >

    </v-app-bar>
    <v-container>
      <div class="title">
        Заявка №  {{id}}
      </div>
      <v-text-field
          v-model="klNumber"
          outlined
          label="Номер КЛ"
          dense
      ></v-text-field>
      <v-text-field
          v-model="orderType"
          outlined
          label="Тип заявки"
          dense
      ></v-text-field>
      <div class="title">
        Данные по клиенту
      </div>
      <div class="d-flex">
        <div class="block">
          <v-text-field
              v-model="company.bin"
              outlined
              label="БИН"
              dense
          ></v-text-field>
          <v-text-field
              v-model="company.name"
              outlined
              label="Наименование"
              dense
          ></v-text-field>
          <v-text-field
              v-model="company.segment"
              outlined
              label="Сегмент"
              dense
          ></v-text-field>
        </div>
        <div class="block" style="margin-left: 100px">
          <v-text-field
              v-model="order.summa"
              outlined
              label="Сумма"
              dense
          ></v-text-field>
          <v-text-field
              v-model="order.status"
              outlined
              label="Статус"
              dense
          ></v-text-field>
          <v-text-field
              v-model="order.valid_date"
              outlined
              label="Дата окончания"
              dense
          ></v-text-field>
        </div>
        <div class="block" style="margin-left: 100px">
          <v-text-field
              v-model="company.files"
              outlined
              label="Файлы"
              dense
          ></v-text-field>
          <v-btn color="green">Скачать</v-btn>
          <v-btn color="yellow" style="margin-left:8px">Добавить файлы</v-btn>
        </div>
      </div>
      <div class="title">
        Проверка основных параметров по КЛ
      </div>
      <div>
        <v-text-field
            v-model="basicKl.datetimeCheck"
            outlined
            label="Дата и Время проверки"
            dense
        ></v-text-field>
        <v-text-field
            v-model="basicKl.segment"
            outlined
            label="Сегмент"
            dense
        ></v-text-field>
        <v-text-field
            v-model="basicKl.filialCode"
            outlined
            label="Код Филиала"
            dense
        ></v-text-field>
        <v-text-field
            v-model="basicKl.freeBalance"
            outlined
            label="Свободный остаток"
            dense
        ></v-text-field>
        <v-text-field
            v-model="basicKl.availablePeriod"
            outlined
            label="Период доступности"
            dense
        ></v-text-field>
        <v-text-field
            v-model="basicKl.creditLineStatus"
            outlined
            label="Статус кредитной линий"
            dense
        ></v-text-field>
      </div>
      <div class="title">
        Мониторинговая таблица по ОУ
      </div>
      <div>
        sdasdas
      </div>
      <div class="title" >
        Дополнительные соглосования
      </div>
      <div>
        <v-select
            outlined
            dense
            v-model="form.checker"
            :items="checkers"
            item-text="name"
            item-value="id"
            label="Дополнительный Контроль"
        >
        </v-select>
        <v-checkbox
            v-model="checkboxCheker"
            label='Отправить на Доп контроль ?'
        >
        </v-checkbox>
      </div>
      <div class="title">
        <v-text-field
            dense
            outlined
            v-model="uin"
            label="Введите вашу ЮШКУ"
        >

        </v-text-field>
      </div>
      <div class="d-flex  justify-space-between">
        <v-btn
            color="green"
        >
          Согласовать
        </v-btn>
        <v-btn
            color=red
        >
          Отказать
        </v-btn>
      </div>
    </v-container>
  </div>

</template>

<script>
import axios from "axios";

export default {
  name: "OrderDetail",
  data() {
    return {
      // data from API
      form: {
        checker: ''
      },
      klNumber: '',
      orderType: '',
      checkers: [],
      company: {
        name: '',
        bin: '',
        segment: '',
        files: ''
      },
      order: {
        summa: '',
        status: '',
        valid_date: ''
      },
      basicKl: {
        datetimeCheck: '',
        segment: '',
        filialCode: '',
        freeBalance: '',
        availablePeriod: '',
        creditLineStatus: '',
      },

      // Complete
      uin: '',
      checkboxCheker: false
    }
  },
  mounted() {
    this.getCheckers()
  },
  computed:{
    id() {
      return this.$route.params.id
    }
  },

  methods: {
    getCheckers: function (){
      const headers = {"Content-Type": "application/json"};
      axios.get("http://localhost:5000/api/GetCheckers", {headers})
          .then(response => {
            this.checkers = response.data.result
          })
    }
  }
}
</script>

<style scoped>
.block {
  width: 350px;
}


.title {
  padding: 16px 0;
  font-size: 24px;
  font-weight: 600;
  font-family: 'Open Sans', sans-serif;
  border-bottom: 1px solid #dddddd;
  border-top: 1px solid #dddddd;
  margin: 16px 0;
}
</style>