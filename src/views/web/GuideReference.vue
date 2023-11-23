<template>
    <div class="stepper-wrapper w-100 flx column gap-24">
        <div class="stepper-title">Referees</div>
        <form @submit.prevent="" id="guide_ref_form">
            <div v-if="systemErr.error" class="invalid-credentials response-message text-center mb-32">
                <span>{{ systemErr.message }}</span>
            </div>
            <div class="form-wrapper flx column gap-24">
                <div>
                    <guide-referees-input-row v-for="(referee, index) in referees"
                        :key="referee.id"
                        :form="referee"
                        :index="index"
                        :length="referees.length"
                        @remove-row="removeRow"
                        @add-form-input="addFormInput"
                        :class="{'bt' : referees.length > 1}"
                    />
                </div>
                <button @click="addNewRow" class="button-outline btn-lg gap-8">
                    <i class="br-50 centered">
                        <svg xmlns="http://www.w3.org/2000/svg" height="11" viewBox="0 0 11.521 11.521">
                            <path  d="M19.678,26.263V21.326H14.74V19.68h4.938V14.742h1.646V19.68h4.938v1.646H21.324v4.938Z" transform="translate(-14.74 -14.742)" fill="#fff"/>
                        </svg>
                    </i>
                    Add more references
                </button>
                <button @click.prevent="updateNewGuide" class="button-primary gap-8 w-100 btn-lg ai-c">
                    <spinner v-if="submiting" :size="18"/>
                    <span>{{ submiting ? 'Submitting...' : 'Finish up'}}</span>
                </button>
            </div>
        </form>
    </div>
</template>

<script>
import axios from 'axios'
import inputValidation from '@/mixins/inputValidation'
import { mapState } from 'vuex'
import GuideRefereesInputRow from '@/components/includes/GuideRefereesInputRow.vue'
import Spinner from '@/components/includes/Spinner.vue'
export default {
    components: { GuideRefereesInputRow, Spinner },
    name: 'GuideReference',
    mixins: [inputValidation],
    computed: {
        ...mapState({
            newGUide: (state) => state.data.newGuide,
            hostname: (state) => state.hostname
        })
    },
    data() {
        return {
            referees: [],
            errors: []
        }
    },
    methods: {
        addNewRow() {
            const data = { id: new Date().getTime(), name: '', email: '', phone: '' }
            this.referees.push(data)
        },
        removeRow(index) {
            const i = index
            this.referees.splice(i, 1);
        },
        addFormInput(payload) {
            const i = this.referees.findIndex(x => x.id == payload.id)
            this.referees.splice(i, 1, payload)
        },
        async updateNewGuide() {
            this.systemErr.error ? this.clearErrs() : ''
            this.referees.forEach(form => {
                if(!form.name || !form.email || !form.phone) {
                    this.errorResponse({response: { data: 'Please fill out all referee\'s fields!'}})
                }
            })
            if(!this.systemErr.error) {
                await this.$store.commit('updateGuideReferees', this.referees)
                this.submitGuide()
            }
        },
        async submitGuide() {
            this.startSpinner()
            try {
                const res = await axios.post(this.hostname+'/api/register-guide', this.newGUide)
                this.signUpSuccess(res.data)
                this.stopSpinner()
            } catch (e) {
                this.errorResponse(e)
                this.stopSpinner()
            }
        },
        async signUpSuccess(res) {
            await this.$store.commit('updateGuideCompleted')
            this.$router.push({ name: 'GuideRegistrationComplete', query: { status: res }, replace: true})
        },
        presetForm() {
            this.newGUide.referees ? this.referees = this.newGUide.referees : this.referees.push({ id: 1, name: '', email: '', phone: ''})
        }
    },
    mounted() {
        this.presetForm()
    }
}
</script>

<style lang="scss" scoped>
.button-outline {
    i {
        height: 30px;
        width: 30px;
        background-color: #000;
    }
}
.bt {
    border-bottom: 1px solid #ebebeb;
    padding: 24px 0;
}
</style>