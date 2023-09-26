<template>
    <router-link :to="{ name: 'Events', query: { type: event.type, current: event.id, origin: $route.name } }" class="flx-1 evt-card shadow-sm bg-white br-16 flx column gap-16" :class="{'list-is-active' : $route.query.current == event.id}">
        <div class="evt-card-wrapper flx column gap-4">
            <div class="bg-img" :style="{ backgroundImage: 'url('+event.image+')'}"></div>
            <div class="foot flx column gap-4">
                <div class="flx jc-sb">
                    <h4 class="fs-09">{{ event.name }}</h4>
                    <div class="fs-09">$243</div>
                </div>
                <div class="flx gap-8">
                    <div class="flx column">
                        <div class="label">Date</div>
                        <span class="wrap-text wrap-line-1" title="Jun 20">Jun 20</span>
                    </div>
                    <div class="flx column">
                        <div class="label">Time</div>
                        <span class="wrap-text wrap-line-1" title="02:00 PM">02:00 PM</span>
                    </div>
                    <div class="flx column">
                        <div class="label">Location</div>
                        <span class="wrap-text wrap-line-1" title="23 victoria avenue">23 victoria avenue</span>
                    </div>
                </div>
            </div>
        </div>
    </router-link>
</template>

<script>
export default {
    name: 'EventList',
    props: {
        event: Object
    }
}
</script>

<style lang="scss" scoped>
.evt-card {
    min-height: 190px;
    .bg-img {
        height: 60%;
        border-radius: 8px;
    }
    .label, span {
        font-size: 0.8rem;
    }
    .label {
        font-size: 0.9rem;
        color: var(--gray);
    }
    &:hover {
        box-shadow: 0 4px 12px 0 rgba(15,41,77,.08);
    }
}
.evt-card-wrapper {
    height: 100%;
}
.foot {
    line-height: 1.2;
    height: 100%;
}
</style>