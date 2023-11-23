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
        statsArray() {
            let array = []
            if(this.is_climber) {
                array.push({ title: 'Current bookings', value: this.bookings.length, color: '#ffe4e6', period: '23% increase from last week', amount: false, currency: ''})
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