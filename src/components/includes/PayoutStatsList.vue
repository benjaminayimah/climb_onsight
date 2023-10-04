<template>
    <div class="stat br-16 flx column gap-4">
        <strong>Featured deals</strong>
        <span class="gray">Today</span>
        <h1 class="mt-8">$29,243.23</h1>
    </div>
</template>
<script>
export default {
    name: 'PayoutStatList',
    props: {
        color: String
    }
}
</script>

<style lang="scss" scoped>
.stat {
    background-color: v-bind(color);
    padding: 18px 20px;
    h1 {
        font-weight: normal;
        font-size: 1.6rem;
    }
    span {
        font-size: 0.9rem;
    }
}
</style>