<template>
    <teleport to="#modal_title">
        Add new admin
    </teleport>
    <teleport to="#modal_content">
        <div class="mb-16">{{ permissions ? 'What would they have access to?' : 'Please fill out the form' }}</div>
        <form v-if="!permissions" @submit.prevent="" class="flx column gap-24">
            <div class="form-row column">
                <label for="name">Admin name</label>
                <div class="input-wrapper">
                    <input v-model="form.name" class="form-control" type="text" name="name" id="name"  placeholder="Name of admin">
                </div>
                <span class="input-error" v-if="validation.error && validation.errors.name">
                    {{ validation.errors.name[0] }}
                </span>
            </div>
            <div class="form-row column">
                <label for="email">Email</label>
                <div class="input-wrapper">
                    <input v-model="form.email" class="form-control" type="email" name="email" id="email"  placeholder="Enter email">
                </div>
                <span class="input-error" v-if="validation.error && validation.errors.email">
                    {{ validation.errors.email[0] }}
                </span>
            </div>
            <div class="form-row column">
                <label for="password">Password</label>
                <div class="input-wrapper">
                    <input v-model="form.password" class="form-control" type="password" name="password" id="password"  placeholder="Enter password">
                </div>
                <span class="input-error" v-if="validation.error && validation.errors.password">
                    {{ validation.errors.password[0] }}
                </span>
            </div>
        </form>
        <div v-else>
            <div class="flx flx-1 flx-wrap gap-24">
                <access-list v-for="access in adminAccess" :key="access.id" :access="access" @do-check="doCheck" />
            </div>
        </div>
    </teleport>
    <teleport to="#modal_footer">
        <div class="text-center flx jc-c">
            <button v-if="!permissions" @click="next" class="button-primary btn-rounded gap-8 btn-lg">
                <span>Next</span>
            </button>
            <button v-else @click="doSubmit" class="button-primary btn-rounded gap-8 btn-lg" :class="{ 'button-disabled' : submiting }" :disabled="submiting ? true : false">
                <spinner v-if="submiting" :size="18" />
                <span>{{ submiting ? 'Submitting...' : 'Finish up'}}</span>
            </button> 
        </div>
    </teleport>
</template>

<script>
import inputValidation from '@/mixins/inputValidation';
import Spinner from '@/components/includes/Spinner.vue';
import AccessList from '@/components/includes/AccessList.vue';
export default {
    components: { Spinner, AccessList },
    name: 'AddAdminsModal',
    mixins: [inputValidation],
    data () {
        return {
            form: {
                name: '',
                email: '',
                password: ''
            },
            adminAccess: [
                {id: 1, name: 'events', abbr:'e', status: false},
                {id: 2, name: 'climbers', abbr:'c', status: false},
                {id: 3, name: 'guides', abbr:'g', status: false},
                {id: 4, name: 'stats', abbr:'s', status: false},
                {id: 5, name: 'locations', abbr:'l', status: false},
                {id: 6, name: 'payments', abbr:'p', status: false},
                {id: 7, name: 'merchandise', abbr:'m', status: false}
            ],
            permissions: false
        }
    },
    methods: {
        next() {
            this.permissions = !this.permissions
        },
        doCheck(id) {
            const i = this.adminAccess.findIndex(data => data.id === id)
            this.adminAccess[i].status = !this.adminAccess[i].status
        },
        doSubmit() {
            this.$store.commit('closeModal')
        }
    },
    mounted() {
        this.$store.commit('stopFormLoader')
    }
}
</script>
<style scoped>
.btn-lg {
    padding-left: 75px;
    padding-right: 75px;

}
</style>
