<template>
  <router-view/>
  <booking-modal v-if="booking" />
  <modal />
</template>
<script>
import { mapState } from 'vuex'
import Modal from './components/layouts/Modal.vue'
import BookingModal from './views/climbers/BookingModal.vue'
export default {
  components: { Modal, BookingModal },
  name: 'App',
  computed: {
    ...mapState({
      booking: (state) => state.bookingModal.active,
      token: (state) => state.token
    })
  },
  created() {
    this.$store.commit('computeWindow')
    window.addEventListener('resize', this.windowSize)
    localStorage.getItem('auth') ? this.$store.dispatch('getAuthUser', this.token) : ''
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
