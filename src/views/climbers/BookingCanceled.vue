<template>
    <div class="flx jc-c">
        <div class="completed-card flx column ai-c gap-32">
            <payment-canceled-anime />
            <div class="flx column ai-c gap-24">
                <h2>Payment is canceled</h2>
                <div class="text-center comp-text">
                    Your payment was canceled and your event has not been booked.
                </div>
                <div>
                    <router-link to="/" class="button-primary a-button btn-rounded a-btn btn-md-lng">Go home</router-link>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import alertMixin from '@/mixins/alertMixin';
import { mapState } from 'vuex';
import PaymentCanceledAnime from '@/components/lotties/PaymentCanceledAnime.vue'

export default {
    name: 'BookingCanceld',
    components: { PaymentCanceledAnime },
    mixins: [alertMixin],
    computed: {
        ...mapState({
            hostname: (state) => state.hostname,
            token: (state) => state.token
        })
    },
    methods: {
        async cancelBooking() {
            try {
                await axios.post(this.hostname + '/api/cancel-booking?token='+this.token, {session_id: this.$route.params.session_id})
            } catch (e) {
                this.showAlert('danger', e.response.data.message)
            }
        }
    },
    mounted() {
        this.cancelBooking()
    }
}
</script>

<style lang="scss" scoped>
.lottie-animation-container{
    margin-bottom: -32px;
}
</style>