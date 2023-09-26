import { createStore } from 'vuex'
import axios from 'axios'
import data from './modules/data'
import dropdown from './modules/dropdown'

export default createStore({
  state: {
    token: localStorage.getItem('auth') || null,
    user: JSON.parse(localStorage.getItem('user')) || {},
    newUser: JSON.parse(localStorage.getItem('newUser')) || null,
    hostname: 'http://127.0.0.1:8000',
    s3bucket: 'https://s3.amazonaws.com/climbonsight.storage',
    // hostname: 'https://climbonsightbackend.cevonbeauty.com',
    windowWidth: '',
    menu: false,
    events: [
      {id: 1, name: 'Demo Event one', type: 'past', image: require('@/assets/images/event-1.jpeg')},
      {id: 2, name: 'First Onging event', type: 'past', image: require('@/assets/images/event-2.jpeg')},
      {id: 3, name: 'Mountain Hikes', type: 'registered', image: require('@/assets/images/event-3.jpeg')},
      {id: 4, name: 'Everst Adventure', type: 'past', image: require('@/assets/images/event-4.jpeg')},
      {id: 5, name: 'Kilimanjaro Climbing', type: 'registered', image: require('@/assets/images/event-5.jpeg')},
      {id: 6, name: 'Easter Euro Tour', type: 'registered', image: require('@/assets/images/event-6.jpeg')},
      {id: 7, name: 'Jouney to Ther West', type: 'past', image: require('@/assets/images/event-7.jpeg')},
      {id: 8, name: 'Final Event', type: 'past', image: require('@/assets/images/event-8.jpeg')},
      {id: 9, name: 'Everst Adventure', type: 'past', image: require('@/assets/images/event-9.jpeg')},
      {id: 10, name: 'Kilimanjaro Climbing', type: 'registered', image: require('@/assets/images/event-1.jpeg')},
      {id: 11, name: 'Easter Euro Tour', type: 'registered', image: require('@/assets/images/event-2.jpeg')},
      {id: 12, name: 'Jouney to Ther West', type: 'past', image: require('@/assets/images/event-3.jpeg')},
      {id: 13, name: 'Final Event', type: 'past', image: require('@/assets/images/event-4.jpeg')},
      {id: 14, name: 'Demo Event one', type: 'past', image: require('@/assets/images/event-5.jpeg')},
      {id: 15, name: 'First Onging event', type: 'past', image: require('@/assets/images/event-6.jpeg')},
      {id: 16, name: 'Mountain Hikes', type: 'registered', image: require('@/assets/images/event-7.jpeg')},
      {id: 17, name: 'Everst Adventure', type: 'past', image: require('@/assets/images/event-8.jpeg')},
      {id: 18, name: 'Kilimanjaro Climbing', type: 'registered', image: require('@/assets/images/event-9.jpeg')},
      {id: 19, name: 'Easter Euro Tour', type: 'registered', image: require('@/assets/images/event-1.jpeg')},
      {id: 20, name: 'Jouney to Ther West', type: 'past', image: require('@/assets/images/event-3.jpeg')},
    ],
    guides: [
      {id: 1, name: 'Jane Doe', image: require('@/assets/images/user-1.jpeg')},
      {id: 2, name: 'Koomson Smith', image: require('@/assets/images/user-2.jpeg')},
      {id: 3, name: 'Kathering Page', image: require('@/assets/images/user-3.jpeg')},
      {id: 4, name: 'Nina Rosemund', image: require('@/assets/images/user-4.jpeg')},
      {id: 5, name: 'Tyller Addams', image: require('@/assets/images/user-5.jpeg')},
      {id: 6, name: 'Emily Gibbson', image: require('@/assets/images/user-6.jpeg')},
      {id: 7, name: 'Cindy Whytte', image: require('@/assets/images/user-7.jpeg')},
      {id: 8, name: 'Emmanuel Jason', image: require('@/assets/images/user-8.jpeg')},
      {id: 9, name: 'Larry Harrison', image: require('@/assets/images/user-9.jpeg')},
      {id: 10, name: 'Tracy Brown', image: require('@/assets/images/user-10.jpeg')},
      {id: 11, name: 'Aurora Jackson', image: require('@/assets/images/user-11.jpeg')},
      {id: 12, name: 'Jason Woods', image: require('@/assets/images/user-12.jpeg')},
    ],
    climbers: [
      {id: 1, name: 'Serinna Thorne', image: require('@/assets/images/user-7.jpeg')},
      {id: 2, name: 'Samuel K. Jordan', image: require('@/assets/images/user-8.jpeg')},
      {id: 3, name: 'Catherine Gomez', image: require('@/assets/images/user-4.jpeg')},
      {id: 4, name: 'Emmanuella Coleman', image: require('@/assets/images/user-2.jpeg')},
      {id: 5, name: 'Sean Tyller', image: require('@/assets/images/user-12.jpeg')},
      {id: 6, name: 'Caroline Forbes', image: require('@/assets/images/user-6.jpeg')},
      {id: 7, name: 'Adele Newton', image: require('@/assets/images/user-11.jpeg')},
      {id: 8, name: 'Kingston Jackson', image: require('@/assets/images/user-1.jpeg')},
      {id: 9, name: 'George Kutcher', image: require('@/assets/images/user-10.jpeg')},
      {id: 10, name: 'Daisy Hughe', image: require('@/assets/images/user-5.jpeg')},
      {id: 11, name: 'Zoe Kettleman', image: require('@/assets/images/user-3.jpeg')},
      {id: 12, name: 'William Forrest', image: require('@/assets/images/user-9.jpeg')},
    ],
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
