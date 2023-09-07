<template>
    <div class="stepper-wrapper w-100 flx column gap-32">
        <div class="stepper-title">New skills</div>
        <div>
            <div class="mb-8">Add new skills you would like to learn</div>
            <div class="input-wrapper mb-16">
                <textarea v-model="form.new_skills" class="w-100 form-control" name="newskill" rows="4" placeholder="Type here..."></textarea>
            </div>
            <button @click="updateNewUser" class="button-primary gap-8 w-100 btn-lg ai-c" :class="{ 'button-disabled' : submiting }" :disabled="submiting ? true : false">
                <spinner v-if="submiting" />
                <span>{{ submiting ? 'Please wait...' : 'Finish'}}</span>
            </button>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import inputValidation from '@/mixins/inputValidation'
import { mapState } from 'vuex'
import Spinner from '@/components/includes/Spinner.vue'
export default {
    components: { Spinner },
    name: 'ClimberInterestedNewSkills',
    mixins: [inputValidation],
    computed: {
        ...mapState({
            hostname: (state) => state.hostname,
        })
    },
    data() {
        return {
            form: {
                new_skills: JSON.parse(localStorage.getItem('newUser')).form.new_skills || '',
            },
            token: JSON.parse(localStorage.getItem('newUser')).token
        }
    },
    methods: {
        updateNewUser() {
            this.startSpinner()
            let stored = JSON.parse(localStorage.getItem('newUser'))
            stored.form.new_skills = this.form.new_skills
            localStorage.setItem('newUser', JSON.stringify(stored))
            this.submitUpdates()
        },
        submitUpdates() {
            const form = JSON.parse(localStorage.getItem('newUser')).form
            const url = this.hostname + '/api/user'
            const headers = {
                'Content-Type' : 'application/json',
                'Authorization' : `Bearer ${this.token}`
            }
            axios.put(url, form, { headers })
            .then((res) => {
                console.log(res.data) 
                this.stopSpinner()         
            })
            .catch(e => {
                console.error(e.response)
                this.stopSpinner()
            })

        }
    }
}
</script>

<style lang="scss" scoped>

</style>