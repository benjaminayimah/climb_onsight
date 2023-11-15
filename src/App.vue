<template>
  <router-view/>
  <booking-modal v-if="booking" />
  <modal />
  <delete-modal v-if="deleteModal"  />
</template>
<script>
import { mapState } from 'vuex'
import DeleteModal from './components/includes/DeleteModal.vue'
import Modal from './components/layouts/Modal.vue'
import BookingModal from './views/climbers/BookingModal.vue'
export default {
  components: { Modal, BookingModal, DeleteModal },
  name: 'App',
  computed: {
    ...mapState({
      booking: (state) => state.bookingModal.active,
      deleteModal: (state) => state.deleteModal.active
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
