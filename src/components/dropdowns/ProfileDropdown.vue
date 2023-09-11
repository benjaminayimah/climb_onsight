<template>
    <a href="#" :id="id" @click.prevent="openDropdown(id)" class="u-a">
        <div class="bg-img br-50" :style="{ backgroundImage: 'url('+avatar+')'}"></div>
    </a>
    <teleport to="body">
        <backdrop v-if="toggleMenu" @click="closeDropdown(id)" :index="100" :opacity="0.4" />
        <div v-if="toggleMenu" class="dropdown" :style="{ right: '3%', top: dynamicFloatingDiv.top+60 + 'px'}">
            <div class="flx jc-sb ai-c mb-8">
                <strong>Your profile</strong>
                <button @click="closeDropdown(id)" class="btn-close bg-transparent">
                    <svg xmlns="http://www.w3.org/2000/svg" height="10" viewBox="0 0 13.587 13.587">
                        <path d="M7.163,19.188,5.8,17.83,11.239,12.4,5.8,6.96,7.163,5.6,12.6,11.036,18.033,5.6,19.392,6.96,13.957,12.4l5.435,5.435-1.359,1.359L12.6,13.754Z" transform="translate(-5.805 -5.602)" fill="#1c1b1f"/>
                    </svg>
                </button>
            </div>
            <div class="grid grid-col-2 gap-32 overflow-y-scroll scroll-hidden profile-body-wrapper">
                <profile-body :user="computedUser"/>
            </div>
        </div>
    </teleport>
</template>

<script>
import dropdownToggleMixin from '@/mixins/dropdownToggleMixin'
import Backdrop from '../includes/Backdrop.vue'
import { mapState } from 'vuex'
import ProfileBody from '../layouts/ProfileBody.vue'
export default {
    components: { Backdrop, ProfileBody },
    name: 'ProfileDropdown',
    props: ['id', 'avatar'],
    mixins: [dropdownToggleMixin],
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
        }
    }
}
</script>

<style lang="scss" scoped>
.dropdown{
    width: 60%;
    border-radius: 16px;
    height: 80dvh;
}
.bg-img{
    width: 52px;
    height: 52px;
    transition: 0.3s ease;
    border: 1.5px solid #e1dedb;
    background-color: #ffffff;
}
@media screen and (max-width: 799px){
    .grid-col-2 {
        grid-template-columns: 1fr;
    }
}
</style>