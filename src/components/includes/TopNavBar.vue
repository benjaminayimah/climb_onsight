<template>
    <nav class="sticky" id="top_nav">
        <div class="flx jc-sb ai-c nav-wrapper">
            <div class="flx">
                <button class="hamburger-menu" @click.prevent="$store.commit('toggleMenu')" aria-expanded="false" aria-controls="menus" v-if="device == 'mobile'" id="mobile_menu_toggle">
                    <svg xmlns="http://www.w3.org/2000/svg" height="17" viewBox="0 0 25.143 19.533">
                        <path d="M2,18.234H24m-22-8.2H24M2,1.844H14.571" transform="translate(-0.429 -0.272)" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="3.143"/>
                    </svg>
                </button>
                <div v-else>
                    <div>Hello <strong>{{ computedFirstName(user.full_name) }}!</strong></div>
                </div>
            </div>
            <div class="flx gap-70">
                <ul class="flx gap-16 ai-c">
                    <settings-dropdown :id="'settins_dropdown'"/>
                    <notification-dropdown :id="'notification_dropdown'" :new_notification="computedNotifications" />
                    <profile-dropdown :id="'profile_dropdown'" :avatar="avatar" />
                </ul>
            </div>
        </div>
    </nav>
</template>

<script>
import userNameMixin from '@/mixins/userNameMixin'
import SettingsDropdown from '../dropdowns/SettingsDropdown.vue'
import NotificationDropdown from '../dropdowns/NotificationDropdown.vue'
import ProfileDropdown from '../dropdowns/ProfileDropdown.vue'
export default {
  components: { SettingsDropdown, NotificationDropdown, ProfileDropdown },
    name: 'TopNavBar',
    props: ['device', 'user', 'avatar'],
    mixins: [userNameMixin],
    data() {
        return {
            computedNotifications: false
        }
    }
}
</script>

<style lang="scss" scoped>
nav {
    container-type: inline-size;
    top: 0;
    padding: 16px 0 14px 0;
    z-index: 90;
    background-color: var(--bg-color);
    background-color: rgba(251, 247, 244, 0.7);
    backdrop-filter: saturate(180%) blur(20px);
    -webkit-backdrop-filter: saturate(180%) blur(20px);
}
.nav-wrapper{
    height: 60px;
}
button.hamburger-menu {
    padding: 16px;
    background-color: transparent;
    &:active {   
        background-color: var(--input-hover);
    }
}
@container (inline-size <= 548px) {
    span {
        display: none
    }
    .gap-50{
        gap: 30px
    }
}
</style>