<template>
    <teleport v-if="booking.active" to="body">
        <backdrop :index="401" :opacity="0.5" />
        <div class="modal-container jc-c ai-c">
            <div class="bg-white top-overlay br-24 pd-24">
                <div v-if="booking.page === 1" class="text-center">
                    <h3>Sign a waiver</h3>
                    <p class="mt-24">
                        Click on the button below to sign a liability waiver  on docusign.
                    </p>
                    <p class="mb-24">
                        Each person attending trip must sign a waiver before the trip.
                    </p>
                </div>
                <div v-else-if="booking.page === 2" class="text-center">
                    <h3>Relist?</h3>
                    <p class="mt-24 mb-24">
                        Would you be willing to open up your booking to the public? if another climber joins you on this trip you maybe to open to a partial discount based on group rates.
                    </p>
                </div>
                <div v-else-if="booking.page === 3">
                    <h3>Summary</h3>
                    <div class="mt-24 mb-24">
                        <div class="flx column mb-8">
                            <label class="gray">Event name</label>
                            <div>{{ result.data.event_name }}</div>
                        </div>
                        <div class="flx column mb-8">
                            <label class="gray">Event date</label>
                            <div>{{ format_date(result.data.date) }} <span class="gray">at</span> {{ format_time(result.data.start_time) }}</div>
                        </div>
                        <div class="flx column mb-8">
                            <label class="gray">Event price</label>
                            <strong>${{ result.data.price }}</strong>
                        </div>
                    </div>
                </div>
                <div class="flx gap-8" :class="{ 'column' : booking.page !== 2}">
                    <button v-if="booking.page === 1" @click="nextPage(2)" class="button-primary btn-md gap-8 w-100 btn-rounded">
                        <span>Sign waiver</span>
                    </button>
                    <button v-if="booking.page === 2" @click="relist(true)" class="button-primary btn-md gap-8 w-100 btn-rounded">
                        <span>Yes</span>
                    </button>
                    <button v-if="booking.page === 2" @click="relist(false)" class="button-neutral btn-md gap-8 w-100 btn-rounded">
                        <span>No</span>
                    </button>
                    <button v-if="booking.page === 3" @click="submitBooking" class="button-primary btn-md gap-8 w-100 btn-rounded" :class="{ 'button-disabled' : submiting }" :disabled="submiting ? true : false">
                        <spinner v-if="submiting" :size="18" />
                        <span>{{ submiting ? 'Redirecting...' : 'Proceed to payment' }}</span>
                    </button>
                    <button v-if="booking.page === 1 || booking.page === 3" @click="cancelBooking" class="button-outline w-100 btn-rounded btn-md bg-transparent">Cancel</button>
                </div>
            </div>
        </div>
    </teleport>
    <teleport to="#modal_title">
        {{ result.type === 'event' ? 'Event details' : 'Guides\' profile' }}
    </teleport>
    <teleport to="#modal_content">
        <div class="modal-width">
            <profile-body v-if="result.type === 'guide'" :user="result.data" :guest="true"/>
            <event-body v-else-if="result.type === 'event'" :event="result.data" />
        </div>
    </teleport>
    <teleport to="#modal_footer">
        <div class="flx jc-fe gap-8">
            <button @click="triggerBooking" class="button-primary btn-rounded btn-md" >
                <span>Book {{ result.type }}</span>
            </button>
        </div>
    </teleport>
</template>

<script>
import axios from 'axios'
import formatDateTime from '@/mixins/formatDateTime'
import inputValidation from '@/mixins/inputValidation'
import ProfileBody from '@/components/layouts/ProfileBody.vue'
import { mapState } from 'vuex'
import EventBody from '@/components/layouts/EventBody.vue'
import Backdrop from '@/components/includes/Backdrop.vue'
import Spinner from '@/components/includes/Spinner.vue'
export default {
    components: { ProfileBody, EventBody, Backdrop, Spinner },
    name: 'ResultsModal',
    mixins: [inputValidation, formatDateTime],
    computed: {
        ...mapState({
            result: (state) => state.forms.tempStorage,
            hostname: (state) => state.hostname,
            token: (state) => state.token
        }),
    },
    data() {
        return {
            form: {
                relist: false
            },
            booking: { active: false, page: 1 }
        }
    },
    methods: {
        triggerBooking() {
            this.booking.active = true
        },
        cancelBooking() {
            this.booking.active = false
            this.booking.page = 1
        },
        nextPage(page) {
            this.booking.page = page
        },
        async submitBooking() {
            this.startSpinner()
            try {
                const res = await axios.post(this.hostname+'/api/attempt-payment/'+ this.result.data.id + '?token='+ this.token, this.form)
                this.bookingSuccess(res.data)
                location.href = res.data
            } catch (e) {
                this.errorResponse(e)
                this.stopSpinner()
            }
        },
        relist(value) {
            this.form.relist = value
            this.nextPage(3)
        },
        bookingSuccess(res) {
            this.stopSpinner()
            console.log(res)
        }
    },
    mounted() {
        this.$store.commit('stopFormLoader')
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
.top-overlay {
    width: 400px;
}
</style>