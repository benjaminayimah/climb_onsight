<template>
    <h4 v-if="editForm !== 'event_edit'" class="text-center mb-24">Add to your calendar</h4>
    <calendar-stepper-2 :input2="input2" :newEvent="computedEvent" :editMode="editForm" v-if="$route.query.stepper === '2'"  :color="this.editForm === 'event_edit' ? '#f1f1f1' : '#fff'"/>
    <calendar-stepper-3 :input2="input2" :newEvent="computedEvent" :editMode="editForm" v-else-if="$route.query.stepper === '3'" @go-to-event="gotoEvent" />
    <calendar-stepper-1 :user="user" :input2="input2" :newEvent="computedEvent" :editMode="editForm" v-else />
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
            editForm: (state) => state.forms.modal,
            event: (state) => state.forms.tempStorage,
            user: (state) => state.user
        }),
        computedEvent() {
            if(this.editForm === 'event_edit')
            return this.event
            else 
            return this.newEvent
        }

    },
    methods: {
        gotoEvent(date) {
            this.$emit('go-to-event', date)
        }
    }
}
</script>

<style lang="scss" scoped>

</style>