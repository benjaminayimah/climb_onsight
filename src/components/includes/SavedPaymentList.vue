<template>
    <div class="br-16 pd-16-24 flx ai-c jc-sb">
        <div>
            <div class="mb-8">{{ bank.name }}</div>
            <span class="gray">{{ bank.bank_name }}</span>
        </div>
        <div>
            <button class="button-primary btn-sm btn-rounded">Details</button>
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