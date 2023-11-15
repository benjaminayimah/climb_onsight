<template>
    <div class="grid-item grid-col-payout">
        <div class="table-cell gap-8">
            <span class="wrap-text wrap-line-1">{{ formatAmount(payout.amount, payout.currency ) }}</span>
        </div>
        <div class="table-cell"><strong>{{ formatAmount(computedNet, payout.currency) }}</strong></div>
        <div class="table-cell"><span class="wrap-text wrap-line-1">{{ payout.description || 'n/a' }}</span></div>
        <div class="table-cell">
            <span class="wrap-text wrap-line-1">{{ format_date_short3(payout.created) }}</span>
        </div>
    </div>
</template>

<script>
import stripeAmountFormatter from '@/mixins/stripeAmountFormatter';
import formatDateTime from '@/mixins/formatDateTime';
export default {
    name: 'PayoutTableRow',
    mixins: [formatDateTime, stripeAmountFormatter],
    props: {
        payout: Object
    },
    computed: {
        computedGross() {
            const amountFromStripe = this.payout.amount;
            const formattedAmount = (amountFromStripe / 100).toFixed(2);
            const formattedCurrency = new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: this.payout.currency
            }).format(formattedAmount);
            return formattedCurrency
        },
        computedNet() {
            return this.payout.amount - this.payout.amount * 0.1;
        },
    }
}
</script>

<style lang="scss" scoped>
img{
    height: 42px;
    width: 42px;
}
// a{
//     container-type: inline-size
// }
// @container( inline-size <= 720px) {
//     .see-details{
//         display: none
//     }

// }
</style>