export default {
    data() {
        return {
            validation: {
                error: false,
                errors: '',
            },
            submiting: false
        }
    },
    methods: {
        clearErrs() {
            if (this.validation.error === true)
            this.validation.error = false
            this.validation.errors = ''
        },
        errorResponse(e) {
            // if (e.response.status == 401) {
            //     this.userError.error = true
            //     this.userError.message = 'Invalid email or password. Please try again or try resetting your password.'
            //     this.form.password = ''
            // }
            if(e.response.status == 422){
                this.validation.error = true
                this.validation.errors = e.response.data.errors || e.response.data.error || e
            }
            // if (e.response.status == 503) {
            //     this.userError.error = true
            //     this.userError.message = 'Our system is currently down for upgrade. Please try again later. Sorry for the inconvenience.'
            // }
        },
        startSpinner() {
            this.submiting = true
        },
        stopSpinner() {
            this.submiting = false
        }
    },
}