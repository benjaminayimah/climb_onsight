<template>
    <button @click="$emit('booking-trigger')" class="button-primary btn-rounded btn-md" :class="{ 'button-disabled' : eventStatus && (!eventStatus.accepted || eventStatus.paid) }" :disabled="eventStatus && (!eventStatus.accepted || eventStatus.paid) ? true : false">
        <span v-if="eventStatus && eventStatus.accepted && !eventStatus.paid">Complete booking</span>
        <span v-else>Book event</span>
    </button>
</template>

<script>
export default {
    name: 'BookingTriggerButton',
    props: {
        eventStatus: Object
    }
}
</script>
