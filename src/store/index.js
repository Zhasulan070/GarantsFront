import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userData: localStorage.getItem('user') || "",
    authStatus: "",
  },
  getters: {
    isLoggedIn: state => !!state.userData,
    getUserData: state => state.userData ? JSON.parse(state.userData) : ''
  },
  mutations: {
    setUserData(state, data) {
      localStorage.setItem('user', JSON.stringify(data))
      state.authStatus = true
    }
  },
  actions: {
  },
  modules: {
  }
})
