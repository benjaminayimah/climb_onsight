<template>
    <div v-if="!user.stripe_account_id && !user.charges_enabled" class="empty-state flx column jc-c ai-c gap-16">
        <div class="centered text-center">
            <svg class="mb-16" xmlns="http://www.w3.org/2000/svg" height="70" viewBox="0 0 342.943 283.808">
                <path d="M34.17,203.762c-7.082-5.553-9.146-16.957-9.23-17.44L11.719,95.371a3.161,3.161,0,1,1,6.256-.91l13.208,90.861s1.729,9.418,6.889,13.464c4.291,3.365,11.96,3.534,14.553,3.316l231.908-.012c.284.013,9.09.509,14.564-2.587,5.26-2.975,8.019-9.781,8.045-9.85l.248-1.185a3.161,3.161,0,1,1,6.153,1.452l-.378,1.6c-.271.782-3.668,9.361-10.956,13.482-7.125,4.03-17.441,3.428-17.878,3.4l-231.441.006c-.054.007-.814.069-2.035.069C47.219,208.482,39.491,207.933,34.17,203.762Zm298.679-10.38-55.417-54.808a63.178,63.178,0,1,1,8.073-8.687l55.679,55.067a5.927,5.927,0,0,1-8.336,8.428ZM183.985,91.391a51.367,51.367,0,1,0,51.367-51.367A51.424,51.424,0,0,0,183.985,91.391ZM75.278,171.79a15.2,15.2,0,0,1-10.172-6.6c-3.843-5.45-3.393-9.237-3.264-9.941a3.161,3.161,0,0,1,6.219,1.136h0c.014,0-.044,1.963,2.212,5.163a9.361,9.361,0,0,0,5.525,3.961l55.052.476a10.768,10.768,0,0,0,4.936-2.667,12.378,12.378,0,0,0,2.44-5.913l-.489-18.261a6.761,6.761,0,0,0-1.448-2.9,5.548,5.548,0,0,0-4.154-2.667c-2.013-.167-33.527-.265-54.2-.288-.923.054-4.1.517-5.774,1.953a9.957,9.957,0,0,0-2.759,4.562,3.161,3.161,0,0,1-6.15-1.464,16.061,16.061,0,0,1,4.792-7.9c3.617-3.1,9.131-3.445,9.748-3.473,12.567.011,53.23.076,55.188.341a11.765,11.765,0,0,1,8.43,5.227c2.622,3.625,2.683,6.069,2.639,6.731l.477,18.409a18.41,18.41,0,0,1-4.01,9.829c-3.385,3.82-8.655,4.679-9.245,4.764Zm243.011-28.972a3.161,3.161,0,0,1-2.746-3.528l17.1-137.422c-.335-1.778-2.111-9.609-8.15-14.411-6.89-5.477-16.51-4.8-16.607-4.79l-285.943.009c.1.016-7.015,1.076-11.237,6.34C7.032-6.395,6.276,2.067,6.3,4.941L16.981,79.189a3.161,3.161,0,0,1-6.259.9L.005,5.412c-.036-.942-.05-13.088,5.774-20.35,5.922-7.386,15.37-8.633,15.769-8.683l286.095-.023c.249-.029,11.973-.854,20.788,6.154C337.266-10.467,338.908.89,338.972,1.371l.057.409-.051.409L321.817,140.072a3.162,3.162,0,0,1-3.133,2.77A3.252,3.252,0,0,1,318.289,142.818ZM24.691-36.1s.2-6.416,2.808-10.277c2.051-3.038,6.458-6.279,8.866-7.013a16.145,16.145,0,0,1,3.237-.77l151.551-.165s4.146-9.949,9.432-15.349,10.029-5.653,10.029-5.653h91.011a16.263,16.263,0,0,1,7.934,2.38,11.857,11.857,0,0,1,4.616,6.341V-36.1Z" transform="translate(0 75.325)" fill="#2d74ff"/>
            </svg>
            <h3>Setup Payout Account</h3>
            <div class="mb-24">In order to accept payment and receive payouts, you will need to setup a stripe connected account. Click the button below to get started.</div>
            <button @click="setupStripe" class="button-primary btn-md-lng gap-8 btn-rounded" :class="{ 'button-disabled' : submiting }" :disabled="submiting ? true : false">
                <spinner v-if="submiting" :size="18" />
                <span>{{ submiting ? 'Please wait...' : 'Get started'}}</span>
            </button>
        </div>
    </div>
    <div v-else-if="user.stripe_account_id && !user.details_submitted" class="empty-state flx column jc-c ai-c gap-16">
        <div class="centered text-center">
            <h3>Finish payout setup</h3>
            <div class="mb-24">Your payout account is incomplete. Please click on the button to finish setup.</div>
            <button @click="finishSetupStripe" class="button-primary btn-md-lng gap-8 btn-rounded" :class="{ 'button-disabled' : submiting }" :disabled="submiting ? true : false">
                <spinner v-if="submiting" :size="18" />
                <span>{{ submiting ? 'Please wait...' : 'Finish setup'}}</span>
            </button>
        </div>
    </div>
    <!-- <div v-else-if="user.details_submitted" class="empty-state flx column jc-c ai-c gap-16">
        <div class="centered text-center">
            <h3>Account under review</h3>
            <div class="mb-24">Your payout details have been submitted successfully and currently under review. We will update you shortly.</div>
        </div>
    </div> -->
    <section v-else class="flx gap-40 main">
        <div class="payout-left flx column gap-40">
            <div class="grid gap-24 grid-col-4 stats-wrapper">
                <payout-stats-list :color="'#E8E2FF'" />
                <payout-stats-list :color="'#d5ffd5'" />
                <payout-stats-list :color="'#e0f2fe'" />
                <payout-stats-list :color="'#ffe4e6'" />
            </div>
            <div class="flx column gap-16">
                <h3>Payments</h3>
                <div class="flx">
                    <ul class="flx bg-white pd-8 br-32 tab">
                        <li>
                            <router-link :to="{ name: 'Payout' }" :class="{'active' : $route.query.status !== 'all'}">Recent</router-link>
                        </li>
                        <li>
                            <router-link :to="{ name: 'Payout', query: { status: 'all'} }" :class="{'active' : $route.query.status === 'all'}">all</router-link>
                        </li>
                    </ul>
                </div>
                <div class="grid-table">
                    <div class="grid table-body">
                        <div class="grid-item table-head grid-col-payout">
                            <h4 class="table-cell wrap-text wrap-line-1">Name</h4>
                            <h4 class="table-cell wrap-text wrap-line-1">Amount</h4>
                            <h4 class="table-cell wrap-text wrap-line-1">Trip</h4>
                            <h4 class="table-cell wrap-text wrap-line-1">Date</h4>
                        </div>
                        <payout-table-row v-for="user in users" :key="user.id" :user="user" />
                    </div>
                </div>
            </div>
        </div>
        <div class="payout-right overflow-y-scroll bg-white br-16 flx-1 pd-32 flx column gap-16">
            <div class="text-center">
                <h3>Payout menu</h3>
            </div>
            <div>Saved payment options</div>
            <div class="flx column gap-16">
                <saved-payment-list v-for="bank in payment_options" :key="bank.id" :bank="bank" />
            </div>
            <button @click="$store.commit('openModal', 'banks')" class="btn-lg w-100 button-outline bg-transparent btn-rounded flx ai-c gap-8">
                <svg xmlns="http://www.w3.org/2000/svg" height="20" viewBox="0 0 22.664 22.664">
                    <path d="M-1981.058,22.6a.469.469,0,0,1-.443-.47V15.216a.945.945,0,0,1,.944-.946h3.777a.945.945,0,0,1,.944.946v6.915a.469.469,0,0,1-.443.47q-1.193.063-2.376.063Q-1979.858,22.664-1981.058,22.6Zm7.112-.7V15.216a2.836,2.836,0,0,0-2.833-2.839h-3.777a2.835,2.835,0,0,0-2.832,2.839v6.673a.469.469,0,0,1-.521.468c-.18-.021-.361-.043-.541-.066-2.93-.374-4.319-1.5-4.855-3.943a29.608,29.608,0,0,1-.485-9.857c.159-1.057,5.785-5.379,8.988-7.764a3.652,3.652,0,0,1,4.36-.01c3.23,2.383,8.911,6.718,8.981,7.774,0,.033,0,.068.006.1a37.322,37.322,0,0,1-.492,9.753c-.485,2.464-1.923,3.577-4.855,3.943q-.313.039-.625.074a.469.469,0,0,1-.053,0A.47.47,0,0,1-1973.947,21.9Z" transform="translate(1990)" fill="#000"/>
                </svg>
                View Registered banks
            </button>
            <button @click="$store.commit('openModal', 'new_payment')" class="btn-lg w-100 button-outline bg-transparent btn-rounded flx ai-c gap-8">
                <svg xmlns="http://www.w3.org/2000/svg" height="15" viewBox="0 0 11.521 11.521">
                    <path d="M19.678,26.263V21.326H14.74V19.68h4.938V14.742h1.646V19.68h4.938v1.646H21.324v4.938Z" transform="translate(-14.74 -14.742)"/>
                </svg>
                Add Bank Details
            </button>
            <button @click="$store.commit('openModal', 'withdraw_funds')" class="button-primary btn-lg w-100">Withdraw funds</button>
        </div>
    </section>
    
    
</template>

<script>
import axios from 'axios'
import PayoutStatsList from '@/components/includes/PayoutStatsList.vue'
import PayoutTableRow from '@/components/includes/PayoutTableRow.vue'
import { mapState } from 'vuex'
import SavedPaymentList from '@/components/includes/SavedPaymentList.vue'
import inputValidation from '@/mixins/inputValidation'
import Spinner from '@/components/includes/Spinner.vue'
export default {
    name: 'PayoutView',
    components: { PayoutStatsList, PayoutTableRow, SavedPaymentList, Spinner },
    mixins: [inputValidation],
    computed: {
        ...mapState({
            users: (state) => state.climbers,
            user: (state) => state.user,
            payment_options: (state) => state.payment_options,
            token: (state) => state.token,
            hostname: (state) => state.hostname

        })
    },
    methods: {
        async setupStripe() {
            this.startSpinner()
            try {
                const res = await axios.post(this.hostname+'/api/stripe?token='+ this.token)
                location.href = res.data
            } catch (e) {
                this.errorResponse(e)
                this.stopSpinner()
            }
        },
        async finishSetupStripe() {
            this.startSpinner()
            try {
                const res = await axios.post(this.hostname+'/api/finish-onboarding?token='+ this.token)
                location.href = res.data
            } catch (e) {
                this.errorResponse(e)
                this.stopSpinner()
            }
        },
        async fetchAccount() {
            try {
                const res = await axios.post(this.hostname+'/api/get-this-stripe/'+this.user.stripe_account_id+'?token='+ this.token)
                console.log(res.data)
            } catch (e) {
                this.errorResponse(e)
                this.stopSpinner()
            }
        }
    },
    mounted() {
        // this.fetchAccount()
    }
}
</script>

<style lang="scss" scoped>
.payout-left {
    flex-basis: 65%;
}
.grid-col-payout{
    grid-template-columns: 1.6fr .8fr 1.5fr .8fr;
}
.payout-right {
    height: calc(100dvh - 120px);
}
.empty-state{
    height: 80vh;
    padding: 0 20px;
    .text-center {
        max-width: 400px;
    }
}
</style>