<template>
    <div class="flx jc-c">
        <div class="completed-card">
            <div v-if="!completed && !error" class="flx column ai-c gap-24">
                <lottie-loader :size="50" />
                <div class="flx column ai-c gap-16">
                    <h3>Payment successful</h3>
                    <div class="text-center comp-text">Finalizing your booking, please wait...</div>
                </div>
            </div>
            <div v-else-if="completed">
                <completed-anime />
                <div class="flx column ai-c gap-24">
                    <div>
                        <h2 class="text-center">Successful!</h2>
                        <p>
                            <strong>Thank you for booking this event with Climb Onsight.</strong>
                        </p>
                        <p>
                            You will be receiving an email receipt for the trip. Please chat with your Guide on our platform for any questions about your trip.
                        </p>
                        <p>
                            Climb Onsight is also here to support you as you get ready. We have a great and growing selection of <a href="https://climbonsight.ca/marketplace" target="_blank" class="a-link ft-warning">climbing merchandise that you should check out!</a>
                        </p>
                        <p>
                            Before your trip, consider whether you want to purchase travel insurance. <a href="https://climbonsight.ca/travel-insurance-for-climbing" target="_blank" class="a-link ft-warning">We drafted a blog post to provide you with a few options.</a>
                        </p>
                        <p>
                            Finally, please do not hesitate to reach out to us at <a class="a-link" href="mailto:srosenthal@climbonsight.ca">srosenthal@climbonsight.ca</a>
                        </p>
                        <p class="text-center">
                            <i>
                                On Belay? Belay On. Climbing!
                            </i>
                        </p>
                        <div class="flx jc-c">
                            <a href="/" class="button-primary a-button btn-md-lng">Done</a>
                        </div>
                    </div>
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
                this.$store.commit('updateNotifications', res.data.booking.id)
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
<style lang="css">
p {
    font-size: 1.14rem;
}
</style>