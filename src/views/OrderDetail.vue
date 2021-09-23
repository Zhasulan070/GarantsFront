<template>
  <div>
    <v-app-bar
        color="teal lighten-3"
        hide-on-scroll
    >
      <div v-if="this.id == 11784">
        <div style="float: right">
          <b-btn-toolbar >
            <b-button href="/orders" variant="outline-light"  style="margin: 2px 2px">Мои заявки</b-button>
            <b-button href="/orders-history" variant="outline-light" style="margin: 2px 2px">История заявок</b-button>
          </b-btn-toolbar>
        </div>
      </div>


    </v-app-bar>
    <v-container v-if="this.user['positionId'] === 13">
      <div class="title">
        Заявка №  {{id}}
      </div>
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
              readonly
          ></v-text-field>
          <v-text-field
              v-model="company.name"
              outlined
              label="Наименование"
              dense
              readonly
          ></v-text-field>
        </div>
        <div class="block" style="margin-left: 100px">
          <v-text-field
              v-model="company.segment"
              outlined
              label="Сегмент"
              dense
              readonly
          ></v-text-field>
          <v-text-field
              v-model="order.status"
              outlined
              label="Статус"
              dense
              readonly
          ></v-text-field>
        </div>
      </div>
      <div class="title">
        Данные по запрашиваемой КЛ
      </div>
      <div>
        <v-data-table
            :headers="klCols"
            :items="this.klColsArray"
            no-results-text="Нет данных"
        >
          <template slot="no-data">
            Нет данных
          </template>
          <template v-slot:item.action="{ item }">
            <v-icon
                small
                @click="deleteItem(item)"
            >
              mdi-delete
            </v-icon>
          </template>
        </v-data-table>
      </div>
      <div class="title">
        Заявление и документация для выпуска БГ
      </div>
      <div>
        <v-file-input
            v-model="files"
            counter
            label="Добавить Файлы"
            multiple
            outlined
            :show-size="1000"
        >
          <template v-slot:selection="{ index, text }">
            <v-chip
                v-if="index < 2"
                label
                small
            >
              {{ text }}
            </v-chip>

            <span
                v-else-if="index === 2"
                class="text-overline grey--text text--darken-3 mx-2"
            >
        +{{ files.length - 2 }} Файл(ы)
      </span>
          </template>
        </v-file-input>
      </div>
      <div class="title">
        Проверка основных параметров по КЛ с АБИС
      </div>
      <div>
        <v-data-table
            :headers="cols"
            :items="showKLList"
            no-results-text="Нет данных"
        >
          <template slot="no-data">
            Нет данных
          </template>
        </v-data-table>
      </div>
      <div class="title">
        Мониторинговая таблица по ОУ
      </div>
      <div>
        sdasdas
      </div>
      <div class="title" >
        Выбор типа БГ
      </div>
      <div>
        <v-select
            outlined
            dense
            v-model="form.checker"
            :items="checkers"
            item-text="name"
            item-value="id"
            label="Тип гарантии"
        >
        </v-select>
        <v-checkbox
            v-model="checkboxCheker"
            value=false
            label='Отправить на согласование в валютный контроль'
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
            @click= "approve"
        >
          Согласовать
        </v-btn>
        <v-btn
            color=red
            @click="decline"
        >
          Отказать
        </v-btn>
      </div>
    </v-container>
<!--    <v-container v-if="user.role === 'asdasd'"></v-container>-->
  </div>

</template>

<script>
import axios from "axios";
import {mapGetters} from "vuex";

export default {
  name: "OrderDetail",
  data() {
    return {
      // data from API
      klarray:[],
      user: {},
      klColsArray:[],
      klCols:[
        {
          text: 'КЛ',
          value: 'kl_type',
          sortable: false
        },
        {
          text: 'Сумма',
          value: 'summa',
          sortable: false
        },
        {
          text: 'Валюта',
          value: 'currencyName',
          sortable: false
        },
        {
          text: 'Срок(месяцев)',
          value: 'validDate',
          sortable: false
        },
        {
          text: 'Действие',
          value: 'action',
          sortable: false,
        },
      ],
      cols: [
        {
          text: 'КЛ',
          value: 'nameKl',
          sortable: false
        },
        {
          text: 'Дата и Время проверки',
          value: 'rqTm',
          sortable: false
        },
        {
          text: 'Код филиала',
          value: 'filialId',
          sortable: false
        },
        {
          text: 'Свободный остаток',
          value: 'amount',
          sortable: false
        },
        {
          text: 'Период доступности',
          value: 'availablePeriod',
          sortable: false
        },
        {
          text: 'Статус кредитной линий',
          value: 'repStatus',
          sortable: false
        },
      ],
      form: {
        checkerId: '',
        checker: ''
      },
      filesArray: [],
      orderType: '',
      orderTypeId:'',
      checkers: [],
      files:[],
      company: {
        name: '',
        bin: '',
        segment: '',
        segmentId: '',
        files: ''
      },
      order: {
        klNumber: '',
        summa: '',
        status: '',
        statusId: '',
        valid_date: '',
        currencyId:''
      },
      // Complete
      uin: '',
      request:'',
      changedFiles:new FormData(),
      checkboxCheker: false
    }
  },

  created() {
    this.user = JSON.parse(JSON.stringify(this.userData))
  },

  async mounted() {
    this.getCheckers()
    await this.getKompanyInfo()
    await this.getAbis()
  },
  computed:{
    id() {
      return this.$route.params.id
    },
    showKLList() {
      return this.klarray.map(
          (items, index) => ({
            ...items,
            index: index + 1
          }))
    },
    ...mapGetters({
      userData: 'getUserData'
    }),
  },

  methods: {
    getCheckers: function (){
      const headers = {"Content-Type": "application/json"};
      axios.get("http://localhost:5000/api/GetCheckers", {headers})
          .then(response => {
            this.checkers = response.data.result
          })
    },

    fileChange(fileList) {
      for (let i = 0; i < fileList.length; i++) {
        this.changedFiles.append("file", fileList[i], this.id + "order" + fileList[i].name);
      }
    },

    saveFiles(){
      axios.post( 'http://localhost:5000/api/SaveFile', this.changedFiles,
          {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          }
      ).then(response => {
            this.filesArray = response.data.result
          }
      );
    },

    deleteItem(item){
      const index = this.klColsArray.findIndex(i => i.id === item.id)
      this.klColsArray.splice(index, 1)
    },

    approve: function() {
      this.fileChange(this.files)
      this.saveFiles()

      this.result = JSON.stringify({
        orderId: this.id,
        bin: this.company.bin,
        companyName: this.company.name,

      })
    },

    decline: function() {

    },

    async getKompanyInfo(){
      const headers = {"Content-Type": "application/json"};
      await axios.get(
          `http://localhost:5000/api/Order/GetOrderByUserIdAndOrderId?userId=${this.user.id}&orderId=${this.id}`,
          {headers}).then(response => {
            console.log(response.data.result)
            this.klNumber = response.data.result['loanNumber']
            this.currencyId = response.data.result['currencyId']
            this.orderType = response.data.result['requestName']
            this.orderTypeId = response.data.result['typeId']
            this.company.bin = response.data.result['bin']
            this.company.name = response.data.result['name']
            this.company.segment = response.data.result['segmentName']
            this.company.segmentId = response.data.result['segmentId']
            this.order.summa = response.data.result['summ']
            this.order.status = response.data.result['statusName']
            this.order.statusId = response.data.result['statusId']
            this.order.valid_date = response.data.result['month']
            this.klColsArray = response.data.result.kl_array
          })
    },

    async getAbis(){
      const headers = {"Content-Type": "application/json"};
      await axios.get("https://localhost:5001/api/GetCompanyKl/ByBin?bin="+this.company.bin, {headers})
          .then(response => {
            this.klarray = response.data.result
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