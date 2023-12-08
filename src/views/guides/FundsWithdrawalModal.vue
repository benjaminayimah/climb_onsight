<template>
    <teleport to="#modal_title">
        Funds withdrawal
    </teleport>
    <teleport to="#modal_content">
        <div class="modal-width">
            <form @submit.prevent="" class="flx column gap-24" id="funds_withdral_form">
                <div class="form-row column">
                    <label for="amount">Amount</label>
                    <div class="input-wrapper">
                        <input v-model="form.amount" class="form-control" type="text" name="amount" id="amount"  placeholder="Amount to withdraw">
                    </div>
                    <span class="input-error" v-if="validation.error && validation.errors.amount">
                        {{ validation.errors.amount[0] }}
                    </span>
                </div>
                <div class="form-row column">
                    <label for="amount">Amount</label>
                    <div class="input-wrapper">
                        <select v-model="form.withdrawal_account" name="withdrawal_account" id="withdrawal_account" class="form-control" :class="{ 'error-border': validation.errors.withdrawal_account }">
                            <option value="" selected>Select saved Bank</option>
                            <option v-for="account in payment_options" :key="account.id">{{ account.bank_name }}</option>
                        </select>
                    </div>
                    <span class="input-error" v-if="validation.error && validation.errors.withdrawal_account">
                        {{ validation.errors.withdrawal_account[0] }}
                    </span>
                </div>
            </form>
        </div>
    </teleport>
    <teleport to="#modal_footer">
        <button class="button-primary w-100 gap-8 btn-lg" :class="{ 'button-disabled' : submiting }" :disabled="submiting ? true : false">
            <spinner v-if="submiting" :size="20" />
            <span>{{ submiting ? 'Submitting...' : 'Withdraw'}}</span>
        </button> 
    </teleport>
</template>

<script>
import inputValidation from '@/mixins/inputValidation';
import Spinner from '@/components/includes/Spinner.vue';
import { mapState } from 'vuex';
export default {
    components: { Spinner },
    name: 'FundsWithdrawal',
    mixins: [inputValidation],
    computed: {
        ...mapState({
            payment_options: (state) => state.payment_options
        })
    },
    data () {
        return {
            form: {
                amount: '',
                withdrawal_account: ''
            }
        }
    },
    mounted() {
        this.$store.commit('stopFormLoader')
    }
}
</script>

<style lang="scss" scoped>
.modal-width {
    width: 560px;
}
</style>