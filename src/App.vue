<template>
  <router-view/>
  <main-page-loader v-if="pageLoader" />
  <booking-modal v-if="booking" />
  <modal />
  <delete-modal v-if="deleteModal" />
</template>
<script>
import { mapState } from 'vuex'
import DeleteModal from './components/includes/DeleteModal.vue'
import MainPageLoader from './components/includes/MainPageLoader.vue'
import Modal from './components/layouts/Modal.vue'
import BookingModal from './views/climbers/BookingModal.vue'
export default {
  components: { Modal, BookingModal, DeleteModal, MainPageLoader },
  name: 'App',
  computed: {
    ...mapState({
      booking: (state) => state.bookingModal.active,
      deleteModal: (state) => state.deleteModal.active,
      pageLoader: (state) => state.pageLoader
    })
  },
  created() {
    this.$store.commit('computeWindow')
    window.addEventListener('resize', this.windowSize)
    localStorage.getItem('auth') ? this.$store.dispatch('getAuthUser', localStorage.getItem('auth')) : ''
  },
  methods: {
    windowSize() {
      setTimeout(()=> {
        this.$store.commit('computeWindow')
      }, 100)
    }
  }
}
</script>
<style lang="scss">
*,
*:after,
*:before,
* {
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
}
</style>
