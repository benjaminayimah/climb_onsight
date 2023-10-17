<template>
    <button class="nav-dropdown-toggle br-50 relative" :id="id" @click="openDropdown(id)">
        <svg xmlns="http://www.w3.org/2000/svg" height="18" viewBox="0 0 20 23.5">
            <path d="M-3271.98-1027.9a1,1,0,0,1,.2-1.4,1,1,0,0,1,1.4.2,2.751,2.751,0,0,0,4.4,0,1,1,0,0,1,1.4-.2,1,1,0,0,1,.2,1.4,4.723,4.723,0,0,1-3.8,1.9A4.721,4.721,0,0,1-3271.98-1027.9Zm-3.759-3.628a3.138,3.138,0,0,1-2.468-3.18,3.335,3.335,0,0,1,1.6-2.617c.844-.709,1.653-1.39,1.4-2.676-.5-4.2,2.654-7.965,6-8.448,0-.017,0-.035,0-.052a1,1,0,0,1,1-1,1,1,0,0,1,1,1,.465.465,0,0,1,0,.052c3.348.482,6.5,4.247,6,8.448-.257,1.287.544,1.961,1.382,2.667a3.394,3.394,0,0,1,1.617,2.625,3.177,3.177,0,0,1-2.468,3.18,23.019,23.019,0,0,1-7.532,1.028A23.018,23.018,0,0,1-3275.739-1031.528Z" transform="translate(3278.207 1049.5)" fill="#595959"/>
        </svg>
        <i v-if="notificaion_count > 0" class="bg-danger br-24 fs-08">{{ notificaion_count }}</i>
    </button>
    <teleport to="body">
        <backdrop v-if="toggleMenu" @click="closeDropdown(id)" :index="100" :opacity="0.4" />
        <div v-if="toggleMenu" class="dropdown" :style="{ top: dynamicFloatingDiv.top+60 + 'px'}">
            <div class="flx jc-sb ai-c mb-8">
                <strong>Notifications</strong>
                <button @click="closeDropdown(id)" class="btn-close scale-in bg-transparent">
                    <svg xmlns="http://www.w3.org/2000/svg" height="10" viewBox="0 0 13.587 13.587">
                        <path d="M7.163,19.188,5.8,17.83,11.239,12.4,5.8,6.96,7.163,5.6,12.6,11.036,18.033,5.6,19.392,6.96,13.957,12.4l5.435,5.435-1.359,1.359L12.6,13.754Z" transform="translate(-5.805 -5.602)" fill="#1c1b1f"/>
                    </svg>
                </button>
            </div>
            <ul>
                <notification-list v-for="notification in notifications.slice(0, 8)" :key="notification.id" :notification="notification" :id="id" @close-dropdown="closeDropdown" />
                <div class="text-center mt-16">
                    <a href="#" class="a-link" v-if="notifications.length > 8">See all</a>
                </div>
            </ul>
            <div v-if="!notifications.length" class="text-center">
                <div>No Notification</div>
                <span class="gray">New Notifications will appear here</span>
            </div>
        </div>
    </teleport>
</template>

<script>
import { mapState } from 'vuex';
import dropdownToggleMixin from '@/mixins/dropdownToggleMixin'
import Backdrop from '../includes/Backdrop.vue'
import NotificationList from '../includes/NotificationList.vue';
export default {
    components: { Backdrop, NotificationList },
    name: 'NotificationDropdown',
    props: {
        id: String,
        notificaion_count: Number
    },
    mixins: [dropdownToggleMixin],
    computed: {
        ...mapState({
            dynamicFloatingDiv: (state) => state.dropdown.dynamicFloatingDiv,
            notifications: (state) => state.notifications
        })
    }
}
</script>

<style lang="scss" scoped>
.dropdown{
    width: 350px;
    right: calc(68px + var(--main-padding));
}
ul {
    margin: 0 -12px;
}
</style>