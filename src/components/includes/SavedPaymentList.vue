<template>
    <div class="br-16 pd-16-24 flx jc-sb">
        <div class="flx gap-8">
            <div class="icon br-8 centered bg-white">
                <svg v-if="bank.object === 'bank_account'" xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 37.957 37.957">
                    <path d="M6.319,19.048a2.372,2.372,0,0,0,2.1,1.186H41.539a2.372,2.372,0,0,0,1.232-4.426Q41.635,15.153,24.979,6,8.322,15.152,7.186,15.808a2.372,2.372,0,0,0-.867,3.24ZM32.1,23.792v15.42H28.537V23.792H21.42v15.42H17.862V23.792H10.745v15.42H7.9A1.9,1.9,0,0,0,6,41.11v2.847H43.957V41.11a1.9,1.9,0,0,0-1.9-1.9H39.213V23.792Z" transform="translate(-6 -6)" fill="#3e424d" fill-rule="evenodd"/>
                </svg>
                <img v-else :src="computedIcon" alt="card" />
            </div>
            <div>
                <div v-if="bank.account_holder_name || bank.name" class="mb-4">{{ bank.account_holder_name || bank.name }}</div>
                <span>{{ bank.bank_name || bank.brand }}</span>
                <div class="fs-09 capitalize">
                    <div class="flx gap-8">
                        <label class="gray">Account type:</label>
                        <div>{{ bank.object.replace(/_/g, ' ') }}</div>
                    </div>
                    <div v-if="bank.routing_number" class="flx gap-8">
                        <label class="gray">Routing number:</label>
                        <div>{{ bank.routing_number }}</div>
                    </div>
                    <div class="flx gap-8">
                        <label class="gray">Country:</label>
                        <div>{{ computedCountry.country || bank.country }}</div>
                    </div>
                    <div class="flx gap-8">
                        <label class="gray">Currency:</label>
                        <div class="uppercase">{{ bank.currency }}</div>
                    </div>
                    <div v-if="bank.object === 'card'" class="flx gap-8">
                        <label class="gray">Expiry:</label>
                        <div class="uppercase">{{ bank.exp_month +'/'+ bank.exp_year }}</div>
                    </div>
                </div>
            </div>
        </div>
        <div>
            <span class="fs-09 badge badge-cyan br-24" v-if="bank.default_for_currency && bank.status === 'new' && index === length - 1">Default</span>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
    name: 'SavedPaymentList',
    props: {
        bank: Object,
        index: Number,
        length: Number
    },
    computed: {
        ...mapState({
            countries: (state) => state.country.countries
        }),
        computedCountry() {
            return this.countries.find(data => data.code === this.bank.country)
        },
        computedIcon() {
            if(this.bank.object === 'card' && this.bank.brand == 'Visa')
            return require('@/assets/images/visa.png')
            else if (this.bank.brand == 'MasterCard')
            return require('@/assets/images/mastercard.png')
            else if (this.bank.brand == 'American Express')
            return require('@/assets/images/american_express.png')
            else if (this.bank.brand == 'UnionPay')
            return require('@/assets/images/union_pay.png')
            else if (this.bank.brand == 'Diners Club')
            return require('@/assets/images/diners_club.png')
            else if (this.bank.brand == 'Discover')
            return require('@/assets/images/discover.png')
            else if (this.bank.brand == 'Eftpos Australia')
            return require('@/assets/images/eftpos.png')
            else if (this.bank.brand == 'JCB')
            return require('@/assets/images/jcb.png')
            else
            return require('@/assets/images/other_card.png')
        }
    }
}
</script>

<style lang="scss" scoped>
.pd-16-24 {
    background: rgba(244, 244, 244, 0.76);
    padding: 16px;
}
.icon {
    height: 40px;
    width: 40px;
    img {
        height: 40px;
    }
}
</style>