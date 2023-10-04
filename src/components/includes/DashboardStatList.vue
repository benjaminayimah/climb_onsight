<template>
    <div class="stat br-16 flx column ai-c relative jc-sb">
        <a href="" class="absolute">
            <svg xmlns="http://www.w3.org/2000/svg" height="14" viewBox="0 0 15 15">
                <path d="M1.4,15,0,13.6,11.6,2H5V0H15V10H13V3.4Z"/>
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
    props: {
        color: String
    }
}
</script>

<style lang="scss" scoped>
.stat {
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
        top: 20px;
        right: 20px;
    }
}
</style>