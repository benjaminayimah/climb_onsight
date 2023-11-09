<template>
    <teleport to="body">
        <backdrop :index="401" :opacity="0.5" />
        <div class="modal-container jc-c ai-c">
            <div class="bg-white top-overlay br-24 pd-24">
                <div v-if="booking.page === 1">
                    <h3>Sign a waiver</h3>
                    <p class="mt-24">
                        All persons attending the trip must <strong>read</strong> and <strong>agree</strong> to the both Climb Onsight's terms and the Guide's terms.
                    </p>
                    <p>
                        <label for="cos_check" class="flx gap-8 ai-fs" data-type="input-wapper">
                            <input v-model="cos_check_box" type="checkbox" class="mt-6" id="cos_check">
                            <span>
                                I have read and agreed to Climb Onsight's <a href="https://climbonsight.ca/terms-and-conditions" class="ft-secondary a-link" target="_blank" onclick="return !window.open(this.href, 'Climb Onsight Terms & Conditions', 'width=700,height=800');">Terms and Conditions</a>
                            </span>
                        </label>
                    </p>
                    <p>
                        <label for="guide_check" class="flx ai-fs gap-8" data-type="input-wapper">
                            <input v-model="guide_check_box" type="checkbox" class="mt-6" id="guide_check">
                            <span>
                                I have read and agreed to the Guides's <a :href="s3bucket +'/'+ computedGuide" class="ft-secondary a-link" target="_blank" onclick="return !window.open(this.href, 'Guide Terms & Conditions', 'width=700,height=800');">Terms and Conditions</a>
                            </span>
                        </label>
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
                            <div>{{ booking.data.event_name }}</div>
                        </div>
                        <div class="flx column mb-8">
                            <label class="gray">Event date</label>
                            <div>{{ format_date(booking.data.start_date) }} <span class="gray">at</span> {{ format_time(booking.data.start_time)+'(EST)' }}</div>
                        </div>
                        <div class="flx column mb-8">
                            <label class="gray">Event price</label>
                            <strong>${{ booking.data.price }}</strong>
                        </div>
                    </div>
                </div>
                <div class="flx gap-8" :class="{ 'column' : booking.page !== 2}">
                    <button v-if="booking.page === 1" @click="nextPage(3)" class="button-primary btn-md gap-8 w-100 btn-rounded" :class="{ 'button-disabled' : !cos_check_box || !guide_check_box }" :disabled="!cos_check_box || !guide_check_box ? true : false">
                        <span>Continue</span>
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
</template>

<script>
import axios from 'axios'
import alertMixin from '@/mixins/alertMixin'
import formatDateTime from '@/mixins/formatDateTime'
import inputValidation from '@/mixins/inputValidation'
import { mapState } from 'vuex'
import Backdrop from '@/components/includes/Backdrop.vue'
import Spinner from '@/components/includes/Spinner.vue'
export default {
    components: { Backdrop, Spinner },
    name: 'BookingModal',
    mixins: [inputValidation, formatDateTime, alertMixin],
    computed: {
        ...mapState({
            s3bucket: (state) => state.s3bucket,
            hostname: (state) => state.hostname,
            token: (state) => state.token,
            booking: (state) => state.bookingModal
        }),
        computedGuide() {
            if(this.guide.guide_terms) {
                return JSON.parse(this.guide.guide_terms).url
            }else {
                return 'https://climbonsight.ca/terms-and-conditions'
            }
        }
    },
    data() {
        return {
            cos_check_box: false,
            guide_check_box: false,
            guide: {},
            form: {
                relist: false
            }
        }
    },
    methods: {
        relist(value) {
            this.form.relist = value
            this.nextPage(3)
        },
        cancelBooking() {
            this.booking.active = false
            this.booking.page = 1
        },
        nextPage(page) {
            this.$store.commit('nextBookingPage', page)
        },
        async submitBooking() {
            this.startSpinner()
            try {
                const res = await axios.post(this.hostname+'/api/attempt-payment/'+ this.booking.data.receipt_no + '?token='+ this.token, this.booking.data)
                location.href = res.data
            } catch (e) {
                this.errorResponse(e)
                this.stopSpinner()
            }
        },
        getThisGuide(guide) {
            this.$store.dispatch('getThisGuide', guide)
            .then((res) => {
                this.guide = res.data
            })
        }
    },
    mounted() {
        this.getThisGuide(this.booking.data.user_id)
    }
}
</script>

<style lang="scss" scoped>
.top-overlay {
    width: 400px;
}
.modal-container {
    margin: 0 20px;
    position: fixed;
    inset: 0;
    display: flex;
    z-index: 402;
}
</style>