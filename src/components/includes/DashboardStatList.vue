<template>
    <div class="stat br-16 flx column ai-c relative jc-sb">
        <svg class="absolute" xmlns="http://www.w3.org/2000/svg"  height="10" viewBox="0 0 20.69 11.82">
            <path d="M22.238,9H16.66a.683.683,0,1,0,0,1.367h3.865l-6.372,6.566-3.966-3.883a.7.7,0,0,0-.494-.2.706.706,0,0,0-.494.2L2.444,19.657a.668.668,0,0,0-.194.494.627.627,0,0,0,.194.471.7.7,0,0,0,.494.2.706.706,0,0,0,.494-.2l6.261-6.127,3.966,3.883a.7.7,0,0,0,.494.2.706.706,0,0,0,.494-.2l6.9-7.014v3.772a.7.7,0,0,0,1.394,0V9.683A.7.7,0,0,0,22.238,9Z" transform="translate(-2.25 -9)" fill="#07b923"/>
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