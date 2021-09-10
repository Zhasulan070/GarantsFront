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
                      KL List
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
                          ADD Kl
                        </v-btn>
                      </template>

                      <v-card>
                        <v-card-text>
                          <v-container>
                            <v-select
                                outlined
                                dense
                                v-model="kl_type"
                                :items="klTypes"
                                label="КЛ"
                            >
                            </v-select>
                            <v-text-field
                                v-model="summa"
                                label="Сумма"
                            ></v-text-field>

                            <v-select
                                outlined
                                dense
                                v-model="currency"
                                :items="['тенге','доллар','евро']"
                                label="Валюта"
                            >
                            </v-select>
                          </v-container>
                        </v-card-text>

                        <v-card-actions>
                          <v-spacer></v-spacer>
                          <v-btn
                              color="blue darken-1"
                              text
                              @click="closeAddKl"
                          >
                            Cancel
                          </v-btn>

                          <v-btn
                              color="blue darken-1"
                              text
                              @click="pushKl"
                          >
                            Save
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
                        <v-card-title class="text-h5">Are you sure you want to delete this item?</v-card-title>
                        <v-card-actions>
                          <v-spacer></v-spacer>
                          <v-btn color="blue darken-1" text @click="closeDelete">Cancel</v-btn>
                          <v-btn color="blue darken-1" text @click="deleteItemConfirm">OK</v-btn>
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
                                :items="klTypes"
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
                                :items="['тенге','доллар','евро']"
                                label="Валюта"
                            >
                            </v-select>
                          </v-container>
                        </v-card-text>

                        <v-card-actions>
                          <v-spacer></v-spacer>
                          <v-btn
                              color="blue darken-1"
                              text
                              @click="dialogEdit = false"
                          >
                            Cancel
                          </v-btn>

                          <v-btn
                              color="blue darken-1"
                              text
                              @click="closeEditDialog"
                          >
                            Edit
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
                label="Бенефициар"
            >
              <!--              beneficator-->
            </v-text-field>

            <!--            send button-->
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
// import axios from "axios";

export default {
  name: "CreateOrder",
  editedIndex:null,
  data(){
    return{
      headers: [
        {
          text: 'kl',
          value: 'kl_type',
          sortable: false
        },
        {
          text: 'Summa',
          value: 'summa',
          sortable: false
        },
        {
          text: 'Currency',
          value: 'currency',
          sortable: false
        },
        { text: 'Actions',
          value: 'actions',
          sortable: false
        }
      ],
      dialog: false,
      klTypeEdit: '',
      summaEdit: '',
      currencyEdit: '',
      dialogEdit: false,
      dialogDeleteItem: false,
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
      this.dialog = false
    },

    closeAddKl () {
      this.kl_type=''
      this.summa=''
      this.currency=''
      this.dialog = false
    },

    closeDelete(){
      this.dialogDeleteItem = false
    },

    editItem (item) {
      this.editedIndex = item.index
      this.klTypeEdit = item.kl_type
      this.summaEdit = item.summa
      this.currencyEdit = item.currency
      this.dialogEdit = true
    },

    closeEditDialog(){
      console.log(this.klArray[this.editedIndex-1])
      const index = this.editedIndex - 1
      let item = {
        kl_type: this.klTypeEdit,
        summa: this.summaEdit,
        currency: this.currencyEdit
      }
      this.klArray[index] = {...item}
      this.dialogEdit = false
      console.log(this.klArray)
    },

    deleteItem (item) {
      this.editedIndex = item.index-1
      this.dialogDeleteItem = true
    },

    deleteItemConfirm () {
      this.klArray.splice(this.editedIndex,1)
      this.closeDelete()
    },

    submit:function (){
      console.log(1)
    }

    /*submit: function (){
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
    }*/

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
    closeEditDialog(val){
      val || this.closeEditDialog()
    },

    klArray(newVal){
      this.klArray = newVal;
    }
    /*bin(newVal){
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
    }*/


  }
}
</script>

<style scoped>
.form{
  width: 600px;
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