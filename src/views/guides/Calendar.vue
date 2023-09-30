<template>
    <section class="main">
        <div class="bg-white br-24 flx section-main-wrapper pd-16 gap-16">
            <div class="calendar-left bg-color br-8 pd-32">
               left
            </div>
            <div class="calendar-right bg-color br-8 flx-1">
                right
            </div>
        </div>
    </section>
</template>

<script>
// import VueCal from 'vue-cal'
// import 'vue-cal/dist/vuecal.css'
export default {
    name: 'CalendarView',
    // components: { VueCal },
    methods: {
        handleDateClick(date) {
            console.log(date)
        }
    }
}
</script>

<style lang="scss" scoped>
section {
    height: calc(100dvh - 116px);
}
.section-main-wrapper{
    height: 100%;
}
.calendar-left {
    flex-basis: 400px;
}
.input-wrapper {
    select, input {
        padding: 10px 20px;
        border: unset;
    }
}
.cal-picker-wrapper {
    overflow: hidden;
}


</style>