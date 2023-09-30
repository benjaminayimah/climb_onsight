<template>
    <section class="main">
        <div class="bg-white br-24 flx section-main-wrapper pd-16 gap-16">
            <div class="calendar-left bg-color br-8 pd-32">
                <h4 class="text-center mb-24">Add to your calender</h4>
                <div class="flx column gap-24">
                    <div class="bg-white br-16 cal-picker-wrapper">
                        <vue-cal
                        class="vuecal--rounded-theme vuecal--green-theme"
                        xsmall
                        hide-view-selector
                        :time="false"
                        active-view="month"
                        :disable-views="['week']"
                        @cell-click="handleDateClick"
                        style="width: 100%;height: 300px; box-shadow: unset;">
                    </vue-cal>
                    </div>
                    <div class="input-wrapper flx column gap-8">
                        <label for="start_time">Start time</label>
                        <input class="br-16" type="time" id="start_time" name="start_time" />
                    </div>
                    <div class="input-wrapper flx column gap-8">
                        <label for="end_time">End time</label>
                        <input class="br-16" type="time" id="end_time" name="end_time" />
                    </div>
                    <div>
                        <button class="button-primary btn-md w-100">Next</button>
                    </div>
                </div>
            </div>
            <div class="calendar-right bg-color br-8 flx-1">
                right
            </div>
        </div>
    </section>
</template>

<script>
import VueCal from 'vue-cal'
import 'vue-cal/dist/vuecal.css'
export default {
    name: 'CalendarView',
    components: { VueCal },
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