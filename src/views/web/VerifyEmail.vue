<template>
    <section class="pd-32 flx jc-c">
        <div class="wrapper centered">
            <div v-if="submitting">
                <lottie-loader :size="50" />
                <div>Please wait...</div>
            </div>
            <div v-else class="flx column ai-c">
                <div class="response-message mb-32" :class="response.status =='success' ? 'success-response' : 'invalid-credentials'">
                    <span>{{ response.message }}</span>
                </div>
                <button v-if="response.status =='success'" @click="$router.push({name: 'Home'})" class="button-primary btn-md-lng">Proceed to dashboard</button>
                <button v-else @click="verifyAccount" class="button-primary w-100 btn-lg">Try again</button>
            </div>
        </div>
    </section>
</template>

<script>
import axios from 'axios'
import { mapState } from 'vuex'
import LottieLoader from '@/components/lotties/LottieLoader.vue'
export default {
    components: { LottieLoader },
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

<style lang="css" scoped>
.wrapper{
    max-width: 500px;
    height: 100%;
}
section {
    height: 100dvh;
}
</style>