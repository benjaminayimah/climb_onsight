<template>
    <a href="#" @click.prevent="doClick" class="bg-img br-16 flx-1 relative user-list transition-sm" :class="{'list-is-active' : $route.query.id == user.id}">
        <img :class="{'custom-color' : !user.profile_picture}" :src="user.profile_picture ? s3bucket+'/'+user.profile_picture : default_avatar" :alt="user.name" />
        <div class="user-footer absolute br-16 flx jc-sb ai-c">
            <div class="flx column">
                <div class="fs-09">
                    <span class="wrap-text wrap-line-1">
                        {{ user.name }}
                    </span>
                </div>
                <span class="fs-08">View profile</span>
            </div>
            <div v-if="user.role === 'guide' && !user.is_approved" class="flx guide-status gap-4 ai-c br-16">
                <svg xmlns="http://www.w3.org/2000/svg" height="13" viewBox="0 0 16.195 16.195">
                    <path d="M10.668,3.4l6.786,13.525H3.882L10.668,3.4Zm0-1.467a1.171,1.171,0,0,0-.963.706L2.793,16.411c-.53.942-.079,1.712,1,1.712H17.542c1.08,0,1.531-.77,1-1.712h0L11.631,2.634A1.17,1.17,0,0,0,10.668,1.928ZM11.68,15.086a1.012,1.012,0,1,1-1.012-1.012A1.012,1.012,0,0,1,11.68,15.086Zm-1.012-2.024A1.012,1.012,0,0,1,9.656,12.05V9.013a1.012,1.012,0,1,1,2.024,0V12.05A1.012,1.012,0,0,1,10.668,13.062Z" transform="translate(-2.571 -1.928)" fill="#ff3b3b"/>
                </svg>
            </div>
            <!-- <div v-if="redirect">
                <button @click.prevent="handleChat" class="br-50 bg-black centered send-msg-button__icon">
                    <svg xmlns="http://www.w3.org/2000/svg" height="11.389" viewBox="0 0 12.324 11.389">
                        <path d="M14.007,3.546a2.161,2.161,0,0,1,.176,1.388,6.829,6.829,0,0,1-.392,1.375,18.349,18.349,0,0,1-1.607,3.1,16.961,16.961,0,0,1-2.17,2.8,6.306,6.306,0,0,1-1.172.953,2.382,2.382,0,0,1-1.432.391h0a1.949,1.949,0,0,1-.234-.04l-.007,0a1.7,1.7,0,0,1-.78-.439,3.3,3.3,0,0,1-.482-.588,6.2,6.2,0,0,1-.682-1.447A5.834,5.834,0,0,1,5,10.142a1.234,1.234,0,0,1,.527-1.159l2.174-1.5a.26.26,0,0,0-.26-.449L5.051,8.154a1.288,1.288,0,0,1-1.343-.147,5.89,5.89,0,0,1-.654-.658,5.836,5.836,0,0,1-.91-1.423,2.985,2.985,0,0,1-.229-.79,1.643,1.643,0,0,1,.149-.97h0a2.444,2.444,0,0,1,1.07-.984,6.666,6.666,0,0,1,1.41-.517,17.615,17.615,0,0,1,3.5-.475,18.274,18.274,0,0,1,3.469.148,6.664,6.664,0,0,1,1.382.347A2.131,2.131,0,0,1,14.007,3.546Z" transform="translate(-1.898 -2.167)" fill="#fff"/>
                    </svg>
                </button>
            </div> -->
        </div>
    </a>
</template>

<script>
import { mapState } from 'vuex'
export default {
    name: 'UserList',
    props: {
        user: Object,
        climber: Boolean,
        redirect: Boolean
    },
    computed: {
        ...mapState({
            s3bucket: (state) => state.s3bucket,
            default_avatar: (state) => state.data.default_avatar
        }),
        computedColor() {
            return this.user.color
        }
    },
    methods: {
        doClick() {
            if(this.redirect) {
                this.$router.push({ name: this.climber ? 'Climbers' : 'Guides', query: { id: this.user.id, origin: this.$route.name}})

            }else {
                this.$store.commit('preSetTempData', { data: this.user, modal: 'view_user'})
            }
        },
        handleChat() {
            this.$router.push({ name: 'ChatDetails', params: { recipient_id: this.user.id, recipient_name: this.user.name }, replace: true})
        }
    }
}
</script>

<style lang="scss" scoped>
a {
    height: 220px;
    min-width: 180px;
    &:hover:not(.list-is-active) {
        box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
    }
}
.user-footer{
    padding: 8px 10px;
    background-color: rgba(0, 0, 0, 0.17);
    backdrop-filter: saturate(180%) blur(26px);
    -webkit-backdrop-filter: saturate(180%) blur(20px);
    color: var(--white);
    inset: auto 0 0 0;
}
span {
    color: #ffffff;
    &:hover {
        color: #fff;
        text-decoration: underline;
    }
}
img.custom-color {
    background-color: v-bind(computedColor);
}
.guide-status {
    background-color: #fff;
    padding-top: 4px;
    padding-bottom: 5px;
}
</style>