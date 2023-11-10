<template>
    <teleport v-if="prebook" to="body">
        <backdrop :index="401" :opacity="0.5" />
        <div class="modal-container jc-c ai-c">
            <div class="bg-white top-overlay-1 br-24 pd-24">
                <div>
                    <h3>Request a booking</h3>
                    <p class="mt-24">
                        Thank you for choosing our event. Before you proceed, please note the following:
                    </p>
                    <ul>
                        <li>Your booking will be reviewed and approved by our team.</li>
                        <li>Once approved, you will receive an email with a payment link to complete your booking.</li>
                        <li>Please make the payment to secure your spot at the event.</li>
                    </ul>
                    <p class="mb-24">
                        We're here to ensure a seamless experience for you. If you have any questions, feel free to contact us.
                    </p>
                </div>    
                <div class="flx gap-8 column">
                    <button @click="submitPreBooking" class="button-primary btn-md gap-8 w-100 btn-rounded" :class="{ 'button-disabled' : submiting }" :disabled="submiting ? true : false">
                        <spinner v-if="submiting" :size="18" />
                        <span>{{ submiting ? 'Submitting...' : 'Submit request' }}</span>
                    </button>
                    <button @click="cancelPreBooking" class="button-outline w-100 btn-rounded btn-md bg-transparent">Cancel</button>
                </div>
            </div>
        </div>
    </teleport>
    <teleport to="#modal_title">
        <div class="flx gap-8 ai-c">
            <span>{{ result.type === 'event' ? 'Event details' : 'Guides\' profile' }}</span>
            <div v-if="result.type === 'event' && bookingStatus">
                <booking-status :status="bookingStatus" />
            </div>
        </div>
    </teleport>
    <teleport to="#modal_content">
        <div class="modal-width">
            <profile-body v-if="result.type === 'guide'" :user="result.data" :guest="true"/>
            <event-body v-else-if="result.type === 'event'" :event="result.data" :guide="guide"/>
        </div>
    </teleport>
    <teleport to="#modal_footer">
        <div class="flx jc-fe gap-8">
            <booking-trigger-button :eventStatus="bookingStatus" :resultType="result.type" @booking-trigger="bookingTrigger" />
        </div>
    </teleport>
</template>

<script>
import axios from 'axios'
import alertMixin from '@/mixins/alertMixin'
import formatDateTime from '@/mixins/formatDateTime'
import inputValidation from '@/mixins/inputValidation'
import ProfileBody from '@/components/layouts/ProfileBody.vue'
import { mapState } from 'vuex'
import EventBody from '@/components/layouts/EventBody.vue'
import Backdrop from '@/components/includes/Backdrop.vue'
import Spinner from '@/components/includes/Spinner.vue'
import BookingTriggerButton from '@/components/includes/BookingTriggerButton.vue'
import BookingStatus from '@/components/includes/BookingStatus.vue'
export default {
    components: { ProfileBody, EventBody, Backdrop, Spinner, BookingTriggerButton, BookingStatus },
    name: 'ResultsModal',
    mixins: [inputValidation, formatDateTime, alertMixin],
    computed: {
        ...mapState({
            result: (state) => state.forms.tempStorage,
            hostname: (state) => state.hostname,
            token: (state) => state.token,
            bookings: (state) => state.bookings
        }),
        bookingStatus() {
            return this.bookings.find(event => event.event_id === this.result.data.id)
        }
    },
    data() {
        return {
            prebook: false,
            guide: {}
        }
    },
    methods: {
        bookingTrigger() {
            if(this.bookingStatus && this.bookingStatus.accepted) {
                this.$store.commit('triggerBooking', this.bookingStatus)
            }else {
                this.triggerPreBooking()
            }
        },
        triggerPreBooking() {
            this.prebook = true
        },
        cancelPreBooking() {
            this,this.prebook = false
        },
        getThisGuide(guide) {
            this.$store.dispatch('getThisGuide', guide)
            .then((res) => {
                this.guide = res.data
            })
        },
        async submitPreBooking() {
            this.startSpinner()
            try {
                const res = await axios.post(this.hostname+'/api/prebook-event/'+ this.result.data.id + '?token='+ this.token)
                this.showAlert('success', res.data.message)
                this.stopSpinner()
                this.prebook = false
                this.$store.commit('closeModal')
                this.$store.commit('updateBookings', res.data.bookings)
            } catch (e) {
                this.errorResponse(e)
                this.stopSpinner()
            }
        }
    },
    mounted() {
        this.$store.commit('stopFormLoader')
        this.getThisGuide(this.result.data.user_id)

    }
}
</script>

<style lang="scss" scoped>
.modal-width {
    width: 900px;
}
.profile-body-wrapper, .main-details-wrapper {
    padding: 0;
}
.modal-container {
    margin: 0 20px;
    position: fixed;
    inset: 0;
    display: flex;
    z-index: 402;
}
.top-overlay-1 {
    width: 500px;
}
li {
    list-style-type: disc; 
    list-style-position: inside; 
}

</style>