<template>
    <div v-if="!signedUp" class="stepper-wrapper w-100 flx column gap-32">
        <div class="stepper-title">New skills</div>
        <div>
            <div class="mb-8">
                Add any new skills you would like to learn. Separate items with a comma ","
            </div>
            <div class="input-wrapper mb-16">
                <textarea v-model="form.new_skills" class="w-100 form-control" name="newskill" rows="4" placeholder="Type here..."></textarea>
            </div>
            <button @click="updateNewUser" class="button-primary gap-8 w-100 btn-lg ai-c" :class="{ 'button-disabled' : submiting }" :disabled="submiting ? true : false">
                <spinner v-if="submiting" :size="20" :color="'#fff'" />
                <span>{{ submiting ? 'Please wait...' : 'Finish'}}</span>
            </button>
            <router-link :to="{ name: 'ClimberFunFacts'}" class="w-100 a-button mt-16">Back</router-link>
        </div>
    </div>
    <div v-else class="flx ai-c w-100 column gap-16">
        <svg xmlns="http://www.w3.org/2000/svg" height="4" viewBox="0 0 204 4">
            <g transform="translate(-831 -590.5)">
                <line x2="200" transform="translate(833 592.5)" fill="none" stroke="rgba(0,0,0,0.2)" stroke-linecap="round" stroke-width="4"/>
                <line :x2="progressFill" transform="translate(833 592.5)" fill="none" stroke="#000" stroke-linecap="round" stroke-width="4"/>
            </g>
        </svg>
        <span>Signing in...</span>
    </div>
</template>

<script>
import axios from 'axios'
import inputValidation from '@/mixins/inputValidation'
import signupLoaderMixin from '@/mixins/signupLoaderMixin'
import { mapState } from 'vuex'
import Spinner from '@/components/includes/Spinner.vue'
export default {
    components: { Spinner },
    name: 'ClimberInterestedNewSkills',
    mixins: [inputValidation, signupLoaderMixin],
    computed: {
        ...mapState({
            hostname: (state) => state.hostname,
            newUser: (state) => state.newUser,
            user: (state) => state.user,
            token: (state) => state.token
        })
    },
    data() {
        return {
            form: {
                new_skills: '',
            },
            newToken: JSON.parse(localStorage.getItem('newToken')),
        }
    },
    methods: {
        async updateNewUser() {
            this.startSpinner()
            await this.$store.commit('updateNewSkills', this.form)
            this.submitUpdates()
        },
        submitUpdates() {
            const form = this.newUser
            const url = this.hostname + '/api/user/'+this.user.id +'?token=' + this.newToken
            axios.put(url, form)
            .then((res) => {
                this.startProgress()
                this.$store.commit('handleSignedUp')
                this.stopSpinner()
                this.signUpSuccessful(res.data)
            })
            .catch(() => {
                this.stopSpinner()
                this.stopProgress()
            })
        },
        signUpSuccessful(res) {
            const payload = {
                user: res,
                token: this.newToken
            }
            setTimeout(()=> {
                this.signinSuccess(payload)
            }, 2000)
        },
        presetForm() {
            if(this.newUser.new_skills) {
                this.form.new_skills = this.newUser.new_skills.join(',')
            }
        }
    },
    mounted() {
        this.presetForm()
    }
}
</script>

<style lang="scss" scoped>
.profile-summary {
    --margin: 32px;
    --padding: 30px;
    z-index: 9999;
    height: calc(100dvh - var(--margin)*2);
    width: 60%;
    max-width: 1000px;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    margin: var(--margin) 0;
    padding: var(--padding);
}


.botton-bar {
    inset: auto auto 40px auto;
    width: calc(100% - var(--padding) * 2);
    button {
        padding-left: 60px;
        padding-right: 60px;
    }
}
@media screen and (max-width: 1280px){
    .profile-summary {
        width: 80%;
    }
}
@media screen and (max-width: 980px){
    .profile-summary {
        width: 90%;
    }
}
@media screen and (max-width: 799px){
    .profile-summary {
        width: 95%;
    }
}
</style>