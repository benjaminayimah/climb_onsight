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
    <div v-else-if="user.stripe_account_id && !user.details_submitted" class="centered empty-state">
        <div class="flx column ai-c gap-24">
            <div class="pd-50 br-24 bg-white text-center">
                <h3>Finish payout setup</h3>
                <span>
                    Your payout account is incomplete. Please click on the button to finish setup.
                </span>
            </div>
            <div>
                <button @click="finishSetupStripe" class="button-primary btn-md-lng gap-8 btn-rounded" :class="{ 'button-disabled' : submiting }" :disabled="submiting ? true : false">
                    <spinner v-if="submiting" :size="18" />
                    <span>{{ submiting ? 'Please wait...' : 'Finish setup'}}</span>
                </button>
            </div>
        </div>
    </div>
    <div v-else>
        <section v-if="account" class="main flx gap-40">
            <div class="payout-left flx column gap-16">
                <div class="pd-24 flx gap-8 column br-16 bg-white">
                    <h3 class="flx gap-8 ai-c">
                        <svg xmlns="http://www.w3.org/2000/svg" height="25" viewBox="0 0 28 28">
                            <path d="M-1985.9,23.9A13.908,13.908,0,0,1-1990,14a13.91,13.91,0,0,1,4.1-9.9A13.907,13.907,0,0,1-1976,0a13.908,13.908,0,0,1,9.9,4.1A13.91,13.91,0,0,1-1962,14a13.908,13.908,0,0,1-4.1,9.9A13.908,13.908,0,0,1-1976,28,13.907,13.907,0,0,1-1985.9,23.9Zm1.414-18.385A11.924,11.924,0,0,0-1988,14a11.924,11.924,0,0,0,3.515,8.485A11.924,11.924,0,0,0-1976,26a11.924,11.924,0,0,0,8.486-3.514A11.924,11.924,0,0,0-1964,14a11.924,11.924,0,0,0-3.515-8.486A11.924,11.924,0,0,0-1976,2,11.924,11.924,0,0,0-1984.486,5.514Zm6.162,13.856-4.539-4.487a.928.928,0,0,1-.017-1.311.928.928,0,0,1,1.311-.016l3.823,3.79L-1970.5,8.7a.928.928,0,0,1,1.307-.114.927.927,0,0,1,.115,1.306l-7.891,9.414a.93.93,0,0,1-.664.331h-.046A.93.93,0,0,1-1978.323,19.371Z" transform="translate(1990)" fill="#07b923"/>
                        </svg>
                        Payout active
                    </h3>
                    <span>
                        Payout is enabled on this account.
                        <a @click.prevent="goToStripe" href="#" class="a-link ft-secondary">
                            View more details on stripe
                            <svg xmlns="http://www.w3.org/2000/svg" height="14" viewBox="0 0 14.5 14.5">
                                <path d="M-3437.481-683.708a2,2,0,0,1-2-2v-8.25a2,2,0,0,1,2-2h4.5a.5.5,0,0,1,.5.5.5.5,0,0,1-.5.5h-4.5a1,1,0,0,0-1,1v8.25a1,1,0,0,0,1,1h8.249a1,1,0,0,0,1-1v-4.5a.5.5,0,0,1,.5-.5.5.5,0,0,1,.5.5v4.5a2,2,0,0,1-2,2Zm3.4-5.4a.5.5,0,0,1,0-.707l7.4-7.4h-3.293a.5.5,0,0,1-.5-.5.5.5,0,0,1,.5-.5h4.5a.5.5,0,0,1,.243.063h0l.009.005,0,0,.006,0,.006,0,0,0,.008.005h0a.491.491,0,0,1,.074.061.5.5,0,0,1,.146.379v4.475a.5.5,0,0,1-.5.5.5.5,0,0,1-.5-.5V-696.5l-7.4,7.4a.5.5,0,0,1-.354.147A.5.5,0,0,1-3434.085-689.1Z" transform="translate(3439.481 698.208)" fill="#C69776"/>
                            </svg>
                        </a>
                    </span>
                <div>
                <div class="flx column gap-8">
                    <div v-if="account.capabilities && account.capabilities.card_payments">
                        <span class="fs-09 badge badge-cyan br-24 ">
                            Card payments
                            <svg xmlns="http://www.w3.org/2000/svg" height="10" viewBox="0 0 13.755 11.045">
                                <path d="M3709.01,689.633a.908.908,0,0,1-.634-.258l-4.2-4.2a.909.909,0,1,1,1.269-1.3l3.5,3.514,7.1-8.477a.909.909,0,0,1,1.393,1.167l-7.734,9.227a.908.908,0,0,1-.651.324Z" transform="translate(-3703.898 -678.589)"/>
                            </svg>
                        </span>
                    </div>
                    <div v-if="account.capabilities && account.capabilities.transfers">
                        <span class="fs-09 badge badge-cyan br-24">
                            Transfers
                            <svg xmlns="http://www.w3.org/2000/svg" height="10" viewBox="0 0 13.755 11.045">
                                <path d="M3709.01,689.633a.908.908,0,0,1-.634-.258l-4.2-4.2a.909.909,0,1,1,1.269-1.3l3.5,3.514,7.1-8.477a.909.909,0,0,1,1.393,1.167l-7.734,9.227a.908.908,0,0,1-.651.324Z" transform="translate(-3703.898 -678.589)"/>
                            </svg>
                        </span>
                    </div>
                </div>
                </div>
                </div>
                <div class="grid gap-24 grid-col-4 stats-wrapper">
                    <payout-stats-list :amount="true" :value="computeGross || 0" :title="'Gross balance'" :period="'Last 7 days'" :currency="computedCurrency" :color="'#E8E2FF'" />
                    <payout-stats-list :amount="true" :value="computeNet || 0" :title="'Net balance'" :period="'Last 7 days'" :color="'#d5ffd5'" :currency="computedCurrency" />
                    <payout-stats-list :value="events || 0"  :title="'Total events'" :period="'All times'" :color="'#e0f2fe'" :currency="computedCurrency" />
                    <payout-stats-list :value="bookings || 0" :title="'Total bookings'" :period="'All times'" :color="'#ffe4e6'" :currency="computedCurrency" />
                </div>
                <div class="flx column gap-8">
                    <h3 class="mt-8">Upcoming Payouts</h3>
                    <div v-if="payouts.data.length" class="short-description mb-8">
                        These amounts are estimated because transactions are still accumulating. Payouts will arrive in your payout account every {{ computedText }}.
                        <a class="a-link ft-secondary" @click.prevent="goToStripe" href="#">
                            To change this settings go to Stripe main dashboard
                            <svg xmlns="http://www.w3.org/2000/svg" height="14" viewBox="0 0 14.5 14.5">
                                <path d="M-3437.481-683.708a2,2,0,0,1-2-2v-8.25a2,2,0,0,1,2-2h4.5a.5.5,0,0,1,.5.5.5.5,0,0,1-.5.5h-4.5a1,1,0,0,0-1,1v8.25a1,1,0,0,0,1,1h8.249a1,1,0,0,0,1-1v-4.5a.5.5,0,0,1,.5-.5.5.5,0,0,1,.5.5v4.5a2,2,0,0,1-2,2Zm3.4-5.4a.5.5,0,0,1,0-.707l7.4-7.4h-3.293a.5.5,0,0,1-.5-.5.5.5,0,0,1,.5-.5h4.5a.5.5,0,0,1,.243.063h0l.009.005,0,0,.006,0,.006,0,0,0,.008.005h0a.491.491,0,0,1,.074.061.5.5,0,0,1,.146.379v4.475a.5.5,0,0,1-.5.5.5.5,0,0,1-.5-.5V-696.5l-7.4,7.4a.5.5,0,0,1-.354.147A.5.5,0,0,1-3434.085-689.1Z" transform="translate(3439.481 698.208)" fill="#C69776"/>
                            </svg>
                        </a>
                    </div>
                    <div v-else class="short-description">
                        There are no payouts due. Payouts will show up here, along with the date they're expected to arrive in your bank account.
                    </div>
                    <div v-if="payouts.data.length" class="grid-table">
                        <div class="grid table-body">
                            <div class="grid-item table-head grid-col-payout">
                                <h4 class="table-cell wrap-text wrap-line-1">Gross amount</h4>
                                <h4 class="table-cell wrap-text wrap-line-1">Net amount</h4>
                                <h4 class="table-cell wrap-text wrap-line-1">Description</h4>
                                <h4 class="table-cell wrap-text wrap-line-1">Date</h4>
                            </div>
                            <payout-table-row v-for="payout in payouts.data" :key="payout.id" :payout="payout" />
                        </div>
                    </div>
                </div>
            </div>
            <div class="payout-right overflow-y-scroll bg-white br-16 flx-1 pd-32 flx column gap-16">
                <div class="text-center">
                    <h3>Payout menu</h3>
                </div>
                <div>Saved payout accounts</div>
                <div class="flx column gap-16">
                    <saved-payment-list v-for="bank in payment_options" :key="bank.id" :bank="bank" />
                </div>
                <!-- <button @click="$store.commit('openModal', 'banks')" class="btn-lg w-100 button-outline bg-transparent btn-rounded flx ai-c gap-8">
                    <svg xmlns="http://www.w3.org/2000/svg" height="20" viewBox="0 0 22.664 22.664">
                        <path d="M-1981.058,22.6a.469.469,0,0,1-.443-.47V15.216a.945.945,0,0,1,.944-.946h3.777a.945.945,0,0,1,.944.946v6.915a.469.469,0,0,1-.443.47q-1.193.063-2.376.063Q-1979.858,22.664-1981.058,22.6Zm7.112-.7V15.216a2.836,2.836,0,0,0-2.833-2.839h-3.777a2.835,2.835,0,0,0-2.832,2.839v6.673a.469.469,0,0,1-.521.468c-.18-.021-.361-.043-.541-.066-2.93-.374-4.319-1.5-4.855-3.943a29.608,29.608,0,0,1-.485-9.857c.159-1.057,5.785-5.379,8.988-7.764a3.652,3.652,0,0,1,4.36-.01c3.23,2.383,8.911,6.718,8.981,7.774,0,.033,0,.068.006.1a37.322,37.322,0,0,1-.492,9.753c-.485,2.464-1.923,3.577-4.855,3.943q-.313.039-.625.074a.469.469,0,0,1-.053,0A.47.47,0,0,1-1973.947,21.9Z" transform="translate(1990)" fill="#000"/>
                    </svg>
                    View Registered banks
                </button> -->
                <!-- <button @click="$store.commit('openModal', 'new_payment')" class="btn-lg w-100 button-outline bg-transparent btn-rounded flx ai-c gap-8">
                    <svg xmlns="http://www.w3.org/2000/svg" height="15" viewBox="0 0 11.521 11.521">
                        <path d="M19.678,26.263V21.326H14.74V19.68h4.938V14.742h1.646V19.68h4.938v1.646H21.324v4.938Z" transform="translate(-14.74 -14.742)"/>
                    </svg>
                    Add Bank Details
                </button> -->
                <!-- <button @click="$store.commit('openModal', 'withdraw_funds')" class="button-primary btn-lg w-100">Withdraw funds</button> -->
            </div>
        </section>
        <div v-else class="empty-state centered">
            <lottie-loader />
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import { mapState } from 'vuex'
import PayoutStatsList from '@/components/includes/PayoutStatsList.vue'
import PayoutTableRow from '@/components/includes/PayoutTableRow.vue'
import SavedPaymentList from '@/components/includes/SavedPaymentList.vue'
import inputValidation from '@/mixins/inputValidation'
import Spinner from '@/components/includes/Spinner.vue'
import LottieLoader from '@/components/lotties/LottieLoader.vue'
export default {
    name: 'PayoutView',
    components: { PayoutStatsList, PayoutTableRow, SavedPaymentList, Spinner, LottieLoader },
    mixins: [inputValidation],
    computed: {
        ...mapState({
            payouts: (state) => state.payouts,
            balance: (state) => state.balance,
            events: (state) => state.events.length,
            bookings: (state) => state.bookings.length,
            account: (state) => state.account,
            user: (state) => state.user,
            payment_options: (state) => state.payment_options,
            token: (state) => state.token,
            hostname: (state) => state.hostname
        }),
        computeGross() {
            return this.payouts.data && this.payouts.data.length ? this.payouts.data.reduce((acc, item) => acc + item.amount, 0) : ''
        },
        computeNet() {
            return this.balance ? this.balance[0].amount : ''
        },
        computedCurrency() {
            return this.balance ? this.balance[0].currency : ''
        },
        computedText() {
            let data = 'business day'
            if(this.account && !this.account.settings.payouts.schedule.interval === 'daily') {
                data = this.account.settings.payouts.schedule.interval + 'business days'
            }
            return data

        }
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
        },
        async goToStripe() {
            try {
                const res = await axios.post(this.hostname+'/api/goto-stripe-dashboard/'+this.user.stripe_account_id+'?token='+ this.token)
                location.href = res.data
            } catch (e) {
                this.errorResponse(e)
                this.stopSpinner()
            }
        }
    },
    mounted() {
        this.user.details_submitted && this.user.payouts_enabled ? this.fetchAccount() : ''
    }
}
</script>

<style lang="scss" scoped>
.payout-left {
    flex-basis: 65%;
}
.grid-col-payout{
    grid-template-columns: 1fr 1fr 1.5fr .8fr;
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
.short-description {
    max-width: 500px;
}
.stats-wrapper {
    max-width: 1000px;
}
.table-cell {
    font-weight: 400;
}
</style>