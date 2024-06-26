<template>
    <teleport v-if="prebook" to="body">
        <backdrop :index="401" :opacity="0.5" />
        <div class="modal-container flx jc-c ai-c fixed">
            <div class="bg-white top-overlay-1 flx column gap-24 br-24 pd-24 overflow-y-scroll scroll-hidden">
                <h3 class="text-center">{{ bookingSuccess ? 'Request submitted' : 'Request to book'}}</h3>
                <div v-if="!bookingSuccess" class="flx column gap-24">
                    <div>
                        <form class="flx column gap-24">
                            <div v-if="result.repeat_at" class="form-row column relative">
                                <div>This event takes place <strong>{{ result.repeat_at }},</strong> please select from the available dates.</div>
                                <div class="flx jc-sb ai-c">
                                    <div class="label">Pick a date</div>
                                    <span class="gray fs-08">
                                        <span class="flx gap-4 ai-">Available dates in<span class="br-50 blue"></span>
                                            <span class="ft-vuecal">Blue</span>
                                        </span>
                                    </span>
                                </div>
                                <calendar-dropdown :id="'vuecal_dropdown'"
                                    :date="form.date"
                                    :event="result"
                                    :validation="validation"
                                    :limit="computedBookingLimit"
                                    :fetching_slots="fetching_available_slots"
                                    @cal-change="calChange"
                                />
                            </div>
                            <div class="form-row column">
                                <spinner v-if="!result.repeat_at && fetching_available_slots" :size="16" :color="'#7f7e7e'" />
                                <div v-else-if="!result.repeat_at && !fetching_available_slots" class="fs-09" :class="computedBookingLimit > 0 ? 'ft-warning' : 'ft-danger'"><strong>{{ computedBookingLimit > 0 ? '***Only '+computedBookingLimit+ ' slots available***' : '***Sorry NO slot available***'}}</strong></div>
                                <label for="quantity">Quantity</label>
                                <div class="input-wrapper">
                                    <input v-model="form.quantity" @input="sliceInput" class="br-16 w-100 form-control" type="number" min="1" :max="computedBookingLimit" id="quantity" name="quantity" :disabled="computedBookingLimit < 1 || fetching_available_slots"  :class="[{ 'error-border': validation.errors.quantity }, fetching_available_slots ? 'disabled-input' : '']" />
                                </div>
                                <span class="input-error" v-if="validation.error && validation.errors.quantity">
                                    {{ validation.errors.quantity[0] }}
                                </span>
                            </div>
                            <div class="flx gap-8 column">
                                <div>
                                    <h3>Attendees info</h3>
                                    <div>Please provide details of all persons attending this event respectively.</div>
                                </div>
                                <attendee-booking-row v-for="(attendee, index) in computedAttendees"
                                    :key="index"
                                    :index="index"
                                    :validation="validation"
                                    :attendees="form.attendees"
                                    :limit="computedBookingLimit"
                                    @add-attendee-input="addAttendeeInput"
                                />
                                <span class="input-error" v-if="validation.error && validation.errors.attendees">
                                    {{ validation.errors.attendees[0] }}
                                </span>
                            </div>
                        </form>
                        <hr />
                        <div>
                            <h3>Price</h3>
                            <div class="flx jc-sb ai-c bd-bt-dashed">
                                <div>Price per person</div>
                                <div>{{ formatAmount(computedPrice) }}</div>
                            </div>
                            <div class="flx jc-sb ai-c bd-bt-dashed">
                                <div>Total price</div>
                                <div class="fs-102rem"><strong>{{ formatAmount(Number(computedPrice * form.quantity)) }}</strong> (Includes applicable taxes)</div>
                            </div>
                        </div>  
                    </div> 
                    <error-display-card v-if="validation.error" :errors="validation.errors"/>
                    <div class="centered gap-8">
                        <button @click="submitPreBooking" class="button-primary btn-md gap-8" :class="{ 'button-disabled' : submiting || fetching_available_slots || computedBookingLimit < 1 }" :disabled="submiting || fetching_available_slots || computedBookingLimit < 1">
                            <spinner v-if="submiting" :size="20" :color="'#fff'" />
                            <span>{{ submiting ? 'Submitting...' : 'Submit request' }}</span>
                        </button>
                        <button @click="cancelPreBooking" class="ft-danger btn-md bg-transparent">Cancel</button>
                    </div>
                </div>
                <div v-else class="fs-102rem pd-l-24 pd-r-24">
                    <p>
                        Climb Onsight will review your request and will get back to you shortly. Please be aware that <strong>{{ guide.name }}</strong> may not be available on the day selected and may reach out to you to reschedule your trip on another day.
                    </p>
                    <p>
                        If your trip is confirmed, you will receive an email with a payment link to complete your booking. Please make the payment to secure your spot. We will hold your spot for <span class="inline-block fw-600">72 hours</span>.
                    </p>
                    <p>
                        Climb Onsight is here to ensure a seamless experience for you. If you have any questions, feel free to contact us via the chat or by emailing <a class="a-link ft-secondary" href="mailto:support@climbonsight.ca">support@climbonsight.ca</a>.
                    </p>
                    <p class="flx jc-c mt-32">
                        <button @click="closeAllModal" class="button-primary btn-md gap-8">Close</button>
                    </p>
                </div>
            </div>
        </div>
    </teleport>
    <teleport to="#modal_title">
        <div class="flx gap-8 ai-c">
            <span>Event details</span>
            <div v-if="bookingStatus">
                <booking-status v-if="is_climber" :status="bookingStatus" />
            </div>
        </div>
    </teleport>
    <teleport to="#modal_content">
        <div class="modal-width">
            <event-body :event="result" :guide="guide"/>
        </div>
    </teleport>
    <teleport to="#modal_footer">
        <div class="flx jc-fe gap-8 booking-trigger-wrapper">
            <booking-trigger-button :eventStatus="bookingStatus" @booking-trigger="bookingTrigger"  />
        </div>
    </teleport>
</template>

<script>
import axios from 'axios'

import userRolesMixin from '@/mixins/userRolesMixin'
import alertMixin from '@/mixins/alertMixin'
import formatDateTime from '@/mixins/formatDateTime'
import inputValidation from '@/mixins/inputValidation'
import amountFormatter from '@/mixins/amountFormatter'
import { mapState } from 'vuex'
import EventBody from '@/components/layouts/EventBody.vue'
import Backdrop from '@/components/includes/Backdrop.vue'
import Spinner from '@/components/includes/Spinner.vue'
import BookingTriggerButton from '@/components/includes/BookingTriggerButton.vue'
import BookingStatus from '@/components/includes/BookingStatus.vue'
import CalendarDropdown from '@/components/dropdowns/CalendarDropdown.vue'
import AttendeeBookingRow from '@/components/includes/AttendeeBookingRow.vue'
import ErrorDisplayCard from '@/components/includes/ErrorDisplayCard.vue'
export default {
    components: { EventBody, Backdrop, Spinner, BookingTriggerButton, BookingStatus, CalendarDropdown, AttendeeBookingRow, ErrorDisplayCard },
    name: 'ResultsModal',
    mixins: [inputValidation, formatDateTime, alertMixin,  userRolesMixin, amountFormatter],
    computed: {
        ...mapState({
            result: (state) => state.forms.tempStorage,
            hostname: (state) => state.hostname,
            token: (state) => state.token,
            bookings: (state) => state.bookings
        }),
        bookingStatus() {
            return this.is_climber && this.bookings ? this.bookings.find(event => event.event_id === this.result.id) : null
        },
        computedAttendees() {
            let length = Number(this.form.quantity)
            return Array.from({ length }, (_, index) => index);
        },
        computedPrice() {
            if(this.result.event_type === 'private') {
                const price = JSON.parse(this.result.price).find(item => item.id === this.form.quantity -1 + Number(this.available_slot_count))
                if(price)
                return Number(price.price)
                else
                return 0
            }else {
                return Number(this.result.price)
            }
        },
        computedBookingLimit() {
            const limit = this.result.attendance_limit
            let count = this.available_slot_count
            if (this.result.repeat_at) {
                count = this.available_slot_count 
            }
            return Number(limit - count)
        }
    },
    data() {
        return {
            form: {
                date: '',
                quantity: 1,
                attendees: []
            },
            prebook: false,
            toggleCal: false,
            bookingSuccess: false,
            fetching_available_slots: false,
            available_slot_count: 0,
            booked_count: 0,
            guide: {},
        }
    },
    methods: {
        async calChange(date) {
            // Make API call to fetch available slot count
            this.fetching_available_slots = true
            try {
                const res = await axios.post(this.hostname+'/api/get-booking-count/'+ this.result.id + '?token='+ this.token, { date: date})
                this.form.date = new Date(date).toISOString().slice(0, 10)
                this.available_slot_count = res.data
                this.fetching_available_slots = false
                if(Number(this.form.quantity > this.computedBookingLimit)) {
                    this.form.quantity = this.computedBookingLimit
                }
            } catch (e) {
                this.errorResponse(e)
                this.fetching_available_slots = false
            }
        },
        sliceInput() {
            let input = this.form.quantity
            if (input > this.computedBookingLimit) {
                this.form.quantity = this.computedBookingLimit
            }
            this.form.attendees = this.form.attendees.slice(0, input)
        },
        addAttendeeInput(attendee) {
            const i = this.form.attendees.findIndex(x => x.id === attendee.id)
            if(i > -1) {
                this.form.attendees.splice(i, 1, attendee)
            }else {
                this.form.attendees.push(attendee)
            }
        },
        validateAttendees() {
            return this.form.attendees.every(item => item.name !== '' && item.name !== null && item.email !== '' && item.email !== null && item.dob !== '' && item.dob !== null)
        },
        bookingTrigger() {
            this.prebook = true
            !this.result.repeat_at ? this.getBookingCount() : ''
        },
        cancelPreBooking() {
            this.prebook = false
        },
        getThisGuide(guide) {
            this.$store.dispatch('getThisGuide', guide)
            .then((res) => {
                this.guide = res.data
            })
        },
        closeAllModal() {
            this.cancelPreBooking()
            this.$store.commit('closeModal')
        },
        async submitPreBooking() {
            this.validation.error ? this.clearErrs() : ''
            let errors = {}
            if(this.result.repeat_at && this.form.date == '' || this.form.quantity == '' || this.form.quantity < 1 || (!this.validateAttendees() || this.form.quantity != this.form.attendees.length)) {
                if(this.form.date == '' && this.result.repeat_at) {
                    errors.date = ['Please pick a date from the calendar.']
                }
                if(this.form.quantity == '' || this.form.quantity < 1) {
                    errors.quantity = ['Please type in a valid quantity.']
                }
                if (!this.validateAttendees() || this.form.quantity != this.form.attendees.length) {
                    errors.attendees = ['Please fill out all attendees information']
                }
                this.showErr(errors)
            }else {
                this.startSpinner()
                try {
                    const res = await axios.post(this.hostname+'/api/prebook-event/'+ this.result.id + '?token='+ this.token, this.form)
                    this.stopSpinner()
                    if(res.status === 201) {
                        this.$store.commit('showAlert', {status: 'danger', body: res.data.message})
                        this.available_slot_count = res.data.slot_booked
                    }else {
                        this.bookingSuccess = true
                        this.$store.commit('updateBookings', res.data.bookings)
                    }
                } catch (e) {
                    this.errorResponse(e)
                    this.stopSpinner()
                }
            }
        },
        async getBookingCount() {
            this.fetching_available_slots = true
            try {
                const res = await axios.post(this.hostname+'/api/get-booking-count/'+ this.result.id + '?token='+ this.token, { date: null})
                this.available_slot_count = res.data
                this.fetching_available_slots = false
            } catch (e) {
                this.errorResponse(e)
                this.fetching_available_slots = false
            }
        }
    },
    mounted() {
        this.$store.commit('stopFormLoader')
        this.getThisGuide(this.result.user_id)
    }
}
</script>

<style lang="scss" scoped>
.modal-width {
    width: 900px;
}
.details-padding {
    padding: 0;
}
.modal-container {
    margin: 0 20px;
    z-index: 402;
}
.top-overlay-1 {
    width: 600px;
    max-height: 88dvh;
    button {
        min-width: 200px;
    }
}
li {
    list-style-type: disc; 
    list-style-position: inside; 
}
.bd-bt-dashed {
    padding: 6px 0;
}
.blue {
    background-color: #d8e6ff;
    display: inline-block;
    border: 1px solid var(--vuecal-blue);
    height: 16px;
    width: 16px;
}
</style>