<template>
    <section class="main">
        <div class="bg-white br-24 flx section-main-wrapper pd-16 gap-16">
            <div class="calendar-left bg-color br-8">
                left
            </div>
            <div class="calendar-right bg-color br-8 flx-1">
                right
            </div>
        </div>
    </section>
</template>

<script>
export default {
    name: 'CalendarView'
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
</style>