<template>
    <div class="chat-user-details overflow-y-scroll scroll-hidden relative">
        <button @click="$store.commit('closeChatUserDetails')" class="btn-close scale-in bg-transparent absolute">
            <svg xmlns="http://www.w3.org/2000/svg" height="10" viewBox="0 0 13.587 13.587">
                <path d="M7.163,19.188,5.8,17.83,11.239,12.4,5.8,6.96,7.163,5.6,12.6,11.036,18.033,5.6,19.392,6.96,13.957,12.4l5.435,5.435-1.359,1.359L12.6,13.754Z" transform="translate(-5.805 -5.602)" fill="#1c1b1f"/>
            </svg>
        </button>
        <div class="pd-32 flx column gap-32">
            <div class="centered profile gap-4">
                <profile-avatar :avatar="user.profile_picture" :color="user.color"/>
                <div class="fw-600">{{ user.name }}</div>
                <div>{{ user.email }}</div>
                <div>{{ user.phone_number }}</div>
                <span class="fs-09 gray capitalize">{{ user.role.replace(/_/g, " ") }}</span>
            </div>
        </div>
    </div>
</template>

<script>
import ProfileAvatar from '@/components/includes/ProfileAvatar.vue'
import { mapState } from 'vuex'
export default {
    name: 'ChatUserDetails',
    components: { ProfileAvatar },
    props: {
        user: Object
    },
    computed: {
        ...mapState({
            climbers: (state) => state.climbers,
        })
    }
}
</script>

<style lang="scss" scoped>
.chat-user-details{
    width: 360px;
}

.profile {
    img {
        height: 120px;
        width: 120px;
    }
}
ul {
    img {
        height: 55px;
        width: 55px;
    }
}
.btn-close {
    inset: 20px 20px auto auto;
}
</style>