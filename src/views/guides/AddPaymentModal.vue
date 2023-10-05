<template>
    <teleport to="#modal_title">
        Add new details
    </teleport>
    <teleport to="#modal_content">
        <form @submit.prevent="" class="flx column gap-24">
            <div class="form-row column">
                <label for="name">Name on account</label>
                <div class="input-wrapper">
                    <input v-model="form.name" class="form-control" type="text" name="name" id="name"  placeholder="Name on the account">
                </div>
                <span class="input-error" v-if="validation.error && validation.errors.name">
                    {{ validation.errors.name[0] }}
                </span>
            </div>
            <div class="form-row column">
                <label for="account_number">Accoun number</label>
                <div class="input-wrapper">
                    <input v-model="form.account_number" class="form-control" type="text" name="account_number" id="account_number"  placeholder="Account number">
                </div>
                <span class="input-error" v-if="validation.error && validation.errors.account_number">
                    {{ validation.errors.account_number[0] }}
                </span>
            </div>
            <div class="form-row column">
                <label for="bank_name">Bank name</label>
                <div class="input-wrapper">
                    <input v-model="form.bank_name" class="form-control" type="text" name="bank_name" id="bank_name"  placeholder="Bank name">
                </div>
                <span class="input-error" v-if="validation.error && validation.errors.bank_name">
                    {{ validation.errors.bank_name[0] }}
                </span>
            </div>
            <div class="form-row column">
                <label for="sort_code">Sort code</label>
                <div class="input-wrapper">
                    <input v-model="form.sort_code" class="form-control" type="text" name="sort_code" id="sort_code"  placeholder="Sort code">
                </div>
                <span class="input-error" v-if="validation.error && validation.errors.sort_code">
                    {{ validation.errors.sort_code[0] }}
                </span>
            </div>
            <div class="form-row column">
                <label for="address">Address</label>
                <div class="input-wrapper">
                    <input v-model="form.address" class="form-control" type="text" name="address" id="address"  placeholder="Address">
                </div>
                <span class="input-error" v-if="validation.error && validation.errors.address">
                    {{ validation.errors.address[0] }}
                </span>
            </div>
        </form>
    </teleport>
    <teleport to="#modal_footer">
        <button class="button-primary w-100 gap-8 btn-lg" :class="{ 'button-disabled' : submiting }" :disabled="submiting ? true : false">
            <spinner v-if="submiting" :size="18" />
            <span>{{ submiting ? 'Submitting...' : 'Add bank details'}}</span>
        </button> 
    </teleport>
</template>

<script>
import inputValidation from '@/mixins/inputValidation';
import Spinner from '@/components/includes/Spinner.vue';
export default {
    components: { Spinner },
    name: 'AddPaymentModal',
    mixins: [inputValidation],
    data () {
        return {
            form: {
                name: '',
                account_number: '',
                bank_name: '',
                sort_code: '',
                address: ''
            }
        }
    },
    mounted() {
        this.$store.commit('stopFormLoader')
    }
}
</script>
