<template>
    <section class="flx gap-40 main">
        <div class="payout-left flx column gap-40">
            <div class="grid gap-24 grid-col-4 stats-wrapper">
                <payout-stats-list :color="'#E8E2FF'" />
                <payout-stats-list :color="'#d5ffd5'" />
                <payout-stats-list :color="'#e0f2fe'" />
                <payout-stats-list :color="'#ffe4e6'" />
            </div>
            <div class="flx column gap-16">
                <div class="text-center">
                    <h3>Payments</h3>
                </div>
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
            <button class="btn-lg w-100 button-outline bg-transparent btn-rounded flx ai-c gap-8">
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
import PayoutStatsList from '@/components/includes/PayoutStatsList.vue'
import PayoutTableRow from '@/components/includes/PayoutTableRow.vue'
import { mapState } from 'vuex'
import SavedPaymentList from '@/components/includes/SavedPaymentList.vue'
export default {
    name: 'PayoutView',
    components: { PayoutStatsList, PayoutTableRow, SavedPaymentList },
    computed: {
        ...mapState({
            users: (state) => state.climbers,
            payment_options: (state) => state.payment_options
        })
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
</style>