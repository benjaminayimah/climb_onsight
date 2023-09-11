<template>
    <main class="home" :class="getDevice">
        <main-menu :user="user.id" :device="getDevice" :avatar="avatar" />
        <top-nav-bar :user="user" :device="getDevice" :avatar="avatar" />
        <router-view />
        <!-- {{ user.id }} -->
    <button @click="delUser">Delete</button>
    </main>
</template>
<script>
import axios from "axios";
import { mapState, mapGetters } from 'vuex';
import MainMenu from '@/components/includes/MainMenu.vue';
import TopNavBar from '@/components/includes/TopNavBar.vue';
export default {
    components: { MainMenu, TopNavBar },
    name: 'AdminDashboard',
    computed: {
        ...mapState({
            user: (state) => state.user,
            hostname: (state) => state.hostname,
            token: (state) => state.token,
            avatar: (state) => state.data.default_avatar
        }),
        ...mapGetters(['getDevice'])
    },
    methods: {
        delUser() {
            const url = this.hostname + '/api/users/122'
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