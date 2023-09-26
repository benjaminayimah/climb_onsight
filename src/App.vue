<template>
  <router-view/>
</template>
<script>
import { mapState } from 'vuex'
export default {
  name: 'App',
  computed: {
    ...mapState({
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
