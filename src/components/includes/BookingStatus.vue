<template>
    <div class="fs-08 br-16 booking-status booked-event text-center" v-if="status && status.accepted && status.paid">Booked</div>
    <div class="fs-08 br-16 booking-status awaiting-payment text-center" v-if="status && status.accepted && !status.paid">Waiting payment</div>
    <div class="fs-08 br-16 booking-status booking-pending text-center" v-else-if="status && !status.accepted && !status.paid && !status.guide_delete">Booking pending</div>
    <div class="fs-08 br-16 booking-status booking-canceled text-center" v-else-if="status && status.guide_delete">Booking canceled</div>
</template>

<script>
export default {
    name: 'BookingStutus',
    props: {
        status: Object
    }

}
</script>