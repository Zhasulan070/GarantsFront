<template>
  <div>
    <v-app-bar
        color="teal lighten-3"
        hide-on-scroll
    >

    </v-app-bar>
    <v-data-table class="form"
                  :headers="cols"
                  :items="showOrderList"
                  no-results-text="Нет данных"
    >
      <template v-slot:item.action="{item}">

        <router-link :to="`/order-detail/${item.id}`" tag="div" :disabled="item.status === 'your_status'">
          <v-btn small :disabled="item.status === 'your_status'">
            {{ item.status === 'your_status' ? 'В работе' : 'Подолбнее' }}
          </v-btn>
        </router-link>

      </template>
      <template slot="no-data">
        Нет данных
      </template>
    </v-data-table>
  </div>
</template>

<script>
import axios from "axios";
import {mapGetters} from "vuex";

export default {
  name: "OrderList",
  data() {
    return {
      array: [],
      user: {},
      cols: [
        {
          text: '#',
          value: 'id',
          sortable: false
        },
        {
          text: 'Имя',
          value: 'companyName',
          sortable: false
        },
        {
          text: 'Бин',
          value: 'bin',
          sortable: false
        },
        {
          text: 'Статус',
          value: 'status',
          sortable: false
        },
        {
          text: 'Юшка',
          value: 'kmEmail',
          sortable: false
        },
        {
          text: 'Бенефициар',
          value: 'beneficator',
          sortable: false
        },
        {
          text: 'Тип запроса',
          value: 'requestType',
          sortable: false
        },
        {
          text: 'Филиал',
          value: 'filial',
          sortable: false
        },
        {
          text: 'Сегмент',
          value: 'segment',
          sortable: false
        },
        {
          text: 'Действия',
          value: 'action',
          sortable: false
        },
      ],
    }
  },
  created() {
    this.user = JSON.parse(JSON.stringify(this.userData))
  },
  mounted() {
    const headers = {"Content-Type": "application/json"};
    axios.get(
        `http://localhost:5000/api/Order/GetOrdersByUserId?userId=${this.user.id}`,
        {headers})
        .then(response => {
          this.array = response.data.result
        })
  },

  computed: {
    ...mapGetters({
      userData: 'getUserData'
    }),
    showOrderList() {
      return this.array.map(
          (items, index) => ({
            ...items,
            index: index + 1
          }))
    }
  },

  methods: {}
}
</script>

<style scoped>
.form {
  width: 1750px;
  margin: 0 auto;
}
</style>