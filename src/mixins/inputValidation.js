export default {
    data() {
        return {
            validation: {
                error: false,
                errors: '',
            },
            systemErr: {
                error: false,
                message: ''
            },
            submiting: false
        }
    },
    methods: {
        showErr(payload) {
            this.validation.error = true
            this.validation.errors = payload
        },
        clearErrs() {
            if (this.validation.error === true)
            this.validation.error = false
            this.validation.errors = ''
            if (this.systemErr.error === true)
            this.systemErr.error = false
            this.validation.message = ''
        },
        errorResponse(e) {
            if (e.response.status == 401) {
                this.systemErr.error = true
                this.systemErr.message = e.response.data
                this.form.password = ''
            }
            else if(e.response.status == 422){
                this.validation.error = true
                this.validation.errors = e.response.data.errors || e.response.data.error
            }
            else {
                this.systemErr.error = true
                this.systemErr.message = e.response.data || 'An unknown error has occured. Please check your credentials or network connection.'
            }
        },
        startSpinner() {
            this.submiting = true
        },
        stopSpinner() {
            this.submiting = false
        }
    },
}