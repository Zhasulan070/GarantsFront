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
      <div class="d-flex justify-space-between">
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
        <div class="block">
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
          <v-btn color="green">Скачать</v-btn>
        </div>
      </div>
      <div class="title">
        Проверка основных параметров по КЛ
      </div>
      <div>
        <v-text-field
            v-model="basicKl"
            outlined
            label=""
            dense
        ></v-text-field>
        <v-text-field
            v-model="basicKl"
            outlined
            label=""
            dense
        ></v-text-field>
        <v-text-field
            v-model="basicKl"
            outlined
            label=""
            dense
        ></v-text-field>
        <v-text-field
            v-model="basicKl"
            outlined
            label=""
            dense
        ></v-text-field>
        <v-text-field
            v-model="basicKl"
            outlined
            label=""
            dense
        ></v-text-field>
        <v-text-field
            v-model="basicKl"
            outlined
            label=""
            dense
        ></v-text-field>
      </div>
      <div class="title">
        Мониторинговая таблица по ОУ
      </div>
      <div>
        sdasdas
      </div>
      <div class="title">
        <v-text-field
            dense
            outlined
            v-model="uin"
            label="Введите ваш ЮШКА"
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
export default {
  name: "Main",
  data() {
    return {
      // data from API
      klNumber: '',
      orderType: '',
      company: {
        name: '',
        bin: '',
        segment: ''
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
      uin: ''
    }
  },
  computed:{
    id() {
      return this.$route.params.id
    }
  }
}
</script>

<style scoped>
.block {
  width: 400px;
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