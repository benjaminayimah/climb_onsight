import { mapState } from 'vuex';
import userRolesMixin from '@/mixins/userRolesMixin'
export default {
    mixins: [userRolesMixin],
    computed: {
        ...mapState({
            payouts: (state) => state.payouts,
            balance: (state) => state.balance,
            events: (state) => state.events,
            bookings: (state) => state.bookings,
            account: (state) => state.account,
            guides_count: (state) => state.guides,
            climbers_count: (state) => state.climbers,
        }),
        computedGross() {
            return this.payouts.data && this.payouts.data.length ? this.payouts.data.reduce((acc, item) => acc + item.amount, 0) : ''
        },
        computedNet() {
            return this.balance && this.balance.length ? this.balance[0].amount : ''
        },
        computedCurrency() {
            return this.account.default_currency
        },
        computedPendingApproval() {
            return this.bookings && this.bookings.length ? this.bookings.filter(item => !item.accepted && !item.paid) : []
        },
        computedPendingPayment() {
            return this.bookings && this.bookings.length ? this.bookings.filter(item => item.accepted && !item.paid) : []
        },
        computedAmountSpent() {
            if (this.bookings.length) {
              const totalAmount = this.bookings
                .filter(item => item.accepted && item.paid)
                .reduce((acc, item) => acc + Number(item.total_price), 0);
              if (totalAmount > 0) {
                return Number(totalAmount)
              }
            }
            return '';
        },
        statsArray() {
            let array = []
            if(this.is_climber) {
                array.push({ title: 'Bookings', value: this.bookings.length, color: '#E8E2FF', period: 'All bookings', amount: false, currency: ''})
                array.push({ title: 'Bookings', value: this.computedPendingApproval.length, color: '#ffe4e6', period: 'Pending approval', amount: false, currency: ''})
                array.push({ title: 'Bookings', value: this.computedPendingPayment.length, color: '#d5ffd5', period: 'Awaiting payment', amount: false, currency: ''})
                array.push({ title: 'Amount spent', value: this.computedAmountSpent, color: '#e0f2fe', period: 'All bookings', amount: true, currency: ''})

            }else if (this.is_guide) {
                array.push({ title: 'Total transactions', value: this.computedGross, color: '#E8E2FF', period: 'Last 7 days', amount: true, currency: this.computedCurrency})
                array.push({ title: 'My payouts', value: this.computedNet, color: '#d5ffd5', period: 'Last 7 days', amount: true, currency: this.computedCurrency})
                array.push({ title: 'Total events', value: this.events.length, color: '#e0f2fe', period: 'All times', amount: false, currency: ''})
                array.push({ title: 'Current bookings', value: this.bookings.length, color: '#ffe4e6', period: '23% increase from last week', amount: false, currency: ''})
            }else {
                array.push({ title: 'Registered guides', value: this.guides_count.length, color: '#E8E2FF', period: 'All times', amount: false, currency: ''})
                array.push({ title: 'Total climbers', value: this.climbers_count.length, color: '#d5ffd5', period: 'All times', amount: false, currency: ''})
                array.push({ title: 'Total events', value: this.events.length, color: '#e0f2fe', period: 'All times', amount: false, currency: ''})
                array.push({ title: 'Current bookings', value: this.bookings.length, color: '#ffe4e6', period: '23% increase from last week', amount: false, currency: ''})
            }
            return array
        }
    },
}