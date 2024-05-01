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
            <div>
                <!-- <a href="#" class="a-link">See all events</a> -->
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
        <!-- <div class="flx jc-sb ai-c">
            <div>
                <div class="gray">Customer ratings</div>
                <div>
                    <svg xmlns="http://www.w3.org/2000/svg" height="18" viewBox="0 0 105 17" fill="none">
                        <path d="M7.54894 2.92705C7.8483 2.00574 9.1517 2.00574 9.45106 2.92705L10.1839 5.18237C10.3177 5.5944 10.7017 5.87336 11.1349 5.87336L13.5063 5.87336C14.475 5.87336 14.8778 7.11297 14.0941 7.68237L12.1756 9.07624C11.8251 9.33088 11.6784 9.78225 11.8123 10.1943L12.5451 12.4496C12.8445 13.3709 11.79 14.137 11.0063 13.5676L9.08778 12.1738C8.7373 11.9191 8.2627 11.9191 7.91221 12.1738L5.99372 13.5676C5.21001 14.137 4.15553 13.3709 4.45488 12.4496L5.18768 10.1943C5.32155 9.78225 5.1749 9.33088 4.82441 9.07624L2.90592 7.68237C2.1222 7.11297 2.52498 5.87336 3.4937 5.87336L5.86509 5.87336C6.29832 5.87336 6.68227 5.5944 6.81614 5.18237L7.54894 2.92705Z" fill="#F2C37B"/>
                        <path d="M29.5489 2.92705C29.8483 2.00574 31.1517 2.00574 31.4511 2.92705L32.1839 5.18237C32.3177 5.5944 32.7017 5.87336 33.1349 5.87336L35.5063 5.87336C36.475 5.87336 36.8778 7.11297 36.0941 7.68237L34.1756 9.07624C33.8251 9.33088 33.6784 9.78225 33.8123 10.1943L34.5451 12.4496C34.8445 13.3709 33.79 14.137 33.0063 13.5676L31.0878 12.1738C30.7373 11.9191 30.2627 11.9191 29.9122 12.1738L27.9937 13.5676C27.21 14.137 26.1555 13.3709 26.4549 12.4496L27.1877 10.1943C27.3216 9.78225 27.1749 9.33088 26.8244 9.07624L24.9059 7.68237C24.1222 7.11297 24.525 5.87336 25.4937 5.87336L27.8651 5.87336C28.2983 5.87336 28.6823 5.5944 28.8161 5.18237L29.5489 2.92705Z" fill="#F2C37B"/>
                        <path d="M51.5489 2.92705C51.8483 2.00574 53.1517 2.00574 53.4511 2.92705L54.1839 5.18237C54.3177 5.5944 54.7017 5.87336 55.1349 5.87336L57.5063 5.87336C58.475 5.87336 58.8778 7.11297 58.0941 7.68237L56.1756 9.07624C55.8251 9.33088 55.6784 9.78225 55.8123 10.1943L56.5451 12.4496C56.8445 13.3709 55.79 14.137 55.0063 13.5676L53.0878 12.1738C52.7373 11.9191 52.2627 11.9191 51.9122 12.1738L49.9937 13.5676C49.21 14.137 48.1555 13.3709 48.4549 12.4496L49.1877 10.1943C49.3216 9.78225 49.1749 9.33088 48.8244 9.07624L46.9059 7.68237C46.1222 7.11297 46.525 5.87336 47.4937 5.87336L49.8651 5.87336C50.2983 5.87336 50.6823 5.5944 50.8161 5.18237L51.5489 2.92705Z" fill="#F2C37B"/>
                        <path d="M73.5489 2.92705C73.8483 2.00574 75.1517 2.00574 75.4511 2.92705L76.1839 5.18237C76.3177 5.5944 76.7017 5.87336 77.1349 5.87336L79.5063 5.87336C80.475 5.87336 80.8778 7.11297 80.0941 7.68237L78.1756 9.07624C77.8251 9.33088 77.6784 9.78225 77.8123 10.1943L78.5451 12.4496C78.8445 13.3709 77.79 14.137 77.0063 13.5676L75.0878 12.1738C74.7373 11.9191 74.2627 11.9191 73.9122 12.1738L71.9937 13.5676C71.21 14.137 70.1555 13.3709 70.4549 12.4496L71.1877 10.1943C71.3216 9.78225 71.1749 9.33088 70.8244 9.07624L68.9059 7.68237C68.1222 7.11297 68.525 5.87336 69.4937 5.87336L71.8651 5.87336C72.2983 5.87336 72.6823 5.5944 72.8161 5.18237L73.5489 2.92705Z" fill="#F2C37B"/>
                        <path d="M95.5489 2.92705C95.8483 2.00574 97.1517 2.00574 97.4511 2.92705L98.1839 5.18237C98.3177 5.5944 98.7017 5.87336 99.1349 5.87336L101.506 5.87336C102.475 5.87336 102.878 7.11297 102.094 7.68237L100.176 9.07624C99.8251 9.33088 99.6784 9.78225 99.8123 10.1943L100.545 12.4496C100.844 13.3709 99.79 14.137 99.0063 13.5676L97.0878 12.1738C96.7373 11.9191 96.2627 11.9191 95.9122 12.1738L93.9937 13.5676C93.21 14.137 92.1555 13.3709 92.4549 12.4496L93.1877 10.1943C93.3216 9.78225 93.1749 9.33088 92.8244 9.07624L90.9059 7.68237C90.1222 7.11297 90.525 5.87336 91.4937 5.87336L93.8651 5.87336C94.2983 5.87336 94.6823 5.5944 94.8161 5.18237L95.5489 2.92705Z" fill="#F2C37B"/>
                    </svg>
                </div>
            </div>
        </div> -->
        <user-body :user="guide" />
        <send-message-button :user="guide" />
    </div>
</template>

<script>
import UserBody from '@/components/layouts/UserBody.vue'
import SendMessageButton from '@/components/includes/SendMessageButton.vue'
import { mapState, mapGetters } from 'vuex'
export default {
    name: 'GuideDetails',
    components: { UserBody, SendMessageButton },
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