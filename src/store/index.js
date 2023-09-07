import { createStore } from 'vuex'
import axios from 'axios'
import data from './modules/data'


export default createStore({
  state: {
    token: localStorage.getItem('auth') || null,
    user: JSON.parse(localStorage.getItem('user')) || {},
    newUser: localStorage.getItem('newUser') || null,
    hostname: 'https://climbonsightbackend.cevonbeauty.com',
    windowWidth: '',
  },
  mutations: {
    computeWindow(state) {
      state.windowWidth = window.innerWidth
    },
    //set auth
    signInSuccess(state, payload) {
      this.commit('setToken', payload.token)
      this.commit('setAuthUser', payload.user)
    },
    async signUpSuccess(state, payload) {
      this.commit('setAuthUser', payload.user)
      this.commit('setNewUser', payload.token)
    },
    setToken(state, payload) {
      localStorage.setItem('auth', payload)
      localStorage.getItem('newUser') ? localStorage.removeItem('newUser') : ''
      state.token = payload
    },
    setAuthUser(state, payload) {
      localStorage.setItem('user', JSON.stringify(payload))
      state.user = payload
    },
    setNewUser(state, payload) {
      const data = { token: payload, form: {}}
      localStorage.setItem('newUser', JSON.stringify(data))
      state.newUser = data
    },
    destroyToken(){
      localStorage.removeItem('auth')
      localStorage.removeItem('user')
      location.reload()
    },
    
    
  },
  actions: {
    logOut(state, payload) {
      const url = this.getters.getHostname + '/api/logout'
      axios.post(url, payload, {
          headers: {
              'Authorization': `Bearer ${this.getters.getToken}`,
              'Content-Type': 'application/json'
          },
      })
      .then(() => {
        state.commit('destroyToken')
      })
      .catch(e => {
          console.error(e.response)
      })
    },
  },
  getters: {
    auth(state) {
      return state.token !== null
    },
    newUser(state) {
      return state.newUser !== null
    },
    getHostname: (state) => state.hostname,
    getToken: (state) => state.token,
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
