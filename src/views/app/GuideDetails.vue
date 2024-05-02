<template>
    <div class="br-16 bg-white main-details-wrapper details-padding flx column gap-16">
        <div class="flx jc-sb ai-c">
            <h4>Guide Details</h4>
            <button v-if="guide.is_approved" @click="$store.commit('setDeleteModal', {id: guide.id, type: 'guide'})" class="button-danger btn-sm">Delete Guide</button>
            <button v-else @click="$store.commit('preSetTempData', {data: guide, modal: 'new_guide'})" class="button-primary btn-sm">Approve guide</button>
        </div>
        <img class="br-16 profile-img" :class="{'custom-color' : !guide.profile_picture}" :src="guide.profile_picture ? s3bucket+'/'+guide.profile_picture : default_avatar" :alt="guide.name">
        <div class="flx jc-sb ai-c">
            <h3>{{ guide.name }}</h3>
            <div v-if="guide.guides_link">
                <guides-link-button :link="guide.guides_link" />
            </div>
        </div>
        <div class="flx column gap-4">
            <div class="gray">Status</div>
            <div class="flx">
                <div class="flx guide-status gap-4 ai-c br-8" :class="guide.is_approved ? 'verified' : 'unverified'">
                    <span class="fs-09">{{ guide.is_approved ? 'Verified' : 'Unverified'}}</span>
                    <i>
                        <svg v-if="guide.is_approved" xmlns="http://www.w3.org/2000/svg" height="12" viewBox="0 0 12 10" fill="none">
                            <path d="M4.5853 8.02089L10.3203 2.28589L9.54932 1.52843L4.57177 6.49246L2.28589 4.19304L1.51491 4.96402L4.5853 8.02089ZM4.5853 9.54932L0 4.96402L2.28589 2.66461L4.5853 4.96402L9.5358 0L11.8623 2.27236L4.5853 9.54932Z" fill="#5AF9C0"/>
                        </svg>
                        <svg v-else xmlns="http://www.w3.org/2000/svg" height="13" viewBox="0 0 16.195 16.195">
                            <path d="M10.668,3.4l6.786,13.525H3.882L10.668,3.4Zm0-1.467a1.171,1.171,0,0,0-.963.706L2.793,16.411c-.53.942-.079,1.712,1,1.712H17.542c1.08,0,1.531-.77,1-1.712h0L11.631,2.634A1.17,1.17,0,0,0,10.668,1.928ZM11.68,15.086a1.012,1.012,0,1,1-1.012-1.012A1.012,1.012,0,0,1,11.68,15.086Zm-1.012-2.024A1.012,1.012,0,0,1,9.656,12.05V9.013a1.012,1.012,0,1,1,2.024,0V12.05A1.012,1.012,0,0,1,10.668,13.062Z" transform="translate(-2.571 -1.928)" fill="#ff3b3b"/>
                        </svg>
                    </i>
                </div>
            </div>
        </div>
        <user-body :user="guide" />
        <send-message-button :user="guide" />
    </div>
</template>

<script>
import UserBody from '@/components/layouts/UserBody.vue'
import SendMessageButton from '@/components/includes/SendMessageButton.vue'
import { mapState, mapGetters } from 'vuex'
import GuidesLinkButton from '@/components/includes/GuidesLinkButton.vue'
export default {
    name: 'GuideDetails',
    components: { UserBody, SendMessageButton, GuidesLinkButton },
    computed: {
        ...mapGetters(['getDevice']),
        ...mapState({
            s3bucket: (state) => state.s3bucket,
            default_avatar: (state) => state.data.default_avatar
        }),
        computedColor() {
            return this.guide.color
        }
    },
    props: {
        guide: Object
    },
    mounted() {
        this.getDevice == 'mobile' ? document.body.classList.add('fixed-body') : ''
    },
    unmounted() {
        document.body.classList.remove('fixed-body')
    }
}
</script>

<style lang="scss" scoped>
img.custom-color {
    background-color: v-bind(computedColor);
}
.profile-img {
    height: 300px;
}
</style>