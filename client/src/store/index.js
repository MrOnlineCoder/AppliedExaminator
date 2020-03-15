import Vue from 'vue'
import Vuex from 'vuex'

import testbooks from './testbooks.module.js'
import exams from './exams.module.js'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    testbooks,
    exams
  }
})
