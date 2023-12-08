export default {
    methods: {
        formatStripeAmount(amount, currency) {
            const formattedAmount = (amount / 100).toFixed(2);
            const formattedCurrency = new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: currency
            }).format(formattedAmount);
            return formattedCurrency
        },
        formatAmount(amount) {
            return Intl.NumberFormat('en-US', { style: 'currency', currency: 'CAD' }).format(amount.toFixed(2)) 
        }
    }
}