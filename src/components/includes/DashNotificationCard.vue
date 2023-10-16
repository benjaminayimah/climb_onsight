<template>
    <div class="flx-grow-1 notification-card bg-white br-16">
        <div class="mb-8">New Notifications({{ notifications.length }})</div>
        <ul>
            <notification-list v-for="notification in notifications.slice(0, 5)" :key="notification.id" :notification="notification" :id="null" />
            <div class="text-center mt-16">
                <a href="#" class="a-link" v-if="notifications.length > 5">See all</a>
            </div>
        </ul>
    </div>
</template>
<script>
import { mapState } from 'vuex'
import NotificationList from './NotificationList.vue'
export default {
    components: { NotificationList },
    name: 'NotificationCard',
    computed: {
        ...mapState({
            notifications: (state) => state.notifications
        })
    }
}
</script>
<style lang="scss" scoped>
.notification-card {
    padding: 20px;
}
ul {
    margin: 0 -8px;
}
</style>