<template>
    <main class="home" :class="getDevice">
        <snack-bar-alert />
        <main-menu :user="user.id" :device="getDevice"/>
        <top-nav-bar :user="user" :device="getDevice" :notificaion_count="notificaion_count"/>
        <router-view />
        <!-- {{ user.id }} -->
    <!-- <button @click="delUser">Delete</button> -->
    </main>
</template>
<script>
import axios from "axios";
import { mapState, mapGetters } from 'vuex';
import MainMenu from '@/components/includes/MainMenu.vue';
import TopNavBar from '@/components/includes/TopNavBar.vue';
import SnackBarAlert from '@/components/includes/SnackBarAlert.vue';
export default {
    components: { MainMenu, TopNavBar, SnackBarAlert },
    name: 'AdminDashboard',
    computed: {
        ...mapState({
            user: (state) => state.user,
            hostname: (state) => state.hostname,
            token: (state) => state.token,
            notificaion_count: (state) => state.notifications.length
        }),
        ...mapGetters(['getDevice'])
    },
    methods: {
        delUser() {
            const url = this.hostname + '/api/users/132'
            const headers = {
                'Content-Type' : 'application/json',
                'Authorization' : `Bearer ${this.token}`
            };
            axios.delete(url, { headers })
            .then(res => {
                console.log(res)
            })
            .catch(e => {
                console.error(e.response)
            })
        }
    }
    
}
</script>
<style lang="scss" scoped>
main {
  position: relative;
  margin-left: calc(var(--nav-width) + var(--dash-padding)*2 + var(--aside-padding));
  padding: 0 var(--main-padding);
}
</style>