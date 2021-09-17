<template>
  <div>
    <v-app-bar
        elevation="1"
        color="white"
    >

    </v-app-bar>
    <v-data-table
        :headers="cols"
        :items="rows"
        no-results-text="Нет данных"
    >
      <template v-slot:item.action="{item}">
        <v-btn small>
          <router-link :to="`/order-detail/${item.id}`">
            Подробнее
          </router-link>
        </v-btn>
      </template>
      <template slot="no-data">
          Нет данных
      </template>
    </v-data-table>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "OrderList",
  data() {
    return {
      cols: [
        {
          text: 'Имя',
          value: 'name',
        },
        {
          text: '',
          value: 'action',
        },
      ],
      rows: [
        {
          id: 1,
          name: 'Frozen Yogurt',
        },
        {
          id: 2,
          name: 'Ice cream sandwich',
        },
      ]
    }
  },
  mounted() {
    const headers = {"Content-Type": "application/json"};
    axios.get("http://localhost:5000/api/GetCompanyNameByBin?bin=", {headers})
        .then(response => {
          this.name = response.data.result
        })
  },

  methods: {
    detailView(item) {
      console.log(item)
    }
  }
}
</script>

<style scoped>

</style>