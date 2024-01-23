<template>
    <main class="home" :class="getDevice">
        <snack-bar-alert />
        <main-menu :user="user" :device="getDevice"/>
        <top-nav-bar :user="user" :device="getDevice" :notification_count="notification_count" :token="token"/>
        <router-view />
    </main>
</template>
<script>
// import Pusher from 'pusher-js';

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
            notification_count: (state) => state.notifications.length
        }),
        ...mapGetters(['getDevice'])
    },
    mounted() {
        // Pusher.logToConsole = true;
        // const pusher = new Pusher('1945afb0db773039f050', {
        //     cluster: 'mt1',
        //     encrypted: true,
        // });
       
        // const channel = pusher.subscribe('chat-message')
        // channel.bind('NewChatMessage', data => {
        //     console.log('Received new chat message:', data)
        //     console.log('me')
        // })

        // setTimeout(()=> {
        //     console.log('Pusher connection status:', pusher.connection.state);
        //     console.log('Channel subscription status:', channel.subscribed);
        // }, 6000)
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