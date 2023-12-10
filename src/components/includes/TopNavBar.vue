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
                    <div>Hello <strong>{{ computedFirstName(user.name) }}!</strong></div>
                </div>
            </div>
            <div class="flx gap-70">
                <ul class="flx gap-16 ai-c">
                    <button title="Refresh page" class="nav-dropdown-toggle br-50" @click="$store.dispatch('getAuthUser', token)">
                        <svg :class="{'rotate' : pageLoader }" xmlns="http://www.w3.org/2000/svg" height="18" viewBox="0 0 23.999 24">
                            <path d="M26.475,9.525A11.99,11.99,0,1,0,18,30a11.751,11.751,0,0,0,11.362-8.281c-.008.036.138-.848-1.11-1.177A1.58,1.58,0,0,0,26.475,21,9,9,0,1,1,18,9a8.872,8.872,0,0,1,6.33,2.67l-3.649,3.694s-.276.53,0,.857a.953.953,0,0,0,.757.279H28.4a2.282,2.282,0,0,0,1.238-.532A1.979,1.979,0,0,0,30,14.734V8.355a.98.98,0,0,0-.365-.959c-.489-.32-1.115.111-1.115.111Z" transform="translate(-6.015 -6)" fill="#595959"/>
                        </svg>
                    </button>
                    <settings-dropdown :id="'settings_dropdown'"/>
                    <notification-dropdown :id="'notification_dropdown'" :notification_count="notification_count" />
                    <profile-dropdown :id="'profile_dropdown'" :avatar="user.profile_picture" />
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
import { mapState } from 'vuex'
export default {
    name: 'TopNavBar',
    components: { SettingsDropdown, NotificationDropdown, ProfileDropdown },
    props: {
        device: String,
        user: Object,
        notification_count: Number,
        token: String
    },
    mixins: [userNameMixin],
    computed: {
        ...mapState({
            pageLoader: (state) => state.pageLoader
        })
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
    margin-left: -16px;
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

.rotate {
    animation: spin 1s infinite linear;
}
@keyframes spin{ 
  100%{transform: rotate(1turn)}
}
</style>