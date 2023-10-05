<template>
    <teleport to="#modal_title">
        Bank details
    </teleport>
    <teleport to="#modal_content">
        <div class="pd-24 br-16 flx column gap-24">
            <div class="flx jc-sb ai-c gap-16">
                <strong>Name on bank</strong>
                <div>{{ bank.name }}</div>
            </div>
            <div class="flx jc-sb ai-c gap-16">
                <strong>Account number</strong>
                <div>{{ bank.account_no }}</div>
            </div>
            <div class="flx jc-sb ai-c gap-16">
                <strong>Bank name</strong>
                <div>{{ bank.bank_name }}</div>
            </div>
            <div class="flx jc-sb ai-c gap-16">
                <strong>Sort code</strong>
                <div>{{ bank.sort_code }}</div>
            </div>
            <div class="flx jc-sb ai-c gap-16">
                <strong>Address</strong>
                <div>{{ bank.address }}</div>
            </div>
        </div>
    </teleport>
</template>

<script>
import { mapState } from 'vuex'
export default {
    name: 'AccountDetailsModal',
    computed: {
        ...mapState({
            bank: (state) => state.forms.tempStorage
        })
    },
    mounted() {
        this.$store.commit('stopFormLoader')
    }
}
</script>
<style lang="scss" scoped>
.pd-24 {
    background: rgba(244, 244, 244, 0.76);
}
</style>