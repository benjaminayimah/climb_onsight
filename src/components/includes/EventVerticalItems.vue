<template>
    <li class="event-item">
        <a href="#" class="br-16 block" @click.prevent="$emit('go-to-event', event.start)" :class="event.color">
            <div class="flx gap-8 ai-c">
                <h1>{{ format_date_day(event.start) }}</h1>
                <h5 class="uppercase wrap-text wrap-line-1">{{event.title}}</h5>
            </div>
            <div>Wednesday,10th, 2023</div>
            <div class="fs-09 gray">
                <div>{{ format_time(event.start) }} - {{ format_time(event.end) }}</div>
            </div>
        </a>
    </li>
</template>

<script>
import formatDateTime from '@/mixins/formatDateTime'
export default {
    name: 'EventVerticalItems',
    mixins: [formatDateTime],
    props: {
        event: Object
    }
}
</script>

<style lang="css" scoped>
a {
    padding: 12px 16px;
}
</style>