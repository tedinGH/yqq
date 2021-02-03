import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'

Vue.use(Vuex)

const state = {
  token: '',
};

export default new Vuex.Store({
  state: state,
  mutations: mutations
})