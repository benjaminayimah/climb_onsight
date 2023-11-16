<template>
    <div class="br-16 pd-16-24 flx  jc-sb">
        <div>
            <div v-if="bank.account_holder_name" class="mb-8">{{ bank.account_holder_name }}</div>
            <span class="gray">{{ bank.bank_name }}</span>
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
                    <div>{{ bank.country }}</div>
                </div>
                <div class="flx gap-8">
                    <label class="gray">Currency:</label>
                    <div>{{ bank.currency }}</div>
                </div>
            </div>
        </div>
        <div>
            <span class="fs-09 badge badge-cyan br-24" v-if="bank.default_for_currency && bank.status === 'new'">Default</span>
        </div>
    </div>
</template>

<script>
export default {
    name: 'SavedPaymentList',
    props: {
        bank: Object
    }
}
</script>

<style lang="scss" scoped>
.pd-16-24 {
    background: rgba(244, 244, 244, 0.76);
    padding: 16px 24px;
}
</style>