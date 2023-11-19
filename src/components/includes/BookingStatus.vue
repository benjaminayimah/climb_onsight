<template>
    <div class="fs-08 br-16 booking-status text-center" :class="guideView ? 'awaiting-payment' : 'booked-event'" v-if="status && status.accepted && status.paid">{{ guideView ? 'Paid' : 'Booked'}}</div>
    <div class="fs-08 br-16 booking-status text-center" :class="guideView ? 'booking-pending' : 'awaiting-payment'" v-if="status && status.accepted && !status.paid">Waiting payment</div>
    <div class="fs-08 br-16 booking-status booking-pending text-center" v-else-if="status && !status.accepted && !status.paid && !status.guide_delete">Pending approval</div>
    <div class="fs-08 br-16 booking-status booking-canceled text-center" v-else-if="status && status.guide_delete">Booking canceled</div>
</template>

<script>
export default {
    name: 'BookingStutus',
    props: {
        status: Object,
        guideView: Boolean
    }

}
</script>