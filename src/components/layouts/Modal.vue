<template>
    <div v-if="forms.active" class="modal-container jc-c ai-c">
        <backdrop :index="100" :opacity="0.5" />
        <div id="main_modal" class="modal overflow-y-scroll scroll-hidden flx column relative">
            <div class="modal-top flx jc-sb ai-c sticky">
                <h3 id="modal_title"></h3>
                <button @click="$store.commit('closeModal')" class="btn-close scale-in bg-transparent">
                    <svg xmlns="http://www.w3.org/2000/svg" height="10" viewBox="0 0 13.587 13.587">
                        <path d="M7.163,19.188,5.8,17.83,11.239,12.4,5.8,6.96,7.163,5.6,12.6,11.036,18.033,5.6,19.392,6.96,13.957,12.4l5.435,5.435-1.359,1.359L12.6,13.754Z" transform="translate(-5.805 -5.602)" fill="#1c1b1f"/>
                    </svg>
                </button>
            </div>
            <div class="modal-body">
                <div id="modal_content">
                    <lottie-loader v-if="forms.loader" />
                </div>
            </div>
            <div class="modal-bottom sticky" id="modal_footer"></div>
        </div>
    </div>
    <add-payment-modal v-if="forms.new_payment" />
    <funds-withdrawal v-else-if="forms.withdraw_funds" />
    <account-details-modal v-else-if="forms.account_details"/>
    <registered-banks-modal v-else-if="forms.banks" />
</template>
<script>
import { defineAsyncComponent } from 'vue';
const RegisteredBanksModal = defineAsyncComponent(() => import(/* webpackChunkName: RegisteredBanksModal */ '@/views/guides/RegisteredBanksModal.vue'))
const AccountDetailsModal = defineAsyncComponent(() => import(/* webpackChunkName: AccountDetailsModal */ '@/views/guides/AccountDetailsModal.vue'))
const AddPaymentModal = defineAsyncComponent(() => import(/* webpackChunkName: AddPaymentModal */ '@/views/guides/AddPaymentModal.vue'));
const FundsWithdrawal = defineAsyncComponent(() => import(/* webpackChunkName: FundsWithdrawal */ '@/views/guides/FundsWithdrawal.vue'));
import { mapState } from 'vuex';
import Backdrop from '../includes/Backdrop.vue';
import LottieLoader from '../lotties/LottieLoader.vue';
export default {
    components: { Backdrop, LottieLoader, AddPaymentModal, FundsWithdrawal, AccountDetailsModal, RegisteredBanksModal },
    name: 'MainModal',
    computed: {
        ...mapState({
            forms: (state) => state.forms,
        })
    }
}
</script>

<style lang="scss" scoped>
  // pointer-events: none !important;
.modal{
    max-height: 90vh;
    width: 560px;
    z-index: 110;
    border-radius: 24px;
    background-color: #fff;
}
.modal-container{
    position: fixed;
    inset: 0;
    display: flex;
    z-index: 400;
}
.modal-top, .modal-bottom {
    z-index: 1;
}
.modal-top{
    padding: 20px 28px 12px 28px;
    background-color: hsla(0,0%,100%,.8);
    -webkit-backdrop-filter: saturate(180%) blur(20px);
    backdrop-filter: saturate(180%) blur(20px);
    top: 0;
}
.modal-bottom{
    padding: 16px 28px 28px 28px;
    background: linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, white 15%);
    bottom: 0;
}
.modal-body{
    padding: 20px 28px;
}

.modal-top, .modal-bottom {
    z-index: 1;
}
@media screen and (max-width: 640px){
    .modal-bottom{
        background: unset;
    }
}
@media screen and (max-width: 590px){
    .modal{
        width: 430px;
    }
}
@media screen and (max-width: 430px){
    .modal:not(#onboarding_modal){
        max-width: 100%;
        max-height: 100dvh;
        border-radius: 0;
        min-height: 100%;
        .modal-body{
            height: 100%;
            flex-grow: 1;
        }
    }

}


</style>