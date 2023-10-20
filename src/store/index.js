import { createStore } from 'vuex'
import axios from 'axios'
import data from './modules/data'
import dropdown from './modules/dropdown'

export default createStore({
  state: {
    token: localStorage.getItem('auth') || null,
    user: JSON.parse(localStorage.getItem('user')) || {},
    newUser: JSON.parse(localStorage.getItem('newUser')) || null,
    alert: { status: { show: false, success: false, danger: false, warning: false, info: false }, body: '' },
    hostname: 'http://127.0.0.1:8000',
    // hostname: 'https://api.climbonsight.ca',
    s3bucket: 'https://s3.amazonaws.com/climbonsight.storage',
    windowWidth: '',
    menu: false,
    forms: { 
      active: false,
      loader: false,
      new_payment: false,
      withdraw_funds: false,
      account_details: false,
      banks: false,
      add_admin: false,
      new_guide: false,
      tempStorage: {}
    },
    events: [],
    guides: [],
    climbers: [],
    payment_options: [
      { id: 1, name: 'Jacob Audrey', account_no: '123 456 789 210', bank_name: 'Greenstone Bank', sort_code: '0292', address: 'Grand Central, New York' },
      { id: 2, name: 'Stephen Wood', account_no: '456 123 210 789', bank_name: 'Zenith Bank', sort_code: '123', address: 'Barcelona, Spain' }
    ],
    admins: [],
    notifications: []
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
    setUserData(state, payload) {
      this.commit('setAuthUser', payload.user)
      state.notifications = payload.notifications
      state.guides = payload.guides
      state.climbers = payload.climbers
      state.events = payload.events
    },
    setNewUser(state, payload) {
      const data = { token: payload, form: {}}
      localStorage.setItem('newUser', JSON.stringify(data))
      state.newUser = data

    },
    updateUser(state, payload) {
      state.user = payload
      this.commit('updateLocalStorage', payload)
    },
    updateLocalStorage(state, payload) {
      localStorage.setItem('user', JSON.stringify(payload));
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
    addToEvent(state, payload) {
      state.events.push(payload)
      localStorage.removeItem('newEvent')
    },
    //alerts
    showAlert(state, payload) {
      this.commit('dismisAlert')
      state.alert.body = payload.body
      if(payload.status === 'success'){
          state.alert.status.success = true
          state.alert.status.show = true
          setTimeout(() => {
            this.commit('dismisAlert')
          }, 3000);
      }else if(payload.status === 'danger'){
          state.alert.status.danger = true
          state.alert.status.show = true
      }   
    },
    dismisAlert(state) {
      for (let i in state.alert.status)
      state.alert.status[i] = false
      state.alert.body = ''
    },
    // modals
    async openModal(state, payload) {
      state.forms.loader = true
      await this.commit('activateModal')
      document.body.classList.add('fixed-body')
      if(payload === 'new_payment') {
        state.forms.new_payment = true
      }else if(payload === 'withdraw_funds') {
        state.forms.withdraw_funds = true
      }else if(payload === 'account_details') {
        state.forms.account_details = true
      }else if(payload === 'banks') {
        state.forms.banks = true
      }else if(payload === 'add_admin') {
        state.forms.add_admin = true
      }else if (payload === 'new_guide') {
        state.forms.new_guide = true
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
    async preloadBank(state, payload) {
      await this.commit('setTempData', payload)
      this.commit('openModal', 'account_details')
    },
    async preloadNewGuide(state, payload) {
      await this.commit('setTempData', payload)
      this.commit('openModal', 'new_guide')
    },
    setTempData(state, payload) {
      state.forms.tempStorage = payload
    },
    stopFormLoader(state) {
      state.forms.loader = false
    },
    acceptGuide(state, payload) {
      const i =  state.guides.findIndex(x => x.id === payload) 
      if(i > -1)
      state.guides[i].is_approved = true
      const k = state.notifications.findIndex(x => x.id === payload)
      state.notifications.splice(k, 1);
    },
    declineGuide(state, payload) {
      state.guides.filter(data => data.id !== payload)
      state.notifications.filter(data => data.id !== payload)
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
        state.commit('setUserData', res.data)
      })
      .catch(e => {
        if(e.response.status == 400 || e.response.status == 404 ) {
          state.commit('destroyToken')
        }
      })
    },
    async doPreloadTemp(state, payload) {
      return await axios.post(this.getters.getHostname+'/api/set-temp-update?token=' + this.getters.getToken, {image: payload})
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
    },
    is_super(state) {
      return state.user.role === 'super_admin' ? true : false
    },
    is_admin(state) {
      return state.user.role === 'admin' ? true : false
    },
    is_guide(state) {
      return state.user.role === 'guide' ? true : false
    },
    is_climber(state) {
      return state.user.role === 'climber' ? true : false
    },
    climber_step1_isSet(state) {
      return state.newUser.form.dob ? true : false
    },
    climber_step2_isSet(state) {
        return state.newUser.form.skills && state.newUser.form.skills.length ? true : false
    },
    climber_step3_isSet(state) {
        return state.newUser.form.bio ? true : false
    }
  },
  modules: {
    data,
    dropdown
  }
})
