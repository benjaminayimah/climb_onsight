export default {
    methods: {
        showAlert(status, message) {
            const successPayload = {
                status: status,
                body: message
            };
            this.$store.commit('showAlert', successPayload);
        }
    }
}