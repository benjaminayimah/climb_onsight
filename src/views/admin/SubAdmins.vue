<template>
    <section class="main">
        <div class="main-wrapper">
            <div v-if="admins.length" class="flx jc-sb ai-c">
                <h1>Sub Admins</h1>
                <button @click="$store.commit('openModal', 'add_admin')" class="button-primary btn-sm-lng gap-8">
                    <svg xmlns="http://www.w3.org/2000/svg" height="14" viewBox="0 0 11.521 11.521">
                        <path d="M19.678,26.263V21.326H14.74V19.68h4.938V14.742h1.646V19.68h4.938v1.646H21.324v4.938Z" transform="translate(-14.74 -14.742)" fill="#fff"/>
                    </svg>
                    Add new
                </button>
            </div>
            <div v-if="!admins.length" class="h-100 centered">
                <div class="flx column ai-c gap-24">
                    <div class="pd-50 br-24 bg-white text-center">
                        You currently have no admins. They will appear here when you add new ones. Click the button to add.
                    </div>
                    <div>
                        <button @click="$store.commit('openModal', 'add_admin')" class="button-primary btn-sm-lng gap-8">
                            <svg xmlns="http://www.w3.org/2000/svg" height="14" viewBox="0 0 11.521 11.521">
                                <path d="M19.678,26.263V21.326H14.74V19.68h4.938V14.742h1.646V19.68h4.938v1.646H21.324v4.938Z" transform="translate(-14.74 -14.742)" fill="#fff"/>
                            </svg>
                            Add new
                        </button>
                    </div>
                </div>
            </div>
            <div v-else>
                <div class="grid-table">
                    <div class="grid table-body overflow-y-scroll">
                        <div class="grid-item table-head grid-col-admins">
                            <h4 class="table-cell wrap-text wrap-line-1">Name</h4>
                            <h4 class="table-cell wrap-text wrap-line-1">Email</h4>
                            <h4 class="table-cell wrap-text wrap-line-1">Permissions</h4>
                            <h4 class="table-cell wrap-text wrap-line-1">Actions</h4>
                        </div>
                        <admins-table-row v-for="admin in admins" :key="admin.id" :user="admin" />
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
import AdminsTableRow from '@/components/includes/AdminsTableRow.vue'
import { mapState } from 'vuex'
export default {
    components: { AdminsTableRow },
    name: 'SubAdmins',
    computed: {
        ...mapState({
            admins: (state) => state.admins
        })
    }
}
</script>

<style lang="scss" scoped>
.main-wrapper {
    height: calc(100dvh - 155px);
}
.bg-white {
    max-width: 400px;
}
.btn-sm-lng {
    padding-top: 15px;
    padding-bottom: 15px;

}

.grid-col-admins{
    grid-template-columns: 1fr 1fr 1.3fr 1.3fr;
}
</style>