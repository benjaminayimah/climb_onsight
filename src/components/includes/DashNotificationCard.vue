<template>
    <div class="flx-grow-1 notification-card bg-white br-16">
        <div class="mb-8">New Notifications({{ notifications.length }})</div>
        <ul>
            <notification-list v-for="notifiction in notifications.slice(0, 5)" :key="notifiction.id" />
            <div class="text-center mt-16">
                <a href="#" class="a-link">See all</a>
            </div>
        </ul>
    </div>
</template>
<script>
import NotificationList from './NotificationList.vue'
export default {
    components: { NotificationList },
    name: 'NotificationCard',
    data() {
        return {
            notifications: [
                {id: 1},
                {id: 2},
                {id: 3},
                {id: 4},
                {id: 5},
                {id: 6},
                {id: 7},
                {id: 8},
                {id: 9},
                {id: 0}
            ]
        }
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