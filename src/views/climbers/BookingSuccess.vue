<template>
    <div class="flx jc-c">
        <div class="completed-card">
            <div v-if="!completed && !error" class="flx column ai-c gap-24">
                <lottie-loader />
                <div class="flx column ai-c gap-16">
                    <h3>Payment successful</h3>
                    <div class="text-center comp-text">Finalizing your booking, please wait...</div>
                </div>
            </div>
            <div v-else-if="completed">
                <completed-anime />
                <div class="flx column ai-c gap-24">
                    <h2>Successful!</h2>
                    <div class="text-center comp-text">
                        Thank you for booking this event.
                    </div>
                    <a href="/" class="button-primary w-100 a-button btn-md">Done</a>
                </div>
            </div>
            <div v-else-if="error" class="flx column ai-c gap-16">
                <h3 class="ft-error">An error has occured</h3>
                An unknown error has occured. Please reach out to support. Thank you.
            </div>
        </div>
    </div>
</template>
<script>
import axios from 'axios'
import alertMixin from '@/mixins/alertMixin'
import { mapState } from 'vuex'
import LottieLoader from '@/components/lotties/LottieLoader.vue'
import CompletedAnime from '@/components/lotties/CompletedLottie.vue'
export default {
    components: { LottieLoader, CompletedAnime },
    mixins: [alertMixin],
    computed: {
        ...mapState({
            hostname: (state) => state.hostname,
            token: (state) => state.token,
        })
    },
    data() {
        return {
            completed: false,
            error: false
        }
    },
    methods: {
        async completeBooking() {
            try {
                const res = await axios.post(this.hostname + '/api/complete-booking?token='+this.token, {session_id: this.$route.params.session_id})
                this.completed = true
                this.$store.commit('updateBooking', res.data.booking)
            } catch (e) {
                this.showAlert('danger', e.response.data.message)
            }
        },
        goToEvent() {
            this.$router.push({name: 'RegisteredEvents'})
        },
    },
    mounted() {
        this.completeBooking()
    }
}
</script>