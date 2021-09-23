<template>
  <div>
    <v-main>
      <v-container>
        <div class="form">
          <v-form>
            <v-text-field
                outlined
                dense
                v-model="uin"
                label="Юшка"
            >
            </v-text-field>

            <v-select
                outlined
                dense
                v-model="form.filial"
                :items="filials"
                item-text="name"
                item-value="id"
                label="Филиалы"
            >
            </v-select>

            <v-select
                outlined
                dense
                v-model="form.requestType"
                :items="requestTypes"
                item-text="name"
                item-value="id"
                label="Тип заявки"
            >
            </v-select>

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

            <v-select
                outlined
                dense
                v-model="form.segmentType"
                :items="segmentTypes"
                item-text="name"
                item-value="id"
                label="Сегмент"
            >
            </v-select>

            <div class="kl_form">
              <v-data-table
                  :headers="headers"
                  :items="showKlList"
                  class="elevation-1"
              >
                <template
                    v-slot:top
                >
                  <v-toolbar
                      flat
                  >
                    <v-toolbar-title>
                      Укажите список КЛ
                    </v-toolbar-title>

                    <v-divider
                        class="mx-6"
                        inset
                        vertical
                    >
                    </v-divider>

                    <v-spacer>

                    </v-spacer>

                    <v-dialog
                        class="kl_form"
                        v-model="dialog"
                        max-width="500px"
                    >

                      <template v-slot:activator="{ on, attrs }">
                        <v-btn
                            color="primary"
                            dark
                            class="mb-2"
                            v-bind="attrs"
                            v-on="on"
                        >
                          Добавить КЛ
                        </v-btn>
                      </template>

                      <v-card>
                        <v-card-text>
                          <v-container>
                            <v-select
                                outlined
                                dense
                                v-model="form.kl_type"
                                :items="kl_types"
                                item-text="nameKl"
                                item-value="nameKl"
                                label="КЛ"
                            >
                            </v-select>

                            <v-text-field
                                outlined
                                dense
                                v-model="summa"
                                label="Сумма"
                            ></v-text-field>

                            <v-select
                                outlined
                                dense
                                v-model="form.currency"
                                :items="currencies"
                                item-text="name"
                                item-value="id"
                                label="Валюта"
                            >
                            </v-select>

                            <v-text-field
                                outlined
                                dense
                                v-model="validDate"
                                label="Срок(месяцев)"
                            >
                            </v-text-field>
                          </v-container>
                        </v-card-text>

                        <v-card-actions>
                          <v-spacer></v-spacer>
                          <v-btn
                              color="blue darken-1"
                              text
                              @click="closeAddKl"
                          >
                            Закрыть
                          </v-btn>

                          <v-btn
                              color="blue darken-1"
                              text
                              @click="pushKl"
                          >
                            Добавить
                          </v-btn>
                        </v-card-actions>
                      </v-card>
                    </v-dialog>

                    <v-dialog
                        class="kl_form"
                        v-model="dialogDeleteItem"
                        max-width="500px"
                    >
                      <v-card>
                        <v-card-title class="text-h5">Вы уверены что хотите удалить КЛ?</v-card-title>
                        <v-card-actions>
                          <v-spacer></v-spacer>
                          <v-btn color="blue darken-1" text @click="closeDelete">Закрыть</v-btn>
                          <v-btn color="blue darken-1" text @click="deleteItemConfirm">Да</v-btn>
                          <v-spacer></v-spacer>
                        </v-card-actions>
                      </v-card>
                    </v-dialog>

                    <v-dialog
                        class="kl_form"
                        v-model="dialogEdit"
                        max-width="500px"
                    >
                      <v-card>
                        <v-card-text>
                          <v-container>
                            <v-select
                                outlined
                                dense
                                v-model="klTypeEdit"
                                :items="kl_types"
                                label="КЛ"
                            >
                            </v-select>
                            <v-text-field
                                outlined
                                dense
                                v-model="summaEdit"
                                label="Сумма"
                            ></v-text-field>

                            <v-select
                                outlined
                                dense
                                v-model="currencyEdit"
                                :items="currencies"
                                item-text="name"
                                item-value="name"
                                label="Валюта"
                            >
                            </v-select>

                            <v-text-field
                                outlined
                                dense
                                v-model="validDateEdit"
                                label="Срок(месяцев)"
                            >
                            </v-text-field>

                          </v-container>
                        </v-card-text>

                        <v-card-actions>
                          <v-spacer></v-spacer>
                          <v-btn
                              color="blue darken-1"
                              text
                              @click="dialogEdit = false"
                          >
                            Закрыть
                          </v-btn>

                          <v-btn
                              color="blue darken-1"
                              text
                              @click="closeEditDialog"
                          >
                            Изменить
                          </v-btn>
                        </v-card-actions>
                      </v-card>
                    </v-dialog>
                  </v-toolbar>
                </template>
                <template v-slot:item.actions="{ item }">
                  <v-icon
                      small
                      class="mr-2"
                      @click="editItem(item)"
                  >
                    mdi-pencil
                  </v-icon>
                  <v-icon
                      small
                      @click="deleteItem(item)"
                  >
                    mdi-delete
                  </v-icon>
                </template>

              </v-data-table>
            </div>

            <v-text-field
                outlined
                dense
                v-model="beneficator"
                label=" Название бенефициара"
            >
            </v-text-field>

            <v-btn
                outlined
                dense
                class="mr-4"
                @click="submit"
                color="#4fe612"
            >
              Направить заявку в ДКА
            </v-btn>

          </v-form>
        </div>
      </v-container>
    </v-main>
  </div>
</template>

<script>
import axios from "axios";
import router from "../router";

export default {
  name: "CreateOrder",
  editedIndex: null,
  data() {
    return {
      headers: [
        {
          text: 'Вид КЛ',
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
          value: 'currency',
          sortable: false
        },
        {
          text: 'Срок(месяцев)',
          value: 'validDate',
          sortable: false
        },
        {
          text: 'Действие',
          value: 'actions',
          sortable: false
        }
      ],
      form: {
        filial: '',
        requestType: '',
        currency: '',
        kl_type: '',
        segmentType:''
      },

      validDate:'',
      kl_types: [],
      requestTypes: [],
      segmentTypes: [],
      filials: [],
      klTypeEdit: '',
      summaEdit: '',
      validDateEdit: '',
      currencyEdit: '',
      dialogEdit: false,
      dialog: false,
      dialogDeleteItem: false,
      klArray: [],
      summa: '',
      currencies: [],
      bin: '',
      uin: '',
      beneficator: '',
      name: '',
      counter: 0,
      result: {}
    }
  },

  mounted() {
    this.getFilials()
    this.getCurrencies()
    this.getRequestTypes()
    this.getSegments()
  },

  methods: {

    getFilials: function () {
      const headers = {"Content-Type": "application/json"};
      axios.get("http://localhost:5000/api/GetReferences/GetFilials", {headers})
          .then(response => {
            this.filials = response.data.result
          })
    },

    getCurrencies: function () {
      const headers = {"Content-Type": "application/json"};
      axios.get("http://localhost:5000/api/GetReferences/GetCurrencies", {headers})
          .then(response => {
            this.currencies = response.data.result
          })
    },

    getRequestTypes: function () {
      const headers = {"Content-Type": "application/json"};
      axios.get("http://localhost:5000/api/GetReferences/GetRequestTypes", {headers})
          .then(response => {
            this.requestTypes = response.data.result
          })
    },

    getSegments: function () {
      const headers = {"Content-Type": "application/json"};
      axios.get("http://localhost:5000/api/GetReferences/GetSegments", {headers})
          .then(response => {
            this.segmentTypes = response.data.result
          })
    },

    pushKl: function () {
      this.klArray.push(
          {
            currency: this.form.currency,
            kl_type: this.form.kl_type,
            summa: this.summa,
            validDate: this.validDate
          }
      )
      this.form.currency = ''
      this.form.kl_type = ''
      this.summa = ''
      this.validDate = ''
      this.dialog = false
    },

    closeAddKl() {
      this.form.kl_type = ''
      this.summa = ''
      this.form.currency = ''
      this.validDate = ''
      this.dialog = false
    },

    closeDelete() {
      this.dialogDeleteItem = false
    },

    editItem(item) {
      this.editedIndex = item.index
      this.klTypeEdit = item.kl_type
      this.summaEdit = item.summa
      this.currencyEdit = item.currency
      this.validDateEdit = item.validDate
      this.dialogEdit = true
    },

    closeEditDialog() {
      let list = [...this.klArray]
      const index = this.editedIndex - 1
      let item = {
        kl_type: this.klTypeEdit,
        summa: this.summaEdit,
        currency: this.currencyEdit,
        validDate: this.validDateEdit
      }
      list[index] = {...item}
      this.klArray = list
      this.dialogEdit = false
    },

    deleteItem(item) {
      this.editedIndex = item.index - 1
      this.dialogDeleteItem = true
    },

    deleteItemConfirm() {
      this.klArray.splice(this.editedIndex, 1)
      this.closeDelete()
    },

    submit: function (){
      this.result = JSON.stringify({
        uin: this.uin,
        filial: this.form.filial,
        requestType: this.form.requestType,
        segmentType: this.form.segmentType,
        bin: this.bin,
        name: this.name,
        kl_array: this.klArray,
        beneficator: this.beneficator
      })

      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: this.result
      };
      fetch("http://localhost:5000/api/Order/CreateOrder", requestOptions)
          .then(response => response.json());

      router.push('/')
    }

  },

  computed: {
    showKlList() {
      return this.klArray.map(
          (items, index) => ({
            ...items,
            index: index + 1
          }))
    }
  },

  watch: {
    closeEditDialog(val) {
      val || this.closeEditDialog()
    },

    klArray(newVal) {
      this.klArray = newVal;
    },

    bin(newVal) {
      if (newVal.length === 12) {
        const headers = {"Content-Type": "application/json"};

        axios.get("http://localhost:5000/api/GetCompanyNameByBin?bin=" + newVal, {headers})
            .then(response => {
              this.name = response.data.result
            })

        axios.get("http://localhost:5000/api/GetCompanyKl/ByBin?bin=" + newVal, {headers})
            .then(response => {
              this.kl_types = response.data.result
            })

      }
    }

  }
}
</script>

<style scoped>
.form {
  width: 750px;
  margin: 48px auto;
}

.kl_form {
  margin-bottom: 24px;
  border: 1px solid #dddddd;
  padding: 12px;

}

.kl_form__content {
  margin-top: 12px;
}
</style>
