<template>
    <div v-if="forms.active" class="modal-container fixed flx jc-c ai-c">
        <teleport to="body">
            <backdrop :index="100" :opacity="0.5" />
        </teleport>
        <div id="main_modal" class="modal overflow-y-scroll scroll-hidden flx column relative">
            <div class="modal-top flx jc-sb ai-c sticky">
                <h3 id="modal_title"></h3>
                <button data-tooltip="Close" @click="$store.commit('closeModal')" class="btn-close scale-in bg-transparent tooltip">
                    <svg xmlns="http://www.w3.org/2000/svg" height="10" viewBox="0 0 13.587 13.587">
                        <path d="M7.163,19.188,5.8,17.83,11.239,12.4,5.8,6.96,7.163,5.6,12.6,11.036,18.033,5.6,19.392,6.96,13.957,12.4l5.435,5.435-1.359,1.359L12.6,13.754Z" transform="translate(-5.805 -5.602)" fill="#1c1b1f"/>
                    </svg>
                    <tool-tip />
                </button>
            </div>
            <div class="modal-body">
                <div id="modal_content">
                    <lottie-loader :size="50" v-if="forms.loader" />
                </div>
            </div>
            <div class="modal-bottom sticky" id="modal_footer"></div>
        </div>
    </div>
    <add-payment-modal v-if="forms.modal === 'new_payment'" />
    <funds-withdrawal-modal v-if="forms.modal ==='withdraw_funds'" />
    <registered-banks-modal v-if="forms.modal === 'banks'" />
    <add-admins-modal v-if="forms.modal === 'add_admin'" />
    <new-guide-modal v-if="forms.modal === 'new_guide'" />
    <profile-edit-modal v-if="forms.modal === 'profile_edit'" />
    <results-modal v-if="forms.modal === 'search_result'"/>
    <reset-admin-password v-if="forms.modal === 'admin_password'" />
    <event-edit-modal v-if="forms.modal === 'event_edit'"/>
    <user-modal v-if="forms.modal === 'view_user'" />
</template>
<script>
import { defineAsyncComponent } from 'vue';
const AddAdminsModal = defineAsyncComponent(() => import(/* webpackChunkName: AddAdminsModal */ '@/views/admin/AddAdminsModal.vue'))
const RegisteredBanksModal = defineAsyncComponent(() => import(/* webpackChunkName: RegisteredBanksModal */ '@/views/guides/RegisteredBanksModal.vue'))
const AddPaymentModal = defineAsyncComponent(() => import(/* webpackChunkName: AddPaymentModal */ '@/views/guides/AddPaymentModal.vue'));
const FundsWithdrawalModal = defineAsyncComponent(() => import(/* webpackChunkName: FundsWithdrawalModal */ '@/views/guides/FundsWithdrawalModal.vue'));
const NewGuideModal = defineAsyncComponent(() => import(/* webpackChunkName: NewGuideModal */ '@/views/admin/NewGuideModal.vue'));
const ProfileEditModal = defineAsyncComponent(() => import(/* webpackChunkName: ProfileEditModal */ '@/views/app/ProfileEditModal.vue'))
const ResultsModal = defineAsyncComponent(() => import(/* webpackChunkName: ResultsModal */ '@/views/climbers/ResultsModal.vue'))
const ResetAdminPassword = defineAsyncComponent(() => import(/* webpackChunkName: ResetAdminPassword */ '@/views/admin/ResetAdminPassword.vue'))
const EventEditModal = defineAsyncComponent(() => import(/* webpackChunkName: EventEditModal */ '@/views/guides/EventEditModal.vue'))
const UserModal = defineAsyncComponent(() => import(/* webpackChunkName: UserModal */ '@/views/app/UserModal.vue'))


import { mapState } from 'vuex';
import Backdrop from '../includes/Backdrop.vue';
import LottieLoader from '../lotties/LottieLoader.vue';
import ToolTip from '../includes/ToolTip.vue';
export default {
    components: { Backdrop, LottieLoader, AddPaymentModal, FundsWithdrawalModal, RegisteredBanksModal, AddAdminsModal, NewGuideModal, ProfileEditModal, ResultsModal, ResetAdminPassword, EventEditModal, UserModal, ToolTip  },
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
    // width: 560px;
    // z-index: 110;
    border-radius: 24px;
    background-color: #fff;
}
.modal-container{
    inset: 0;
    z-index: 400;
}
.modal-top, .modal-bottom {
    z-index: 1;
}
.modal-top{
    padding: 28px 28px 12px 28px;
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
// @media screen and (max-width: 590px){
//     .modal{
//         width: 430px;
//     }
// }
@media screen and (max-width: 430px){
    .modal:not(#onboarding_modal){
        // max-width: 100%;
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