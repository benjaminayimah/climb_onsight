<template>
    <teleport to="body">
        <backdrop :index="401" :opacity="0.5" />
        <div class="modal-container fixed flx jc-c ai-c">
            <div class="bg-white top-overlay br-24 pd-24 overflow-y-scroll scroll-hidden">
                <div v-if="booking.page === 1">
                    <h3>Sign waiver</h3>
                    <div v-if="!guide_waiver" class="mt-16 mb-16">
                        <div class="terms-banner br-16 centered pd-24">
                            <div class="text-center">
                                <h4>Climb Onsight Terms</h4>
                                <div class="fs-09">
                                    Please read the following terms and conditions. <br />
                                    <div>
                                        If you have any questions reach out to <a class="a-link fw-600" href="mailto:support@climbonsight.ca">support@climbonsight.ca</a>. To continue and accept the term, please enter your signature, name and click continue.
                                    </div>
                                    <li>
                                        <a class="a-link ft-secondary" href="https://climbonsight.ca/terms-and-conditions" target="_blank" onclick="return !window.open(this.href, 'Climb Onsight Terms & Conditions', 'width=700,height=800');">
                                            Climb Onsight Terms and Conditions
                                            <svg xmlns="http://www.w3.org/2000/svg" height="12" viewBox="0 0 14.5 14.5">
                                                <path d="M-3437.481-683.708a2,2,0,0,1-2-2v-8.25a2,2,0,0,1,2-2h4.5a.5.5,0,0,1,.5.5.5.5,0,0,1-.5.5h-4.5a1,1,0,0,0-1,1v8.25a1,1,0,0,0,1,1h8.249a1,1,0,0,0,1-1v-4.5a.5.5,0,0,1,.5-.5.5.5,0,0,1,.5.5v4.5a2,2,0,0,1-2,2Zm3.4-5.4a.5.5,0,0,1,0-.707l7.4-7.4h-3.293a.5.5,0,0,1-.5-.5.5.5,0,0,1,.5-.5h4.5a.5.5,0,0,1,.243.063h0l.009.005,0,0,.006,0,.006,0,0,0,.008.005h0a.491.491,0,0,1,.074.061.5.5,0,0,1,.146.379v4.475a.5.5,0,0,1-.5.5.5.5,0,0,1-.5-.5V-696.5l-7.4,7.4a.5.5,0,0,1-.354.147A.5.5,0,0,1-3434.085-689.1Z" transform="translate(3439.481 698.208)" fill="#d75e09"/>
                                            </svg>
                                        </a>
                                    </li>
                                </div>
                            </div>
                        </div>
                        <form @submit.prevent="" class="flx column gap-16">
                            <div class="form-row column">
                                <div class="input-wrapper">
                                    <input v-model="form.sign.signature" class="form-control" type="text" name="signature" id="signature" placeholder="Signature">
                                </div>
                                <span class="fs-09 gray">**Type your full name in place of the signature</span>
                            </div>
                            <div class="form-row column">
                                <label for="name">Name</label>
                                <div class="input-wrapper">
                                    <input v-model="form.sign.name" class="form-control" type="text" name="name" id="name">
                                </div>
                            </div>
                            <div class="form-row column">
                                <label for="date">Date</label>
                                <div class="input-wrapper">
                                    <input v-model="form.sign.date" class="form-control" type="date" id="date" name="date"/>
                                </div>
                            </div>
                        </form>
                        <label for="cos_waiver_check" class="flx gap-8 mt-8" data-type="input-wrapper">
                            <input v-model="cos_waiver_check" type="checkbox" id="cos_waiver_check">
                            I have read and accepted Climb Onsight terms
                        </label>
                    </div>
                    <div v-else class="mt-16 mb-16">
                        <div class="terms-banner br-16 centered pd-24">
                            <div class="text-center">
                                <h4>Guide's Waiver</h4>
                                <div class="fs-09">
                                    Please sign and accept the waiver below to continue the process. If you have any questions please contact your Guide.<br />
                                    <li>
                                        <a class="a-link ft-secondary" :href="s3bucket +'/'+ computedGuide" target="_blank" onclick="return !window.open(this.href, 'Guide Terms & Conditions', 'width=700,height=800');">
                                            Guide Waiver
                                            <svg xmlns="http://www.w3.org/2000/svg" height="12" viewBox="0 0 14.5 14.5">
                                                <path d="M-3437.481-683.708a2,2,0,0,1-2-2v-8.25a2,2,0,0,1,2-2h4.5a.5.5,0,0,1,.5.5.5.5,0,0,1-.5.5h-4.5a1,1,0,0,0-1,1v8.25a1,1,0,0,0,1,1h8.249a1,1,0,0,0,1-1v-4.5a.5.5,0,0,1,.5-.5.5.5,0,0,1,.5.5v4.5a2,2,0,0,1-2,2Zm3.4-5.4a.5.5,0,0,1,0-.707l7.4-7.4h-3.293a.5.5,0,0,1-.5-.5.5.5,0,0,1,.5-.5h4.5a.5.5,0,0,1,.243.063h0l.009.005,0,0,.006,0,.006,0,0,0,.008.005h0a.491.491,0,0,1,.074.061.5.5,0,0,1,.146.379v4.475a.5.5,0,0,1-.5.5.5.5,0,0,1-.5-.5V-696.5l-7.4,7.4a.5.5,0,0,1-.354.147A.5.5,0,0,1-3434.085-689.1Z" transform="translate(3439.481 698.208)" fill="#d75e09"/>
                                            </svg>
                                        </a>
                                    </li>
                                </div>
                            </div>
                        </div>
                        <form @submit.prevent="" class="flx column gap-16">
                            <div class="form-row column">
                                <div class="input-wrapper">
                                    <input v-model="form.sign.signature" class="form-control" type="text" name="signature" id="signature" placeholder="Signature">
                                </div>
                                <span class="fs-09 gray">**Type your full name in place of the signature</span>
                            </div>
                            <div class="form-row column">
                                <label for="name">Name</label>
                                <div class="input-wrapper">
                                    <input v-model="form.sign.name" class="form-control" type="text" name="name" id="name">
                                </div>
                            </div>
                            <div class="form-row column">
                                <label for="date">Date</label>
                                <div class="input-wrapper">
                                    <input v-model="form.sign.date" class="form-control" type="date" id="date" name="date"/>
                                </div>
                            </div>
                        </form>
                        <label for="guide_waiver_check" class="flx gap-8 mt-8" data-type="input-wrapper">
                            <input v-model="guide_waiver_check" type="checkbox" id="guide_waiver_check">
                            I have read and accepted the Guide's waiver
                        </label>
                    </div>
                    
                    <!-- <p class="mt-24">
                        All persons attending the trip must <strong>read</strong> and <strong>agree</strong> to the both Climb Onsight's terms and the Guide's terms.
                    </p>
                    <p>
                        <label for="cos_check" class="flx gap-8 ai-fs" data-type="input-wapper">
                            <input v-model="cos_check_box" type="checkbox" class="mt-6 flx-shrink-0" id="cos_check">
                            <span>
                                I have read and agreed to Climb Onsight's <a href="https://climbonsight.ca/terms-and-conditions" target="_blank" onclick="return !window.open(this.href, 'Climb Onsight Terms & Conditions', 'width=700,height=800');">Terms and Conditions</a>
                            </span>
                        </label>
                    </p>
                    <p>
                        <label for="guide_check" class="flx ai-fs gap-8" data-type="input-wapper">
                            <input v-model="guide_check_box" type="checkbox" class="mt-6 flx-shrink-0" id="guide_check">
                            <span>
                                I have read and agreed to the Guides's <a :href="s3bucket +'/'+ computedGuide" class="ft-secondary a-link" target="_blank" onclick="return !window.open(this.href, 'Guide Terms & Conditions', 'width=700,height=800');">Terms and Conditions</a>
                            </span>
                        </label>
                    </p> -->
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
                            <div class="gray">Event name</div>
                            <div>{{ booking.data.event_name }}</div>
                        </div>
                        <div class="flx column mb-8">
                            <div class="gray">Event date</div>
                            <div>{{ format_date(booking.data.start_date) }}</div>
                        </div>
                        <div class="flx column mb-8">
                            <div class="gray">Duration</div>
                            <div>{{ booking.data.event_duration }}</div>
                        </div>
                        <div class="flx column mb-8">
                            <div class="flx jc-sb ai-c bd-bt-dashed">
                                <div class="gray">Price per person</div>
                                <div>CA$ {{ computedPrice }}</div>
                            </div>
                            <div class="flx jc-sb ai-c bd-bt-dashed">
                                <div class="gray">Quantity</div>
                                <div>{{ booking.data.quantity }}</div>
                            </div>
                            <div class="flx jc-sb ai-c bd-bt-dashed">
                                <div class="gray">Total price</div>
                                <div class="fs-102rem"><strong>CA$ {{ Number(computedPrice * booking.data.quantity) }}</strong> + tax</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="flx gap-8 mb-16" :class="{ 'column' : booking.page !== 2}">
                    <button v-if="booking.page === 1 && !guide_waiver" @click="goToGuideWaiver" class="button-primary btn-md gap-8" :class="{ 'button-disabled2' : !form.sign.signature || !form.sign.name || !form.sign.date || !cos_waiver_check }" :disabled="!form.sign.signature || !form.sign.name || !form.sign.date || !cos_waiver_check ? true : false">
                        <span>Continue</span>
                    </button>
                    <button v-else-if="booking.page === 1 && guide_waiver" @click="booking.data.event_type === 'private' ? nextPage(2) : nextPage(3)" class="button-primary btn-md gap-8" :class="{ 'button-disabled2' : !form.sign.signature || !form.sign.name || !form.sign.date || !guide_waiver_check }" :disabled="!form.sign.signature || !form.sign.name || !form.sign.date || !guide_waiver_check ? true : false">
                        <span>Continue</span>
                    </button>
                    <button v-if="booking.page === 2" @click="relist(true)" class="button-primary w-100 btn-md gap-8">
                        <span>Yes</span>
                    </button>
                    <button v-if="booking.page === 2" @click="relist(false)" class="button-neutral w-100  btn-md gap-8">
                        <span>No</span>
                    </button>
                    <button v-if="booking.page === 3" @click="submitBooking" class="button-primary btn-md gap-8" :class="{ 'button-disabled' : submiting }" :disabled="submiting ? true : false">
                        <spinner v-if="submiting" :size="20" :color="'#fff'" />
                        <span>{{ submiting ? 'Initiating payment...' : 'Proceed to payment' }}</span>
                    </button>
                    <button v-if="booking.page === 1 || booking.page === 3" @click="cancelBooking" class="btn-sm bg-transparent">Cancel</button>
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
        computedPrice() {
            if(this.booking.data.event_type === 'private') {
                const price = JSON.parse(this.booking.data.price).find(item => item.id === this.booking.data.quantity -1)
                if(price)
                return price.price
                else
                return 0
            }else {
                return this.booking.data.price
            }
        },
        computedGuide() {
            return this.booking ? JSON.parse(this.booking.data.event_terms).url : ''
        }
    },
    data() {
        return {
            form: {
                sign: {
                    signature: '',
                    name: '',
                    date: new Date().toISOString().slice(0, 10),
                },
                event_id: '',
                relist: true
            },
            guide_waiver: false,
            cos_waiver_check: false,
            guide_waiver_check: false,
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
        goToGuideWaiver() {
            this.guide_waiver = true
            this.form.sign.signature = ''
            this.form.sign.name = ''
            this.form.sign.date = new Date().toISOString().slice(0, 10)

        },
        async submitBooking() {
            this.startSpinner()
            this.form.event_id = this.booking.data.event_id
            try {
                const res = await axios.post(this.hostname+'/api/attempt-payment/'+ this.booking.data.id + '?token='+ this.token, this.form)
                this.stopSpinner()
                location.href = res.data
            } catch (e) {
                this.errorResponse(e)
                this.stopSpinner()
            }
        }
    }
}
</script>

<style lang="scss" scoped>
.top-overlay {
    width: 500px;
    max-height: 80dvh;
}
.modal-container {
    margin: 0 20px;
    z-index: 402;
}
.terms-banner{
    min-height: 150px;
    background: #EDEDED;
}
.ft-secondary {
    color: #d75e09;
}
form {
    padding: 24px 0 8px 0;
}
li {
    color: #d75e09;

}
input.form-control {
    line-height: 1.6;
}
input#signature {
    padding-left: 0;
    padding-right: 0;
    border-radius: 0;
    border-left-width: 0;
    border-right-width: 0;
    border-top-width: 0;
}
.bd-bt-dashed {
    padding: 6px 0;
}
</style>