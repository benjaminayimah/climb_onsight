<template>
    <div v-if="forms.active" class="modal-container jc-c ai-c">
        <backdrop :index="100" :opacity="0.5" />
        <div id="main_modal" class="modal overflow-y-scroll scroll-hidden flx column relative">
            <div class="modal-top flx jc-sb ai-c sticky">
                <h3 id="modal_title"></h3>
                <button @click="$store.commit('closeModal')" class="br-50">
                    <svg xmlns="http://www.w3.org/2000/svg" height="14.683" viewBox="0 0 14.647 14.683">
                        <path d="M5648.416,3695.679l-5.629-5.655-5.6,5.59a1,1,0,1,1-1.412-1.415l5.6-5.592-5.584-5.61a1,1,0,1,1,1.418-1.411l5.583,5.608,5.623-5.61a1,1,0,1,1,1.412,1.417l-5.624,5.611,5.631,5.657a1,1,0,1,1-1.418,1.411Z" transform="translate(-5635.478 -3681.291)" fill="#6f7689"/>
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
</template>
<script>
import { defineAsyncComponent } from 'vue';
const AddPaymentModal = defineAsyncComponent(() => import(/* webpackChunkName: AddPaymentModal */ '@/views/guides/AddPaymentModal.vue'));
const FundsWithdrawal = defineAsyncComponent(() => import(/* webpackChunkName: FundsWithdrawal */ '@/views/guides/FundsWithdrawal.vue'));
import { mapState } from 'vuex';
import Backdrop from '../includes/Backdrop.vue';
import LottieLoader from '../lotties/LottieLoader.vue';
export default {
    components: { Backdrop, LottieLoader, AddPaymentModal, FundsWithdrawal },
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
    padding: 6px 28px;
    background-color: hsla(0,0%,100%,.8);
    -webkit-backdrop-filter: saturate(180%) blur(20px);
    backdrop-filter: saturate(180%) blur(20px);
    top: 0;
    button {
        height: 48px;
        width: 48px;
        padding: unset;
        background-color: transparent;
        margin-right: -16px;
        &:hover {
            path{
                fill: var(--ft-dark);
            }
        }
    }
}
.modal-bottom{
    padding: 16px 28px 28px 28px;
    background: linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, white 15%);
    bottom: 0;
}
.modal-body{
    padding: 32px 28px;
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