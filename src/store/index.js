import { createStore } from 'vuex'
import axios from 'axios'
import data from './modules/data'
import dropdown from './modules/dropdown'

export default createStore({
  state: {
    token: localStorage.getItem('auth') || null,
    user: JSON.parse(localStorage.getItem('user')) || {},
    newUser: JSON.parse(localStorage.getItem('newUser')) || null,
    // hostname: 'http://127.0.0.1:8000',
    hostname: 'https://api.climbonsight.ca',
    s3bucket: 'https://s3.amazonaws.com/climbonsight.storage',
    windowWidth: '',
    menu: false,
    forms: { active: false, loader: false, new_payment: false, withdraw_funds: false},
    events: [
      {id: 1, name: 'Demo Event one', type: 'past', image: 'temp/event-1.jpeg'},
      {id: 2, name: 'First Onging event', type: 'past', image: 'temp/event-2.jpeg'},
      {id: 3, name: 'Mountain Hikes', type: 'registered', image: 'temp/event-3.jpeg'},
      {id: 4, name: 'Everst Adventure', type: 'past', image: 'temp/event-4.jpeg'},
      {id: 5, name: 'Kilimanjaro Climbing', type: 'registered', image: 'temp/event-5.jpeg'},
      {id: 6, name: 'Easter Euro Tour', type: 'registered', image: 'temp/event-6.jpeg'},
      {id: 7, name: 'Jouney to Ther West', type: 'past', image: 'temp/event-7.jpeg'},
      {id: 8, name: 'Final Event', type: 'past', image: 'temp/event-8.jpeg'},
      {id: 9, name: 'Everst Adventure', type: 'past', image: 'temp/event-9.jpeg'},
      {id: 10, name: 'Kilimanjaro Climbing', type: 'registered', image: 'temp/event-1.jpeg'},
      {id: 11, name: 'Easter Euro Tour', type: 'registered', image: 'temp/event-2.jpeg'},
      {id: 12, name: 'Jouney to Ther West', type: 'past', image: 'temp/event-3.jpeg'},
      {id: 13, name: 'Final Event', type: 'past', image: 'temp/event-4.jpeg'},
      {id: 14, name: 'Demo Event one', type: 'past', image: 'temp/event-5.jpeg'},
      {id: 15, name: 'First Onging event', type: 'past', image: 'temp/event-6.jpeg'},
      {id: 16, name: 'Mountain Hikes', type: 'registered', image: 'temp/event-7.jpeg'},
      {id: 17, name: 'Everst Adventure', type: 'past', image: 'temp/event-8.jpeg'},
      {id: 18, name: 'Kilimanjaro Climbing', type: 'registered', image: 'temp/event-9.jpeg'},
      {id: 19, name: 'Easter Euro Tour', type: 'registered', image: 'temp/event-1.jpeg'},
      {id: 20, name: 'Jouney to Ther West', type: 'past', image: 'temp/event-3.jpeg'},
    ],
    guides: [
      {id: 1, name: 'Jane Doe', image: 'temp/user-1.jpeg'},
      {id: 2, name: 'Koomson Smith', image: 'temp/user-2.jpeg'},
      {id: 3, name: 'Kathering Page', image: 'temp/user-3.jpeg'},
      {id: 4, name: 'Nina Rosemund', image: 'temp/user-4.jpeg'},
      {id: 5, name: 'Tyller Addams', image: 'temp/user-5.jpeg'},
      {id: 6, name: 'Emily Gibbson', image: 'temp/user-6.jpeg'},
      {id: 7, name: 'Cindy Whytte', image: 'temp/user-7.jpeg'},
      {id: 8, name: 'Emmanuel Jason', image: 'temp/user-8.jpeg'},
      {id: 9, name: 'Larry Harrison', image: 'temp/user-9.jpeg'},
      {id: 10, name: 'Tracy Brown', image: 'temp/user-10.jpeg'},
      {id: 11, name: 'Aurora Jackson', image: 'temp/user-11.jpeg'},
      {id: 12, name: 'Jason Woods', image: 'temp/user-12.jpeg'},
    ],
    climbers: [
      {id: 1, name: 'Serinna Thorne', image: 'temp/user-7.jpeg'},
      {id: 2, name: 'Samuel K. Jordan', image: 'temp/user-8.jpeg'},
      {id: 3, name: 'Catherine Gomez', image: 'temp/user-4.jpeg'},
      {id: 4, name: 'Emmanuella Coleman', image: 'temp/user-2.jpeg'},
      {id: 5, name: 'Sean Tyller', image: 'temp/user-12.jpeg'},
      {id: 6, name: 'Caroline Forbes', image: 'temp/user-6.jpeg'},
      {id: 7, name: 'Adele Newton', image: 'temp/user-11.jpeg'},
      {id: 8, name: 'Kingston Jackson', image: 'temp/user-1.jpeg'},
      {id: 9, name: 'George Kutcher', image: 'temp/user-10.jpeg'},
      {id: 10, name: 'Daisy Hughe', image: 'temp/user-5.jpeg'},
      {id: 11, name: 'Zoe Kettleman', image: 'temp/user-3.jpeg'},
      {id: 12, name: 'William Forrest', image: 'temp/user-9.jpeg'},
    ],
    payment_options: [
      { id: 1, name: 'Jacob Audrey', account_no: '123 456 789 210', bank_name: 'Greenstone Bank', sort_code: '0292', address: 'Grand Central, New York' },
      { id: 2, name: 'Stephen Wood', account_no: '456 123 210 789', bank_name: 'Zenith Bank', sort_code: '123', address: 'Barcelona, Spain' },


    ]
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
    //signup climber
    updatePersonalInfo(state, payload) {
      let stored = JSON.parse(localStorage.getItem('newUser'))
      stored.form.dob = payload.dob
      stored.form.gender = payload.gender
      stored.form.tempImage = payload.tempImage
      localStorage.setItem('newUser', JSON.stringify(stored))
      state.newUser.form.dob = payload.dob
      state.newUser.form.gender = payload.gender
      state.newUser.form.tempImage = payload.tempImage
    },
    updateClimbingExp(state, payload) {
        let stored = JSON.parse(localStorage.getItem('newUser'))
        stored.form.skills = payload.skills
        stored.form.activities = payload.activities
        localStorage.setItem('newUser', JSON.stringify(stored))
        state.newUser.form.skills = payload.skills
        state.newUser.form.activities = payload.activities
    },
    updateBio(state, payload) {
        let stored = JSON.parse(localStorage.getItem('newUser'))
        stored.form.bio = payload.bio
        localStorage.setItem('newUser', JSON.stringify(stored))
        state.newUser.form.bio = payload.bio

    },
    updateNewSkills(state, payload) {
        let inputString = payload.new_skills
        let dataArray = inputString.split(',')
        let stored = JSON.parse(localStorage.getItem('newUser'))
        stored.form.new_skills = dataArray
        localStorage.setItem('newUser', JSON.stringify(stored))
        state.newUser.form.new_skills = dataArray
    },
    toggleMenu(state) {
      state.menu = !state.menu
    },
    updateClimber(state, payload) {
      this.commit('setAuthUser', payload)
      state.user = payload
    },
    async openModal(state, payload) {
      state.forms.loader = true
      await this.commit('activateModal')
      document.body.classList.add('fixed-body')
      if(payload === 'new_payment') {
        state.forms.new_payment = true
      }else if(payload === 'withdraw_funds') {
        state.forms.withdraw_funds = true
      }
    },
    activateModal(state) {
      state.forms.active = true
    },
    closeModal(state) {
      state.forms.active = false
      document.body.classList.remove('fixed-body')
      for (let i in state.forms)
      state.forms[i] = false
    },
    stopFormLoader(state) {
      state.forms.loader = false
    },
    destroyToken(){
      localStorage.removeItem('auth')
      localStorage.removeItem('user')
      location.reload()
    },
  },
  actions: {
    async signIn(state, payload) {
        return await axios.post(this.getters.getHostname + '/api/sign-in', payload)
    },
    getAuthUser(state, token) {
      const url = this.getters.getHostname + '/api/user?token=' + token
      axios.get(url)
      .then((res) => {
        state.commit('setAuthUser', res.data)
      })
      .catch(e => {
        if(e.response.status == 400 || e.response.status == 404) {
          state.commit('destroyToken')
        }
      })
    },
    logOut(state) {
      const url = this.getters.getHostname + '/api/logout?token='+ this.getters.getToken
      axios.delete(url)
      .then(() => {
        state.commit('destroyToken')
      })
      .catch(() => {
          state.commit('destroyToken')
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
    getDevice(state) {
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
    data,
    dropdown
  }
})
