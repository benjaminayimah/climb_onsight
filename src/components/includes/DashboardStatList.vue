<template>
    <div class="stats br-16 flx column ai-c relative jc-sb">
        <a href="" class="absolute">
            <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 20.325 20.325">
                <path d="M15.791,11.51a.919.919,0,0,0-.007,1.294l4.268,4.282H8.789a.914.914,0,0,0,0,1.828H20.052L15.777,23.2a.925.925,0,0,0,.007,1.294.91.91,0,0,0,1.287-.007l5.794-5.836h0a1.026,1.026,0,0,0,.19-.288.872.872,0,0,0,.07-.352.916.916,0,0,0-.26-.64l-5.794-5.836A.9.9,0,0,0,15.791,11.51Z" transform="translate(-13.53 8.396) rotate(-45)"/>
            </svg>
        </a>
        <h1>26</h1>
        <div>Featured deals</div>
        <span>23% increase from last week</span>
    </div>
</template>
<script>
export default {
    name: 'DashboardStatList',
    props: ['color']
}
</script>

<style lang="scss" scoped>
.stats {
    min-height: 140px;
    background-color: v-bind(color);
    padding: 28px 20px;
    h1 {
        font-weight: normal;
        font-size: 1.6rem;
    }
    span {
        font-size: 0.9rem;
        color: var(--gray);
    }
    a {
        top: 16px;
        right: 16px;
    }
}
</style>