<template>
    <div class="flx-grow-1 notification-card bg-white br-16">
        <div class="mb-8">New Notifications({{ notifications.length }})</div>
        <ul class="h-100">
            <notification-list v-for="notification in notifications.slice(0, 5)" :key="notification.id" :notification="notification" :id="null" />
            <div class="text-center mt-16">
                <a href="#" class="a-link" v-if="notifications.length > 5">See all</a>
            </div>
            <div v-if="!notifications.length" class="centered empty-card">
                <div class="text-center">
                    <div>No Notification</div>
                    <span class="gray">New Notifications will appear here</span>
                </div>
            </div>
        </ul>
    </div>
</template>
<script>
import NotificationList from './NotificationList.vue'
export default {
    components: { NotificationList },
    name: 'NotificationCard',
    props: {
        notifications: Array
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
.empty-card {
    height: calc(100% - 90px);
}
</style>