<template>
    <h4 v-if="!editForm" class="text-center mb-24">Add to your calendar</h4>
    <calendar-stepper-2 :input2="input2" :newEvent="computedEvent" :editMode="editForm" v-if="$route.query.stepper === '2'" />
    <calendar-stepper-3 :input2="input2" :newEvent="computedEvent" :editMode="editForm" v-else-if="$route.query.stepper === '3'" @go-to-event="$emit('go-to-event')" />
    <calendar-stepper-1 :input2="input2" :newEvent="computedEvent" :editMode="editForm" v-else />
</template>

<script>
import CalendarStepper1 from '@/components/includes/CalendarStepper1.vue'
import CalendarStepper2 from '@/components/includes/CalendarStepper2.vue'
import CalendarStepper3 from '@/components/includes/CalendarStepper3.vue'
import { mapState } from 'vuex'
export default {
    inheritAttrs: false,
    name: 'AddCalendarEvent',
    components: { CalendarStepper1, CalendarStepper2, CalendarStepper3 },
    props: {
        input2: Boolean
    },
    computed: {
        ...mapState({
            newEvent: (state) => state.data.newEvent,
            editForm: (state) => state.forms.event_edit,
            event: (state) => state.forms.tempStorage,
        }),
        computedEvent() {
            if(this.editForm)
            return this.event
            else 
            return this.newEvent
        }

    }
}
</script>

<style lang="scss" scoped>

</style>