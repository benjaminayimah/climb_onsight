<template>
    <div class="right bg-white br-16 flx-grow-1 flx column gap-32">
        <div class="flx jc-sb ai-c">
            <div>
                <strong>Today</strong>
                <div>12 August 2023</div>
            </div>
            <div v-if="is_guide">
                <button class="button-primary br-50 add">
                    <svg xmlns="http://www.w3.org/2000/svg" height="11" viewBox="0 0 11.521 11.521">
                        <path d="M19.678,26.263V21.326H14.74V19.68h4.938V14.742h1.646V19.68h4.938v1.646H21.324v4.938Z" transform="translate(-14.74 -14.742)" fill="#fff"/>
                    </svg>
                </button>
            </div>
        </div>
        <strong v-if="is_super">Top Locations</strong>
        <strong v-else-if="is_guide">All booked trips coming up this week</strong>
        <strong v-else-if="is_climber">Top events around you</strong>
        <div class="flx jc-sb">
            <div class="stack-cards">
                <div class="bg-img br-50"></div>
                <div class="bg-img br-50"></div>
                <div class="bg-img br-50"></div>
                <div class="bg-img br-50"></div>
            </div>
            <a href="" class="flx gap-16 ai-c booked">
                <div>
                    <strong v-if="is_super" class="fs-09">View all locations</strong>
                    <strong v-else-if="is_guide" class="fs-09">All climbers registered</strong>
                    <strong v-else-if="is_climber" class="fs-09">All booked guides</strong>

                    <div class="gray">42</div>
                </div>
                <div>
                    <svg xmlns="http://www.w3.org/2000/svg" height="16" viewBox="0 0 11.775 20">
                        <path d="M8.228,22,6.453,20.225,14.678,12,6.453,3.775,8.228,2l10,10Z" transform="translate(-6.453 -2)" fill="#555555"/>
                    </svg>
                </div>
            </a>
        </div>
        <ul>
            <dash-today-list />
            <dash-today-list />
            <dash-today-list />
            <dash-today-list />
            <dash-today-list />
        </ul>
        <button class="button-primary btn-md w-100">Show all</button>

    </div>
</template>

<script>
import DashTodayList from './DashTodayList.vue'
export default {
    name: 'DashToday',
    components: { DashTodayList },
    props: {
        is_super: String,
        is_guide: String,
        is_climber: String
    }
}
</script>

<style lang="scss" scoped>
.right {
    flex-grow: 1;
    padding: 32px 20px;
}
.bg-img {
    height: 50px;
    width: 50px;
    background-color: #eee;
    border: 2px solid #fff;
}
a.booked {
    border-left: 1px solid #eee;
    padding-left: 16px;
}
button.add {
    height: 35px;
    width: 35px;
}
ul {
    margin: 0 -8px;
}
</style>