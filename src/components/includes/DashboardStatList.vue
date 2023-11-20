<template>
    <div class="stat br-16 flx column ai-c relative jc-sb">
            <svg class="absolute" xmlns="http://www.w3.org/2000/svg" height="14" viewBox="0 0 15 15">
                <path d="M1.4,15,0,13.6,11.6,2H5V0H15V10H13V3.4Z"/>
            </svg>
        <h1>{{ amount && currency ? formatAmount(value, currency) : value  }}</h1>
        <div>{{ title }}</div>
        <span>{{ period }}</span>
    </div>
</template>
<script>
import stripeAmountFormatter from '@/mixins/stripeAmountFormatter'
export default {
    name: 'DashboardStatList',
    mixins: [stripeAmountFormatter],
    props: {
        color: String,
        title: String,
        value: Number,
        period: String,
        currency: String,
        amount: Boolean

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
    svg {
        top: 20px;
        right: 20px;
    }
}
</style>