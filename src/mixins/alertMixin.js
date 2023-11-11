export default {
    methods: {
        showAlert(status, message) {
            const payload = {
                status: status,
                body: message
            };
            this.$store.commit('showAlert', payload);
        }
    }
}