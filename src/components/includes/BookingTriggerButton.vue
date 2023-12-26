<template>
    <button @click="$emit('booking-trigger')" class="button-primary btn-md" :class="{ 'button-disabled2' : eventStatus && (!eventStatus.accepted || eventStatus.paid) }" :disabled="eventStatus && (!eventStatus.accepted || eventStatus.paid) ? true : false">
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
<style scoped>
button {
    box-shadow: rgba(50, 50, 93, 0.25) 0px 30px 60px -12px, rgba(0, 0, 0, 0.3) 0px 18px 36px -18px;
}
</style>
