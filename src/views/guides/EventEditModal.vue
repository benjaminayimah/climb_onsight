<template>
<teleport to="#modal_title">
        Update this event
    </teleport>
    <teleport to="#modal_content">
        <div class="modal-width">
            <add-calendar-event />
        </div>
    </teleport>
</template>

<script>
import AddCalendarEvent from './AddCalendarEvent.vue'
export default {
    name: 'EventEditModal',
    components: { AddCalendarEvent },
    mounted() {
        this.$store.commit('stopFormLoader')
    }
}
</script>

<style lang="scss" scoped>
.modal-width {
    width: 500px;
}
</style>