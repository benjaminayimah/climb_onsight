<template>
    <main class="home" :class="getDevice">
        <snack-bar-alert />
        <main-menu :user="user.id" :device="getDevice"/>
        <top-nav-bar :user="user" :device="getDevice" :notificaion_count="notificaion_count"/>
        <router-view />
    </main>
</template>
<script>
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