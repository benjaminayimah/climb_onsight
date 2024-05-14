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
                <div v-if="user.email" class="flx ai-c gap-8">
                    <svg xmlns="http://www.w3.org/2000/svg" height="12" viewBox="0 0 30 24">
                        <path d="M30,6H6A3,3,0,0,0,3.015,9L3,27a3.009,3.009,0,0,0,3,3H30a3.009,3.009,0,0,0,3-3V9A3.009,3.009,0,0,0,30,6Zm0,6L18,19.5,6,12V9l12,7.5L30,9Z" transform="translate(-3 -6)" fill="gray"/>
                    </svg>
                    <a :href="'mailTo:'+user.email">{{ user.email }}</a>
                </div>
                <div v-if="user.phone_number" class="flx ai-c gap-8">
                    <svg xmlns="http://www.w3.org/2000/svg" height="16" viewBox="0 0 19 19">
                        <path d="M14.562,19a5.619,5.619,0,0,1-2.279-.554A20.584,20.584,0,0,1,6.944,14.8c-.613-.549-1.853-1.76-2.252-2.217A22.3,22.3,0,0,1,.566,6.694,5.392,5.392,0,0,1,0,4.423,3.337,3.337,0,0,1,.61,2.46,7.015,7.015,0,0,1,1.834,1.12,3.82,3.82,0,0,1,4.366,0l.058,0A2.513,2.513,0,0,1,5.9.753c.305.3,2.107,2.323,2.3,3.216A2.706,2.706,0,0,1,7.75,5.955l-.018.032c-.064.111-.142.229-.225.354a4.21,4.21,0,0,0-.412.719A9.394,9.394,0,0,0,8.332,9.146a14.234,14.234,0,0,0,2.049,1.987,8.462,8.462,0,0,0,1.508.855,4.088,4.088,0,0,0,.761-.425c.115-.075.223-.146.325-.206l.039-.022a3.067,3.067,0,0,1,1.532-.5,2.268,2.268,0,0,1,.466.049,11.923,11.923,0,0,1,3.222,2.246A2.388,2.388,0,0,1,19,14.648l0,.028c.073,1.749-1.964,3.392-2.457,3.708A3.326,3.326,0,0,1,14.562,19ZM4.283,1.584c-.816.008-2.075,1.3-2.327,1.708l-.021.036-.022.03a1.76,1.76,0,0,0-.331,1.065,3.857,3.857,0,0,0,.422,1.612l.014.031a21.031,21.031,0,0,0,3.844,5.457l.016.018C6.2,11.9,7.385,13.074,8,13.625a18.64,18.64,0,0,0,4.892,3.36l.029.012a4.087,4.087,0,0,0,1.641.419,1.75,1.75,0,0,0,1.069-.329l.028-.02.029-.018c.44-.266,1.744-1.5,1.728-2.293a.952.952,0,0,0-.3-.5l-.005-.005a13.458,13.458,0,0,0-2.436-1.815.67.67,0,0,0-.128-.013,1.691,1.691,0,0,0-.757.293l-.021.012c-.067.039-.16.1-.251.16a3.279,3.279,0,0,1-1.662.692,1.3,1.3,0,0,1-.443-.076l-.033-.013a9.964,9.964,0,0,1-1.908-1.063A15.6,15.6,0,0,1,7.108,10.15l-.018-.023a10.917,10.917,0,0,1-1.5-2.568L5.58,7.538C5.3,6.8,5.814,6.03,6.186,5.468c.069-.1.134-.2.174-.272l.014-.025c.207-.364.332-.6.281-.859A13.423,13.423,0,0,0,4.8,1.89,1.045,1.045,0,0,0,4.283,1.584Z" transform="translate(0 0)" fill="gray"/>
                    </svg>
                    <a :href="'tel:'+user.phone_number">{{ user.phone_number }}</a>
                </div>
                <span class="capitalize fs-08 br-16 booking-status bg-light">{{ user.role.replace(/_/g, " ") }}</span>
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