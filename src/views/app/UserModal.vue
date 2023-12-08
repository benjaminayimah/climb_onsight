<template>
    <teleport to="#modal_title">
        <div class="flx gap-4 ai-c">
            <span v-if="is_guide">{{ !user.accepted ? 'Approve request' : user.name }}</span>
            <span v-else>{{ user.name }}</span>
            <span>
                <booking-status v-if="is_guide" :guideView="true" :status="user" />
            </span>
        </div>
    </teleport>
    <teleport to="#modal_content">
        <div class="modal-width flx column gap-16 main-details-wrapper">
            <div class="flx jc-c">
                <img class="br-50 profile-img" :src="user.profile_picture ? s3bucket+'/'+user.profile_picture : default_avatar" :alt="user.name">
            </div>
            <user-body :user="user" />
        </div>
    </teleport>
    <teleport to="#modal_footer">
        <div class="text-center flx jc-c">
            <div v-if="is_guide && !user.paid && !user.accepted" class="flx gap-8">
                <button @click="acceptBooking" class="button-primary btn-md gap-8 btn-rounded" :class="{ 'button-disabled' : submiting }" :disabled="submiting ? true : false">
                    <spinner v-if="submiting" :size="20" :color="'#fff'" />
                    <span>{{ submiting ? 'Please wait...' : 'Accept' }}</span>
                </button>
                <button @click="declineBooking" class="button-outline btn-md gap-8 bg-transparent btn-rounded" :class="{ 'button-disabled' : declining }" :disabled="declining ? true : false">
                    <spinner v-if="declining" :size="20" :color="'#000'" />
                    <span>{{ declining ? 'Please wait...' : 'Decline' }}</span>
                </button>
            </div>
            <button v-else @click="$store.commit('closeModal')" class="button-primary btn-rounded btn-md-lng ">
                <span>Close</span>
            </button>
        </div>
    </teleport>
</template>

<script>
import axios from 'axios'
import userRolesMixin from '@/mixins/userRolesMixin'
import UserBody from '@/components/layouts/UserBody.vue'
import { mapState } from 'vuex'
import BookingStatus from '@/components/includes/BookingStatus.vue'
import Spinner from '@/components/includes/Spinner.vue'
import alertMixin from '@/mixins/alertMixin';
import inputValidation from '@/mixins/inputValidation';
export default {
    name: 'UserModal',
    components: { UserBody, BookingStatus, Spinner },
    mixins: [userRolesMixin, inputValidation, alertMixin],
    computed: {
        ...mapState({
            user: (state) => state.forms.tempStorage,
            s3bucket: (state) => state.s3bucket,
            default_avatar: (state) => state.data.default_avatar,
            hostname: (state) => state.hostname,
            token: (state) => state.token
        })
    },
    data() {
        return {
            declining: false
        }
    },
    methods: {
        async acceptBooking() {
            this.startSpinner()
            try {
                const res = await axios.post(this.hostname+'/api/accept-booking/'+ this.user.id + '?token='+ this.token)
                this.stopSpinner()
                this.showAlert('success', res.data.message)
                this.$store.commit('updateNotifications', res.data.booking.id)
                this.$store.commit('updateBooking', res.data.booking)
                this.$store.commit('closeModal')
            } catch (e) {
                this.errorResponse(e)
                this.stopSpinner()
            }
        },
        async declineBooking() {
            this.declining = true
            try {
                const res = await axios.post(this.hostname+'/api/decline-booking/'+ this.user.id + '?token='+ this.token)
                this.showAlert('success', res.data.message)
                this.$store.commit('updateNotifications', res.data.booking.id)
                this.$store.commit('deleteBooking', res.data.booking)
                this.$store.commit('closeModal')
            } catch (e) {
                this.errorResponse(e)
                this.declining = false
            }
        }
    },
    mounted() {
        this.$store.commit('stopFormLoader')
    }
}
</script>

<style lang="scss" scoped>
.modal-width {
    width: 560px;
}
.profile-img {
    width: 200px;
    height: 200px !important;
}
</style>