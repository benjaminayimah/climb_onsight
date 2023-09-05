import { createStore } from 'vuex'
import data from './modules/data'


export default createStore({
  state: {
    token: localStorage.getItem('auth') || null,
    user: JSON.parse(localStorage.getItem('user')) || {},
    newUser: localStorage.getItem('newUser') || true,
    windowWidth: '',
  },
  mutations: {
    computeWindow(state) {
      state.windowWidth = window.innerWidth
    },
    //set auth
    async signInSuccess(state, payload) {
      await this.commit('setToken', payload.token)
      await this.commit('setAuthUser', payload.user)
    },
    setToken(state, payload) {
      localStorage.setItem('auth', payload)
      state.token = payload
    },
    setAuthUser(state, payload) {
      localStorage.setItem('user', JSON.stringify(payload))
      state.user = payload
    },
    // async signUpSuccess(state, payload) {

    // }
  },
  actions: {
  },
  getters: {
    auth(state) {
      return state.token !== null
    },
    newUser(state) {
      return state.newUser !== null
    },
    getWindowWidth(state) {
      let appWidth = 1344
      if(state.windowWidth < 600){
        return 'mobile'
      }else if(state.windowWidth > appWidth){
        return 'desktop'
      }else{
        return 'tablet'
      }
    }
  },
  modules: {
    data
  }
})
