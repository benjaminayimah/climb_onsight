<template>
    <teleport to="body">
        <backdrop :index="401" :opacity="0.5" />
        <div class="modal-container fixed flx jc-c ai-c">
            <div class="bg-white flx column gap-24 text-center top-overlay br-24 pd-24">
                <svg xmlns="http://www.w3.org/2000/svg" height="60" viewBox="0 0 17.5 21">
                    <path d="M-3568.023-836.575a6.145,6.145,0,0,1-1.2-2.411c-.266-.878-.493-1.9-.78-3.2l-.152-.686c-.69-3.1-.346-5.1,1.082-6.3a6.375,6.375,0,0,1,2.894-1.23,22.93,22.93,0,0,1,4.43-.345,22.933,22.933,0,0,1,4.431.345,6.39,6.39,0,0,1,2.894,1.23c1.427,1.2,1.771,3.2,1.082,6.3l-.151.684c-.287,1.3-.514,2.326-.78,3.2a6.145,6.145,0,0,1-1.2,2.411c-1.031,1.148-2.731,1.575-6.273,1.575S-3566.992-835.427-3568.023-836.575Zm2.189-12.115a4.815,4.815,0,0,0-2.116.857c-1.145.958-.832,3.072-.5,4.578q.08.355.152.686c.279,1.264.5,2.262.745,3.075a4.667,4.667,0,0,0,.829,1.75c.463.517,1.387.995,4.971.995s4.508-.478,4.971-.995a4.672,4.672,0,0,0,.828-1.75c.247-.815.467-1.812.746-3.074q.073-.332.152-.687c.7-3.146.051-4.119-.5-4.578a4.82,4.82,0,0,0-2.116-.857,21.307,21.307,0,0,0-4.085-.31A21.3,21.3,0,0,0-3565.834-848.69Zm6.709,8.44v-5.25a.875.875,0,0,1,.875-.876.875.875,0,0,1,.875.876v5.25a.874.874,0,0,1-.875.875A.874.874,0,0,1-3559.125-840.25Zm-3.5,0v-5.25a.876.876,0,0,1,.875-.876.876.876,0,0,1,.876.876v5.25a.875.875,0,0,1-.876.875A.875.875,0,0,1-3562.625-840.25Zm-3.517,0v-5.25a.875.875,0,0,1,.875-.876.875.875,0,0,1,.875.876v5.25a.874.874,0,0,1-.875.875A.875.875,0,0,1-3566.142-840.25Zm11.816-10.625a14.576,14.576,0,0,0-7.424-1.625c-3.911,0-6.362.943-7.4,1.611a.876.876,0,0,1-1.21-.264.875.875,0,0,1,.264-1.209,14.509,14.509,0,0,1,6.6-1.827v-.937a.875.875,0,0,1,.875-.875h1.751a.875.875,0,0,1,.875.875v.937a14.935,14.935,0,0,1,6.576,1.814.874.874,0,0,1,.3,1.2.875.875,0,0,1-.75.424A.869.869,0,0,1-3554.326-850.875Z" transform="translate(3570.5 856)" fill="#f13c3c"/>
                </svg>
                <div class="delete-info">
                    <h3>Delete {{ deleteModal.type }}</h3>
                    <span>Are you sure you want to delete this {{ deleteModal.type }}?</span>
                </div>
                <div class="flx gap-8 column">
                    <button @click="$store.commit('doDelete', 'admin')" class="button-danger btn-md gap-8 w-100 btn-rounded" :class="{ 'button-disabled' : deleteModal.deleting }" :disabled="deleteModal.deleting ? true : false">
                        <spinner v-if="deleteModal.deleting" :size="20" />
                        <span>{{ deleteModal.deleting ? 'Deleting...' : 'Yes, Delete' }}</span>
                    </button>
                    <button  @click="$store.commit('closeDeleteModal')" class="button-outline w-100 btn-rounded btn-md bg-transparent">Cancel</button>
                </div>
            </div>
        </div>
    </teleport>
</template>

<script>
import { mapState } from 'vuex'
import Backdrop from './Backdrop.vue'
import Spinner from './Spinner.vue'
export default {
    name: 'DeleteModal',
    components: { Backdrop, Spinner },
    computed: {
        ...mapState({
            deleteModal: (state) => state.deleteModal
        })
    }

}
</script>

<style lang="scss" scoped>
.top-overlay {
    width: 350px;
}
.modal-container {
    margin: 0 20px;
    z-index: 402;
}
</style>