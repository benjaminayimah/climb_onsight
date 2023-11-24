<template>
    <a href="#" @click.prevent="" class="grid-item table-row table-row grid-col-admins">
        <div class="table-cell gap-8">
            <profile-avatar :id="user.id" :image="user.image"/>
            <span class="wrap-text wrap-line-1 capitalize">{{ user.name }}</span>
        </div>
        <div class="table-cell flx gap-32 cell-hover-show">
            <span class="wrap-text wrap-line-1">{{ user.email }}</span>
            <span @click="copyTextToClipboard(user.email)" class="hidden centered br-50 scale-in">
                <svg xmlns="http://www.w3.org/2000/svg" height="16" viewBox="0 0 23.625 29.25">
                    <path  d="M20.813,3.375h-8.4A2.812,2.812,0,0,0,9.563,6.152v.6H9.035A2.812,2.812,0,0,0,6.188,9.527v20.25a2.872,2.872,0,0,0,2.848,2.848H23.66a2.812,2.812,0,0,0,2.777-2.848V29.25h.6A2.812,2.812,0,0,0,29.813,26.4V12.375Zm0,3.136,5.864,5.864H20.813Zm3.375,23.266a.568.568,0,0,1-.527.6H9.035a.626.626,0,0,1-.6-.6V9.527A.568.568,0,0,1,9.035,9h.527V26.965a2,2,0,0,0,2.285,2.285h12.34ZM27.563,26.4a.568.568,0,0,1-.527.6H12.41a.626.626,0,0,1-.6-.6V6.152a.568.568,0,0,1,.6-.527h6.152v9h9Z" transform="translate(-6.188 -3.375)" fill="#535559"/>
                </svg>
            </span>
        </div>
        <div class="table-cell">
            <div class="flx gap-4 ai-c">
                <div class="flx gap-4" v-if="computedAccess.length">
                    <span v-for="permission in computedAccess" :key="permission.id" class="access br-32 flx ai-c">
                        <span class="uppercase fs-09" :title="permission.name">{{ permission.abbr }}</span>
                        <i>
                            <svg xmlns="http://www.w3.org/2000/svg"  height="8" viewBox="0 0 18.788 14.586">
                                <path d="M3710.728,693.174a1.2,1.2,0,0,1-.838-.341l-6.174-6.019a1.2,1.2,0,0,1,1.675-1.718l5.248,5.116,9.383-11.194a1.2,1.2,0,0,1,1.839,1.542l-10.214,12.186a1.2,1.2,0,0,1-.859.428Z" transform="translate(-3703.354 -678.589)"/>
                            </svg>
                        </i>
                    </span>
                </div>
                <a href="#" class="a-link" @click.prevent="$store.commit('setUpdatePermissions', user)" v-else>Update permissions</a>
                <button @click.prevent="$store.commit('setUpdatePermissions', user)" class="button-primary">
                    <svg xmlns="http://www.w3.org/2000/svg" height="13" viewBox="0 0 16.919 16.166">
                        <path d="M-3593.823-882.342a.749.749,0,0,1-.2-.713l.857-3.427a.75.75,0,0,1,.2-.348l10.708-10.708a2.555,2.555,0,0,1,1.816-.751,2.55,2.55,0,0,1,1.815.751,2.57,2.57,0,0,1,0,3.631l-10.708,10.708a.749.749,0,0,1-.348.2l-3.427.857a.753.753,0,0,1-.181.022A.751.751,0,0,1-3593.823-882.342Zm12.624-14.134-10.561,10.561-.5,2.012,2.012-.5,10.561-10.561a1.067,1.067,0,0,0,0-1.509,1.059,1.059,0,0,0-.754-.312A1.063,1.063,0,0,0-3581.2-896.476Zm-4.385,14.353a.75.75,0,0,1-.75-.75.75.75,0,0,1,.75-.75h7.709a.75.75,0,0,1,.75.75.75.75,0,0,1-.75.75Z" transform="translate(3594.043 898.288)" fill="#fff"/>
                    </svg>
                </button>
            </div>
        </div>
        <div class="table-cell jc-sb">
            <div class="flx ai-c row-actions h-100" @click.prevent="">
                <button @click="$store.commit('preSetTempData', { data: user, modal: 'add_admin'})" class="t-pill-btn">Edit info</button>
                <button @click="$store.commit('preSetTempData', { data: user, modal: 'admin_password'})" class="wrap-text wrap-line-1 t-pill-btn">Reset password</button>
                <button @click="$store.commit('setDeleteModal', {id: user.id, type: 'admin'})" class="delete t-pill-btn">Delete</button>
            </div>
        </div>
    </a>
</template>

<script>
import copyToClipboardMixin from '@/mixins/copyToClipboardMixin'
import ProfileAvatar from './ProfileAvatar.vue'
export default {
    name: 'AdminsTableRow',
    components: { ProfileAvatar },
    mixins: [copyToClipboardMixin],
    props: {
        user: Object
    },
    computed: {
        computedAccess() {
            if (this.user.permissions) {
                return JSON.parse(this.user.permissions).filter(data => data.status === true)
            }
            else
            return []
        }
    }
}
</script>


<style lang="scss" scoped>
a {
    cursor: default;
}
img{
    height: 42px;
    width: 42px;
}
.access {
    background-color: #fff;
    border: 1px solid var(--black);
    padding: 5px 8px;
    gap: 2px;
}
.hidden{
    background-color: var(--bg-color);
    height: 36px;
    width: 36px;
    cursor: pointer;
    &:hover {
        path {
            fill: var(--black);
        }
    }
}
</style>