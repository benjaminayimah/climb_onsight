<template>
    <div class="fs-09 br-16 booking-status awaiting-payment text-center" v-if="status.accepted && !status.paid">Waiting payment</div>
    <div class="fs-09 br-16 booking-status booking-pending text-center" v-else-if="!status.accepted && !status.paid && !status.guide_delete">Booking pending</div>
    <div class="fs-09 br-16 booking-status booking-canceled text-center" v-else-if="status.guide_delete">Booking canceled</div>
    <div class="fs-09 br-16 booking-status booked-event text-center" v-else>Booked</div>
</template>

<script>
export default {
    name: 'BookingStutus',
    props: {
        status: Object
    }

}
</script>