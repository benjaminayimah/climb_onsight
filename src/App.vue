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
    localStorage.getItem('auth') ? this.$store.dispatch('getAuthUser', localStorage.getItem('auth')) : ''
    window.addEventListener('resize', this.windowSize)
    document.addEventListener('visibilitychange', this.handleVisibilityChange);
  },
  methods: {
    windowSize() {
      setTimeout(()=> {
        this.$store.commit('computeWindow')
      }, 100)
    },
    handleVisibilityChange() {
      if (!document.hidden) {
        console.log(document.hidden)
        console.log(document.visibilityState)
        // window.location.reload();
      }
    }
  },
  beforeUnmount() {
    document.removeEventListener('resize', this.windowSize);
    document.removeEventListener('visibilitychange', this.handleVisibilityChange)
  },
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
