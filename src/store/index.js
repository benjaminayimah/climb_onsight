import { createStore } from 'vuex'
import axios from 'axios'
import data from './modules/data'
import country from './modules/country'
import color from './modules/color'
import dropdown from './modules/dropdown'
import router from '@/router'
export default createStore({
  state: {
    token: localStorage.getItem('auth') || null,
    user: JSON.parse(localStorage.getItem('user')) || {},
    newUser: JSON.parse(localStorage.getItem('newUser')) || '',
    newToken: localStorage.getItem('newToken') || null,
    alert: { status: { show: false, success: false, danger: false, warning: false, info: false }, body: '' },
    deleteModal: { active: false, deleting: false, id: '', type: '' },
    // hostname: 'http://127.0.0.1:8000',
    hostname: 'https://api.climbonsight.ca',
    s3bucket: 'https://s3.amazonaws.com/climbonsight.storage',
    windowWidth: '',
    current_location: '',
    menu: false,
    pageLoader: false,
    bookingModal: { active: false, page: 1, data: {} },
    updateForm: {},
    forms: {
      active: false,
      loader: false,
      modal: '',
      modal2: '',
      tempStorage: '',
      searchResults: [],
      searchResultsGuides: []
    },
    events: [],
    guides: [],
    climbers: [],
    bookings: [],
    payouts: [],
    balance: '',
    account: '',
    payment_options: [],
    admins: [],
    notifications: [],
    messages: [],
    messageTab: 'recent',
    contactOnly: false,
    chatUserDetails: false,
    loadingChats: false
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
      this.commit('setNewToken', payload.token)
    },
    setToken(state, payload) {
      localStorage.setItem('auth', payload)
      this.commit('removeNewUsers')
      state.token = payload
    },
    removeNewUsers() {
      localStorage.getItem('newUser') ? localStorage.removeItem('newUser') : ''
      localStorage.getItem('newGuide') ? localStorage.removeItem('newGuide') : ''
      localStorage.getItem('newToken') ? localStorage.removeItem('newToken') : ''
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
      state.bookings = payload.bookings
      state.admins = payload.admins
      state.payouts = payload.payouts
      state.balance = payload.balance
      state.account = payload.account
      state.messages = payload.messages
      payload.account ? state.payment_options = payload.account.external_accounts.data : ''
      this.commit('setEventResults', { guides: payload.guides, events: payload.events })
    },
    setNewToken(state, payload) {
      localStorage.setItem('newToken', JSON.stringify(payload))
      state.newToken = payload
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
      if(stored) {
        stored.dob = payload.dob
        stored.gender = payload.gender
        stored.tempImage = payload.tempImage
        localStorage.setItem('newUser', JSON.stringify(stored))
        state.newUser.dob = payload.dob
        state.newUser.gender = payload.gender
        state.newUser.tempImage = payload.tempImage
      }else {
          localStorage.setItem('newUser', JSON.stringify(payload))
          state.newUser = payload
      }
    },
    updateClimbingExp(state, payload) {
        let stored = JSON.parse(localStorage.getItem('newUser'))
        stored.skills = payload.skills
        stored.activities = payload.activities
        stored.type_yours = payload.type_yours
        localStorage.setItem('newUser', JSON.stringify(stored))
        state.newUser.skills = payload.skills
        state.newUser.activities = payload.activities
        state.newUser.type_yours = payload.type_yours

    },
    updateBio(state, payload) {
        let stored = JSON.parse(localStorage.getItem('newUser'))
        stored.bio = payload.bio
        localStorage.setItem('newUser', JSON.stringify(stored))
        state.newUser.bio = payload.bio
    },
    updateNewSkills(state, payload) {
        let inputString = payload.new_skills
        let dataArray = inputString.split(',')
        let stored = JSON.parse(localStorage.getItem('newUser'))
        stored.new_skills = dataArray
        localStorage.setItem('newUser', JSON.stringify(stored))
        state.newUser.new_skills = dataArray
    },
    setCurrentLocation(state, payload) {
      state.current_location = payload
    },
    toggleMenu(state) {
      state.menu = !state.menu
    },
    updateBookings(state, payload) {
      state.bookings = payload
    },
    updateBooking(state, payload) {
      const i =  state.bookings.findIndex(x => x.id == payload.id) 
      if(i > -1)
      state.bookings[i].paid = payload.paid
      state.bookings[i].accepted = payload.accepted
    },
    deleteBooking(state, payload) {
      state.bookings = state.bookings.filter(data => data.id !== payload.id)
    },
    addToEvent(state, payload) {
      state.events.push(payload)
      localStorage.removeItem('newEvent')
    },
    updateEvent(state, payload) {
      const i = state.events.findIndex(x => x.id === payload.id)
      state.events.splice(i, 1, payload)
      state.updateForm = {}
    },
    triggerBooking(state, payload) {
      state.bookingModal.active = true
      state.bookingModal.data = payload
    },
    cancelBooking(state) {
      state.bookingModal.active = false
      state.bookingModal.page = 1
      state.bookingModal.data = ''
    },
    nextBookingPage(state, payload) {
      state.bookingModal.page = payload
    },
    startPageLoader(state) {
      state.pageLoader = true
    },
    stopPageLoader(state) {
      state.pageLoader = false
    },
    setMessageTab(state, payload) {
      state.messageTab = payload
      if(payload !== 'recent') {
          state.contactOnly = true
      }else {
          state.contactOnly = false
      }
    },
    setMessages(state, payload) {
      state.messages = payload
    },
    updateMessages(state, payload) {
      if (state.messages.length) {
        const i = state.messages.findIndex(x => x.message.id == payload.id)
        state.messages[i].message = payload
      }
    },
    toggleChatUserDetails(state) {
      state.chatUserDetails = !state.chatUserDetails
    },
    closeChatUserDetails(state) {
      state.chatUserDetails = false
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
    startLoadingChats(state) {
      state.loadingChats = true
    },
    stopLoadingChats(state) {
      state.loadingChats = false
    },
    // modals
    async openModal(state, payload) {
      state.forms.loader = true
      await this.commit('activateModal')
      document.body.classList.add('fixed-body')
      state.forms.modal = payload
    },
    activateModal(state) {
      state.forms.active = true
    },
    closeModal(state) {
      state.forms.active = false
      if(state.forms.modal === 'event_edit') {
        router.push({ name: 'UpcomingEvents', query: { current: state.forms.tempStorage.id, origin: 'UpcomingEvents'}})
      }
      state.forms.modal = ''
      state.forms.modal2 = ''
      state.forms.tempStorage = ''
      document.body.classList.remove('fixed-body')
    },
    async preSetTempData(state, payload) {
      await this.commit('setTempData', payload.data)
      this.commit('openModal', payload.modal)
    },
    setTempData(state, payload) {
      state.forms.tempStorage = payload
    },
    async setUpdatePermissions(state, payload) {
      await this.commit('setTempData', payload)
      state.forms.modal2 = 'permissions'
      this.commit('openModal', 'add_admin')
    },
    updateNotifications(state, payload) {
      state.notifications = state.notifications.filter(data => data.id !== payload)
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
      state.notifications = state.notifications.filter(data => data.id !== payload)
      state.guides = state.guides.filter(data => data.id !== payload)
      if(router.currentRoute.value.query.origin === 'Guides' && router.currentRoute.value.query.id) {
        router.push({ name: 'Guides'})
      }
    },
    destroyToken(){
      localStorage.removeItem('auth')
      localStorage.removeItem('user')
      location.reload()
    },
    setEventResults(state, payload) {
      state.searchResults = payload.events
      state.searchResultsGuides = payload.guides
    },
    setSomeEvents(state) {
      state.searchResults = state.events
    },
    addToAdmins(state, payload) {
      state.admins.push(payload)
    },
    updateToAdmins(state, payload) {
      const i = state.admins.findIndex(x => x.id === payload.id)
      state.admins.splice(i, 1, payload)
    },
    deleteAdmin(state, payload) {
      const i = state.admins.findIndex(x => x.id == payload)
      state.admins.splice(i, 1);
    },
    deleteGuide(state, payload) {
      const i = state.guides.findIndex(x => x.id == payload)
      state.guides.splice(i, 1);
      if(router.currentRoute.value.query.origin === 'Guides' && router.currentRoute.value.query.id) {
        router.push({ name: 'Guides'})
      }
    },
    deleteClimber(state, payload) {
        const i = state.climbers.findIndex(x => x.id == payload)
        state.climbers.splice(i, 1);
        if(router.currentRoute.value.query.origin === 'Climbers' && router.currentRoute.value.query.id) {
          router.push({ name: 'Climbers'})
        }
    },
    deleteEvent(state, payload) {
      router.push({ name: 'UpcomingEvents', query: { type: router.currentRoute.value.query.type}})
      const i = state.events.findIndex(x => x.id == payload)
      state.events.splice(i, 1);
    },
    //update event

    updateTempStorage1(state, payload) {
      state.updateForm.event_name = payload.event_name
      state.updateForm.start_date = payload.start_date
      state.updateForm.end_date = payload.end_date
      state.updateForm.event_duration = payload.event_duration
      state.updateForm.repeat = payload.repeat
      state.updateForm.repeat_at = payload.repeat_at
    },
    updateTempStorage2(state, payload) {
      state.updateForm.category = payload.category
      state.updateForm.address = payload.address
      state.updateForm.latitude = payload.latitude
      state.updateForm.longitude = payload.longitude
      state.updateForm.gallery = payload.gallery
    },
    updateTempStorage3(state, payload) {
      state.updateForm.attendance_limit = payload.attendance_limit
      state.updateForm.event_type = payload.event_type
      state.updateForm.price = payload.price
      state.updateForm.price_range = payload.price_range
      state.updateForm.event_description = payload.event_description
    },
    updateTempStorage4(state, payload) {
      let guideGearString = payload.guide_gears
      let guideGearArray = guideGearString.split(',')
      let climberGearString = payload.guide_gears
      let climberGearArray = climberGearString.split(',')
      state.updateForm.guide_gears = guideGearArray
      state.updateForm.climber_gears = climberGearArray
      state.updateForm.faqs = payload.faqs
      state.updateForm.experience_required = payload.experience_required
      state.updateForm.itinerary = payload.itinerary
      state.updateForm.event_terms = payload.event_terms
      state.updateForm.terms_type = payload.terms_type
      state.updateForm.terms_link = payload.terms_link
      
    },
    //set delete
    setDeleteModal(state, payload) {
      document.body.classList.add('fixed-body')
      state.deleteModal.active = true
      state.deleteModal.id = payload.id
      state.deleteModal.type = payload.type  
    },
    closeDeleteModal(state) {
      for (let i in state.deleteModal) {
        state.deleteModal[i] = false
      }
      document.body.classList.remove('fixed-body')
    },
    doDelete(state) {
      state.deleteModal.deleting = true
      const id = state.deleteModal.id
      const type = state.deleteModal.type
      if(type === 'admin' || type === 'guide' || type === 'climber'){
        this.dispatch('deleteUser', {id: id, type: type})
      }else if(type === 'event') {
        this.dispatch('deleteEvent', id)
      }
      else{
        this.commit('closeDeleteModal')
      }
    },
  },
  actions: {
    async signIn(state, payload) {
        return await axios.post(this.getters.getHostname + '/api/sign-in', payload)
    },
    getAuthUser(state, token) {
      state.commit('dismisAlert')
      state.commit('startPageLoader')
      const url = this.getters.getHostname + '/api/user?token=' + token
      axios.get(url)
      .then((res) => {
        state.commit('setUserData', res.data)
        state.commit('stopPageLoader')
      })
      .catch(e => {
        if(e.response) {
          if(e.response.status == 400 || e.response.status == 404 ) {
            state.commit('destroyToken')
          }else {
            state.commit('showAlert', {status: 'danger', body: 'Unable to fetch user data'})
          }
        }else {
          const payload = {
            status: 'danger',
            body: 'An unknown error has occured. Please check your internet connection.'
          };
          state.commit('showAlert', payload)
        }
        state.commit('stopPageLoader')
      })
    },
    async getThisGuide(state, payload) {  
      return await axios.get(this.getters.getHostname + '/api/get-this-guide/'+payload+'?token='+this.getters.getToken)
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
    getCucrrentLocation(state, payload) {
      const apiKey = 'AIzaSyBhfD_dScS-ENmuXtQAxTCxtOYadquTric' // Your Google Cloud Platform API key
      const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${payload.lat},${payload.lng}&key=${apiKey}`
      fetch(url)
        .then(response => response.json())
        .then(data => {
          const address = data.results[0].formatted_address
          state.commit('setCurrentLocation', address)
        })
    },
    async deleteUser(state, payload) {
      try {
        const res = await axios.delete(this.getters.getHostname+'/api/delete-user/'+payload.id+'?token='+this.getters.getToken)
        state.commit('closeDeleteModal')
        const alertPayload = {
            status: 'success',
            body: payload.type.charAt(0).toUpperCase() + payload.type.slice(1) + ' is deleted'
        };
        state.commit('showAlert', alertPayload)
        if(payload.type === 'admin') {
          state.commit('deleteAdmin', res.data)
        }else if(payload.type === 'guide') {
          state.commit('deleteGuide', res.data)
        }else if(payload.type === 'climber') {
          state.commit('deleteClimber', res.data)
        }
      } catch (e) {
        const payload = {
            status: 'danger',
            body: e.response ? e.response.data.message : 'An unknown error has occured. Please check your credentials or network connection.'
        };
        state.commit('showAlert', payload)
        state.commit('closeDeleteModal')

      }
    },
    async deleteEvent(state, payload) {
      try {
        const res = await axios.delete(this.getters.getHostname+'/api/event/'+payload+'?token='+this.getters.getToken);
        state.commit('closeDeleteModal')
        const alertPayload = {
            status: 'success',
            body: res.data.message
        };
        state.commit('showAlert', alertPayload)
        state.commit('deleteEvent', res.data.id)
      } catch (e) {
        const payload = {
            status: 'danger',
            body: e.response ? e.response.data.message : 'An unknown error has occured. Please check your credentials or network connection.'
        };
        state.commit('showAlert', payload)
        state.commit('closeDeleteModal')
      }
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
    climber_token_isSet(state) {
      return state.newToken ? true : false
    },
    climber_step1_isSet(state) {
      return state.newUser && state.newUser.dob ? true : false
    },
    climber_step2_isSet(state) {
        return (state.newUser.skills && state.newUser.skills.length) || state.newUser.type_yours ? true : false
    },
    // climber_step3_isSet(state) {
    //     return state.newUser.bio ? true : false
    // }
  },
  modules: {
    data,
    dropdown,
    country,
    color
  }
})
