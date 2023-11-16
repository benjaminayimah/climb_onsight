<template>
    <div v-if="!user.stripe_account_id && !user.charges_enabled" class="empty-state flx column jc-c ai-c gap-16">
        <div class="centered text-center">
            <svg class="mb-16" xmlns="http://www.w3.org/2000/svg" height="70" viewBox="0 0 62.666 54.021">
                <g transform="translate(-3656 -1134.129)">
                    <path d="M49.667,57.832H5.519A5.5,5.5,0,0,1,0,52.313L.028,19.2a5.505,5.505,0,0,1,1.6-3.908,5.445,5.445,0,0,1,3.894-1.611H35.644V16.49a18.43,18.43,0,0,0,.2,2.712H5.519V24.72H37.554A19.116,19.116,0,0,0,50.1,35.109l.807.191.806-.191a17.383,17.383,0,0,0,3.475-1.229V52.313a5.5,5.5,0,0,1-5.519,5.519ZM5.519,35.757V52.313H49.667V35.757Z" transform="translate(3656 1130.317)" fill="#2d74ff"/>
                    <path d="M11.761,27.892h0A15.847,15.847,0,0,1,0,12.678V5.071L11.761,0,23.522,5.072v7.607A15.847,15.847,0,0,1,11.761,27.892Zm-4.4-14.81a1.16,1.16,0,0,0-.839.354,1.173,1.173,0,0,0,.019,1.652l3.1,3.1,0,0a1.164,1.164,0,0,0,.817.332h.059a1.174,1.174,0,0,0,.839-.418l5.706-6.808a1.17,1.17,0,1,0-1.794-1.5l-4.891,5.835-2.2-2.205-.005-.005A1.163,1.163,0,0,0,7.357,13.082Z" transform="translate(3695.143 1134.129)" fill="#FFAC00"/>
                </g>
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
                <svg class="mb-8" xmlns="http://www.w3.org/2000/svg" height="40" viewBox="0 0 18.195 16.195">
                    <path d="M10.668,3.4l7.786,13.525H2.882L10.668,3.4Zm0-1.467a1.171,1.171,0,0,0-.963.706L1.793,16.411c-.53.942-.079,1.712,1,1.712H18.542c1.08,0,1.531-.77,1-1.712h0L11.631,2.634A1.17,1.17,0,0,0,10.668,1.928ZM11.68,15.086a1.012,1.012,0,1,1-1.012-1.012A1.012,1.012,0,0,1,11.68,15.086Zm-1.012-2.024A1.012,1.012,0,0,1,9.656,12.05V9.013a1.012,1.012,0,1,1,2.024,0V12.05A1.012,1.012,0,0,1,10.668,13.062Z" transform="translate(-1.571 -1.928)" fill="#e01818"/>
                </svg>

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
                        <a @click.prevent="goToStripe" href="#" target="_blank" class="a-link ft-secondary">
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
                        <a class="a-link ft-secondary" @click.prevent="goToStripe" href="#" target="_blank">
                            To change this settings go to Stripe main dashboard
                            <svg xmlns="http://www.w3.org/2000/svg" height="14" viewBox="0 0 14.5 14.5">
                                <path d="M-3437.481-683.708a2,2,0,0,1-2-2v-8.25a2,2,0,0,1,2-2h4.5a.5.5,0,0,1,.5.5.5.5,0,0,1-.5.5h-4.5a1,1,0,0,0-1,1v8.25a1,1,0,0,0,1,1h8.249a1,1,0,0,0,1-1v-4.5a.5.5,0,0,1,.5-.5.5.5,0,0,1,.5.5v4.5a2,2,0,0,1-2,2Zm3.4-5.4a.5.5,0,0,1,0-.707l7.4-7.4h-3.293a.5.5,0,0,1-.5-.5.5.5,0,0,1,.5-.5h4.5a.5.5,0,0,1,.243.063h0l.009.005,0,0,.006,0,.006,0,0,0,.008.005h0a.491.491,0,0,1,.074.061.5.5,0,0,1,.146.379v4.475a.5.5,0,0,1-.5.5.5.5,0,0,1-.5-.5V-696.5l-7.4,7.4a.5.5,0,0,1-.354.147A.5.5,0,0,1-3434.085-689.1Z" transform="translate(3439.481 698.208)" fill="#C69776"/>
                            </svg>
                        </a>
                    </div>
                    <div v-else class="short-description">
                        There are no payouts due. Payouts will show up here, along with the date they're expected to arrive in your default bank.
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
            return this.account.default_currency
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