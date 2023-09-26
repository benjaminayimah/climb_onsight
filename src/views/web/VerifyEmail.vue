<template>
    <section class="pd-32 flx jc-c">
        <div class="wrapper">
            <div class="centered" v-if="submitting">
                <spinner :size="18" />
                <div>Please wait...</div>
            </div>
            <div v-else>
                <div class="response-message mb-32" :class="response.status =='success' ? 'success-response' : 'invalid-credentials'">
                    <span>{{ response.message }}</span>
                </div>
                <button v-if="response.status =='success'" @click="$router.push({name: 'Home'})" class="button-primary w-100 gap-8 btn-lg">Proceed to dashboard</button>
                <button v-else @click="verifyAccount" class="button-primary w-100 btn-lg">Try again</button>
            </div>
        </div>
    </section>
</template>

<script>
import axios from 'axios'
import Spinner from '@/components/includes/Spinner.vue'
import { mapState } from 'vuex'
export default {
    components: { Spinner },
    computed: {
        ...mapState({
            hostname: (state) => state.hostname
        })
    },
    data () {
        return {
            response: { status: '', message: ''},
            submitting: false
        }
    },
    methods: {
        async verifyAccount() {
            this.submitting = true
            try {
                const res = await axios.post(this.hostname + '/api/verify-account-email', {token: this.$route.params.token})
                if(res.data) {
                    this.results(res.data)
                }
            } catch (e) {
                this.results(e.response.data)
            }
        },
        results(data) {
            this.response.status = data.status
            this.response.message = data.message
            this.submitting = false
        }
    },
    mounted() {
        this.verifyAccount()
    }
}
</script>

<style>
.wrapper{
    max-width: 500px;
}
</style>