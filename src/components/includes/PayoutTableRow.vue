<template>
    <div class="grid-item table-row grid-col-payout">
        <div class="table-cell gap-8">
            <span class="wrap-text wrap-line-1">{{ formatStripeAmount(payout.amount, payout.currency ) }}</span>
        </div>
        <div class="table-cell"><strong>{{ formatStripeAmount(computedNet, payout.currency) }}</strong></div>
        <div class="table-cell"><span class="wrap-text wrap-line-1">{{ payout.description || 'n/a' }}</span></div>
        <div class="table-cell">
            <span class="wrap-text wrap-line-1">{{ format_date_short(computedDate) }}</span>
        </div>
    </div>
</template>

<script>
import stripeAmountFormatter from '@/mixins/amountFormatter';
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
        computedDate() {
            const epochTime = this.payout.created;
            const date = new Date(epochTime * 1000); // Convert seconds to milliseconds

            // Format the date as you need
            return date

        }
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