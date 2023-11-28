<template>
    <li class="event-item">
        <a href="#" class="br-16 block" @click.prevent="$emit('go-to-event', event.start)" :class="event.color">
            <div class="flx gap-8 ai-c">
                <h1>{{ format_date_day(event.start) }}</h1>
                <h5 class="uppercase wrap-text wrap-line-1">{{event.title}}</h5>
            </div>
            <div class="wrap-text wrap-line-1">{{ format_date(event.start) }}</div>
            <div class="fs-09 gray flx gap-4 ai-c">
                <svg xmlns="http://www.w3.org/2000/svg" height="14" viewBox="0 0 21.137 21.137">
                    <path d="M-3539.018-766.128a10.581,10.581,0,0,1,10.569-10.569,10.581,10.581,0,0,1,10.569,10.569,10.58,10.58,0,0,1-10.569,10.569A10.58,10.58,0,0,1-3539.018-766.128Zm2,0a8.579,8.579,0,0,0,8.569,8.569,8.578,8.578,0,0,0,8.569-8.569,8.578,8.578,0,0,0-8.569-8.569A8.579,8.579,0,0,0-3537.018-766.128Zm10.74,4.4-3.307-2.146a1,1,0,0,1-.455-.839v-5.869a1,1,0,0,1,1-1,1,1,0,0,1,1,1v5.325l2.852,1.85a1,1,0,0,1,.294,1.382,1,1,0,0,1-.84.456A1,1,0,0,1-3526.278-761.729Z" transform="translate(3539.018 776.696)" fill="#a7a7a7"/>
                </svg>
                <div>{{ event.duration }}</div>
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