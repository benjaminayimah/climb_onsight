<template>
    <div class="stat br-16 flx column gap-4">
        <strong>{{ title }}</strong>
        <span class="gray">{{ period }}</span>
        <h1 class="mt-8">{{ amount && currency ? formatStripeAmount(value, currency) : value }}</h1>
    </div>
</template>
<script>
import stripeAmountFormatter from '@/mixins/amountFormatter'
export default {
    name: 'PayoutStatList',
    mixins: [stripeAmountFormatter],
    props: {
        color: String,
        value: Number,
        title: String,
        period: String,
        currency: String,
        amount: Boolean
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