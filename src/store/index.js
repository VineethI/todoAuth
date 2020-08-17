import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    logEmail: "",
    logPassword: "",
    regEmail: "",
    regPassword: "",
    todo: "",
  },
  mutations: {
    GET_LOGEMAIL(state, value) {
      state.logEmail = value
    },
    GET_LOGPASSWORD(state, value) {
      state.logPassword = value
    },
    GET_REGEMAIL(state, value) {
      state.regEmail = value
    },
    GET_REGPASSWORD(state, value) {
      state.regPassword = value
    },
    GET_TODO(state,value) {
      state.todo = value
    }
  },
  actions: {},
  modules: {}
});
