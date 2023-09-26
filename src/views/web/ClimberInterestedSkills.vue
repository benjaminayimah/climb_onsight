<template>
    <div class="stepper-wrapper w-100 flx column gap-32">
        <div class="stepper-title">New skills</div>
        <div>
            <div class="mb-8">Add new skills you would like to learn. Separate items by a comma(",")</div>
            <div class="input-wrapper mb-16">
                <textarea v-model="form.new_skills" class="w-100 form-control" name="newskill" rows="4" placeholder="Type here..."></textarea>
            </div>
            <button @click="updateNewUser" class="button-primary gap-8 w-100 btn-lg ai-c" :class="{ 'button-disabled' : submiting }" :disabled="submiting ? true : false">
                <spinner v-if="submiting" :size="18" />
                <span>{{ submiting ? 'Please wait...' : 'Finish'}}</span>
            </button>
        </div>
    </div>
    <teleport to="body" v-if="completed">
        <backdrop :index="999" :opacity="0.7" />
        <div class="fixed profile-summary bg-white br-16">
            <div class="flx jc-sb">
                <h3>Review your profile</h3>
                <button @click="close" class="btn-close scale-in bg-transparent">
                    <svg xmlns="http://www.w3.org/2000/svg" height="13" viewBox="0 0 13.587 13.587">
                        <path d="M7.163,19.188,5.8,17.83,11.239,12.4,5.8,6.96,7.163,5.6,12.6,11.036,18.033,5.6,19.392,6.96,13.957,12.4l5.435,5.435-1.359,1.359L12.6,13.754Z" transform="translate(-5.805 -5.602)" fill="#1c1b1f"/>
                    </svg>
                </button>
            </div>
            <div>
                <profile-body :user="user" />
                <div class="absolute flx jc-c botton-bar">
                    <button @click="fetchUser" class="button-primary gap-8 btn-md login-btn" :class="{ 'button-disabled' : submiting }" :disabled="submiting ? true : false">
                        <spinner v-if="submiting" :size="18" />
                        <span>{{ submiting ? 'Loging in...' : 'Log in'}}</span>
                    </button>
                </div>
            </div>
        </div>
    </teleport>
</template>

<script>
import axios from 'axios'
import inputValidation from '@/mixins/inputValidation'
import { mapState } from 'vuex'
import Spinner from '@/components/includes/Spinner.vue'
import Backdrop from '@/components/includes/Backdrop.vue'
import ProfileBody from '@/components/layouts/ProfileBody.vue'
export default {
    components: { Spinner, Backdrop, ProfileBody },
    name: 'ClimberInterestedNewSkills',
    mixins: [inputValidation],
    computed: {
        ...mapState({
            hostname: (state) => state.hostname,
            newUser: (state) => state.newUser.form,
            user: (state) => state.user
        })
    },
    data() {
        return {
            form: {
                new_skills: '',
            },
            token: JSON.parse(localStorage.getItem('newUser')).token,
            completed: false,
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
            const url = this.hostname + '/api/user/'+this.user.id +'?token=' + this.token
            axios.put(url, form)
            .then((res) => {
                this.signUpSuccessful(res.data)    
            })
            .catch(() => {
                this.stopSpinner()
            })
        },
        signUpSuccessful(res) {
            this.$store.commit('updateClimber', res)
            this.stopSpinner()
            this.completed = true
        },
        close() {
            this.completed = false
        },
        async fetchUser() {
            this.startSpinner()
            await this.$store.dispatch('getAuthUser', this.token)
            await this.$store.commit('setToken', this.token)
            this.$router.push({ name: 'Home' })
            this.stopSpinner()
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