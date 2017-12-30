import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    boxIsOpen: false,
    navIsOpen: false,
    city: ''
  },
  mutations: {
    setCity(state, city) {
      state.city = city
    },
    setBoxIsOpen(state, flag) {
      state.boxIsOpen = flag
    },
    reverseNavIsOpen(state, flag) {
      state.navIsOpen = !state.navIsOpen
    },
    reverseBoxIsOpen(state) {
      state.boxIsOpen = !state.boxIsOpen
    }
  }
})
