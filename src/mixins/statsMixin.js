import { mapState } from 'vuex';
export default {
    computed: {
        ...mapState({
            payouts: (state) => state.payouts,
            balance: (state) => state.balance,
            events: (state) => state.events,
            bookings: (state) => state.bookings,
            account: (state) => state.account
        }),
        computedGross() {
            return this.payouts.data && this.payouts.data.length ? this.payouts.data.reduce((acc, item) => acc + item.amount, 0) : ''
        },
        computedNet() {
            return this.balance && this.balance.length ? this.balance[0].amount : ''
        },
        computedCurrency() {
            return this.account.default_currency
        }
    },
}