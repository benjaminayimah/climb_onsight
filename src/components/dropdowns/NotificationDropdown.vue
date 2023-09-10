<template>
    <button class="nav-dropdown-toggle br-50" :id="id" @click="openDropdown(id)">
        <svg xmlns="http://www.w3.org/2000/svg" height="18" viewBox="0 0 20 23.5">
            <path d="M-3271.98-1027.9a1,1,0,0,1,.2-1.4,1,1,0,0,1,1.4.2,2.751,2.751,0,0,0,4.4,0,1,1,0,0,1,1.4-.2,1,1,0,0,1,.2,1.4,4.723,4.723,0,0,1-3.8,1.9A4.721,4.721,0,0,1-3271.98-1027.9Zm-3.759-3.628a3.138,3.138,0,0,1-2.468-3.18,3.335,3.335,0,0,1,1.6-2.617c.844-.709,1.653-1.39,1.4-2.676-.5-4.2,2.654-7.965,6-8.448,0-.017,0-.035,0-.052a1,1,0,0,1,1-1,1,1,0,0,1,1,1,.465.465,0,0,1,0,.052c3.348.482,6.5,4.247,6,8.448-.257,1.287.544,1.961,1.382,2.667a3.394,3.394,0,0,1,1.617,2.625,3.177,3.177,0,0,1-2.468,3.18,23.019,23.019,0,0,1-7.532,1.028A23.018,23.018,0,0,1-3275.739-1031.528Z" transform="translate(3278.207 1049.5)" fill="#595959"/>
        </svg>
        <i v-if="new_notification" class="bg-primary br-50"></i>
    </button>
    <teleport to="body">
        <backdrop v-if="toggleMenu" @click="closeDropdown(id)" :index="100" :opacity="0.5" />
        <div v-if="toggleMenu" class="dropdown" :style="{ top: dynamicFloatingDiv.top+60 + 'px'}">
            <div>Notifications</div>
            {{dynamicFloatingDiv.left}}
        </div>
    </teleport>
</template>

<script>
import { mapState } from 'vuex';
import dropdownToggleMixin from '@/mixins/dropdownToggleMixin'
import Backdrop from '../includes/Backdrop.vue'
export default {
    components: { Backdrop },
    name: 'NotificationDropdown',
    props: ['id', 'new_notification'],
    mixins: [dropdownToggleMixin],
    computed: {
        ...mapState({
            dynamicFloatingDiv: (state) => state.dropdown.dynamicFloatingDiv
        })
    }
}
</script>

<style lang="scss" scoped>
.dropdown{
    width: 200px;
    position: fixed;
    background-color: #ffffff;
    z-index: 101;
    padding: 20px 0;
    box-shadow: 0 1px 15px 0 rgb(14 20 44 / 12%);
    border-radius: 16px;
    right: calc(68px + var(--main-padding));
}
</style>