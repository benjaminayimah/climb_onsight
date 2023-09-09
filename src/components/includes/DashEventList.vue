<template>
    <a href="" class="flx-1 evt-card bg-white br-16 flx column gap-16">
        <div class="evt-card-wrapper flx column gap-4">
            <div class="bg-img"></div>
            <div class="foot flx column gap-4">
                <div class="flx jc-sb">
                    <h4 class="fs-09">Climb off</h4>
                    <div class="fs-09">$243</div>
                </div>
                <div class="flx gap-8">
                    <div class="flx column">
                        <label>Date</label>
                        <span class="wrap-text wrap-line-1">Jun 20</span>
                    </div>
                    <div class="flx column">
                        <label>Time</label>
                        <span class="wrap-text wrap-line-1">02:00 PM</span>
                    </div>
                    <div class="flx column">
                        <label>Location</label>
                        <span class="wrap-text wrap-line-1">23 victoria avenue</span>
                    </div>
                </div>
            </div>
        </div>
    </a>
</template>

<script>
export default {
    name: 'DashEventList'
}
</script>

<style lang="scss" scoped>
.evt-card {
    min-height: 190px;
    .bg-img {
        height: 60%;
        border-radius: 8px;
    }
    label, span {
        font-size: 0.8rem;
    }
    label {
        font-size: 0.9rem;
        color: var(--gray);
    }
}
.evt-card-wrapper {
    padding: 8px;
    height: 100%;
}
.foot {
    line-height: 1.2;
    height: 100%;
    justify-content: center;
}
</style>