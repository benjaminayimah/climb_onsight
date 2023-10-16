<template>
    <a href="#" :id="id" @click.prevent="openDropdown(id)" class="u-a">
        <profile-avatar :avatar="avatar" />
    </a>
    <teleport to="body">
        <backdrop v-if="toggleMenu" @click="closeDropdown(id)" :index="100" :opacity="0.4" />
        <div v-if="toggleMenu" class="dropdown" :style="{ right: '3%', top: dynamicFloatingDiv.top+60 + 'px'}">
            <div class="flx jc-sb ai-c mb-8">
                <strong>Your profile</strong>
                <button @click="closeDropdown(id)" class="btn-close scale-in bg-transparent">
                    <svg xmlns="http://www.w3.org/2000/svg" height="10" viewBox="0 0 13.587 13.587">
                        <path d="M7.163,19.188,5.8,17.83,11.239,12.4,5.8,6.96,7.163,5.6,12.6,11.036,18.033,5.6,19.392,6.96,13.957,12.4l5.435,5.435-1.359,1.359L12.6,13.754Z" transform="translate(-5.805 -5.602)" fill="#1c1b1f"/>
                    </svg>
                </button>
            </div>
            <profile-body :user="computedUser"/>
        </div>
    </teleport>
</template>

<script>
import userRolesMixin from '@/mixins/userRolesMixin'
import dropdownToggleMixin from '@/mixins/dropdownToggleMixin'
import Backdrop from '../includes/Backdrop.vue'
import { mapState } from 'vuex'
import ProfileBody from '../layouts/ProfileBody.vue'
import ProfileAvatar from '../includes/ProfileAvatar.vue'
export default {
    components: { Backdrop, ProfileBody, ProfileAvatar },
    name: 'ProfileDropdown',
    props: {
        id: String,
        avatar: String
    },
    mixins: [dropdownToggleMixin, userRolesMixin],
    computed: {
        ...mapState({
            dynamicFloatingDiv: (state) => state.dropdown.dynamicFloatingDiv,
            user: (state) => state.user
        }),
        computedUser() {
            let user = this.user
            user.skills = JSON.parse(user.skills),
            user.activities = JSON.parse(user.activities),
            user.new_skills = JSON.parse(user.new_skills)
            return user
        },
        computedWidth() {
            return this.is_super ? '420px' : '60%'
        },
        computedHeight() {
            return this.is_super ? 'auto' : '80dvh'
        }
    }
}
</script>

<style lang="scss" scoped>
.dropdown{
    width: v-bind(computedWidth);
    border-radius: 16px;
    height: v-bind(computedHeight);
}
a{
    width: 52px;
    height: 52px;
}
</style>