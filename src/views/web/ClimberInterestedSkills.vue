<template>
    <div class="stepper-wrapper w-100 flx column gap-32">
        <div class="stepper-title">New skills</div>
        <div>
            <div class="mb-8">Add new skills you would like to learn. Separate items by a comma(",")</div>
            <div class="input-wrapper mb-16">
                <textarea v-model="form.new_skills" class="w-100 form-control" name="newskill" rows="4" placeholder="Type here..."></textarea>
            </div>
            <button @click="updateNewUser" class="button-primary gap-8 w-100 btn-lg ai-c" :class="{ 'button-disabled' : submiting }" :disabled="submiting ? true : false">
                <spinner v-if="submiting" />
                <span>{{ submiting ? 'Please wait...' : 'Finish'}}</span>
            </button>
        </div>
    </div>
    <teleport to="body" v-if="completed">
        <backdrop :index="999" :opacity="0.7" />
        <div class="fixed profile-summary bg-white br-16">
            <div class="flx jc-sb">
                <h3>Review your profile</h3>
                <button @click="close" class="btn-close bg-transparent">
                    <svg xmlns="http://www.w3.org/2000/svg" height="13" viewBox="0 0 13.587 13.587">
                        <path d="M7.163,19.188,5.8,17.83,11.239,12.4,5.8,6.96,7.163,5.6,12.6,11.036,18.033,5.6,19.392,6.96,13.957,12.4l5.435,5.435-1.359,1.359L12.6,13.754Z" transform="translate(-5.805 -5.602)" fill="#1c1b1f"/>
                    </svg>
                </button>
            </div>
            <div class="grid grid-col-2 gap-32 overflow-y-scroll scroll-hidden h-100 body-wrapper">
                <div>
                    <div class="bg-img br-16 relative mb-16">
                        <button class="absolute fs-09">Change profile picture</button>
                    </div>
                    <div class="flx jc-sb mb-32">
                        <h3>{{ user.full_name }}</h3>
                        <div class="pill">0 Completed Events</div>
                    </div>
                    <div class="flx jc-sb mb-24">
                        <div>
                            <label class="gray">Interest</label>
                            <div>Mountain climbing</div>
                        </div>
                        <div>
                            <button class="button-primary btn-sm btn-rounded">Edit profile</button>
                        </div>
                    </div>
                    <div class="mb-24">
                        <label class="gray">Climber fun facts</label>
                        <div>
                            {{ newUser.bio || 'n/a' }}
                        </div>
                    </div>
                    <div class="flx gap-16 flx-wrap">
                        <div>
                            <label class="gray">Email</label>
                            <div>{{ user.email }}</div>
                        </div>
                        <div>
                            <label class="gray">Phone</label>
                            <div>{{ user.phone_number || 'n/a' }}</div>
                        </div>
                        <div>
                            <label class="gray">Age</label>
                            <div>{{ calculateAge(newUser.DOB) }}</div>
                        </div>
                        <div>
                            <label class="gray">Sex</label>
                            <div class="capitalize">{{ newUser.gender}}</div>
                        </div>
                        <div>
                            <label class="gray">Proficiency</label>
                            <div v-if="newUser.skills && newUser.skills.length" >
                                <li v-for="skill in newUser.skills" :key="skill">{{ skill }}</li>
                            </div>
                            <div v-else>
                                n/a
                            </div>
                        </div>
                        <div>
                            <label class="gray">Activity</label>
                            <div>
                                <li v-for="activity in newUser.activities" :key="activity.name">
                                    {{ activity.name }} ({{ activity.limit }}%)
                                </li>
                            </div>
                        </div>
                        <div>
                            <label class="gray">New skills</label>
                            <div v-if="newUser.new_skills && newUser.new_skills.length" >
                                <li v-for="skill in newUser.new_skills" :key="skill">{{ skill }}</li>
                            </div>
                            <div v-else>
                                n/a
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <div class="flx jc-sb mb-32">
                        <span class="pill ft-secondary centered">Gallery</span>
                        <button class="button-primary btn-sm btn-rounded">Add image to gallery</button>
                    </div>
                    <div class="flx flx-wrap gap-16">
                        <div class="grid-item bg-img"></div>
                        <div class="grid-item bg-img"></div>
                        <div class="grid-item bg-img"></div>
                        <div class="grid-item bg-img"></div>
                        <div class="grid-item bg-img"></div>
                        <div class="grid-item bg-img"></div>
                    </div>
                </div>
                <div class="absolute flx jc-c botton-bar">
                    <button @click="logIn" class="button-primary gap-8 btn-md login-btn" :class="{ 'button-disabled' : submiting }" :disabled="submiting ? true : false">
                        <spinner v-if="submiting" />
                        <span>{{ submiting ? 'Loging in...' : 'Log in'}}</span>
                    </button>
                </div>
            </div>
        </div>
    </teleport>
</template>

<script>
import formatDateTime from '@/mixins/formatDateTime'
import axios from 'axios'
import inputValidation from '@/mixins/inputValidation'
import { mapState } from 'vuex'
import Spinner from '@/components/includes/Spinner.vue'
import Backdrop from '@/components/includes/Backdrop.vue'
export default {
    components: { Spinner, Backdrop },
    name: 'ClimberInterestedNewSkills',
    mixins: [inputValidation, formatDateTime],
    computed: {
        ...mapState({
            hostname: (state) => state.hostname,
        })
    },
    data() {
        return {
            form: {
                new_skills: '',
            },
            token: JSON.parse(localStorage.getItem('newUser')).token,
            completed: false,
            user: JSON.parse(localStorage.getItem('user')),
            newUser: JSON.parse(localStorage.getItem('newUser')).form,

        }
    },
    methods: {
        updateNewUser() {
            this.startSpinner()
            let inputString = this.form.new_skills
            let dataArray = inputString.split(',')
            let stored = JSON.parse(localStorage.getItem('newUser'))
            stored.form.new_skills = dataArray
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
                this.signUpSuccessful()        
            })
            .catch(e => {
                console.error(e.response)
                this.stopSpinner()
            })
        },
        signUpSuccessful() {
            this.stopSpinner()
            this.completed = true
        },
        close() {
            this.completed = false
        },
        logIn() {
            this.startSpinner()
            const url = this.hostname + '/api/user'
            const headers = {
                'Content-Type' : 'application/json',
                'Authorization' : `Bearer ${this.token}`
            }
            axios.get(url, { headers })
            .then((res) => {
                this.siginSuccess(res.data)
            })
            .catch(e => {
                console.error(e.response)
                this.stopSpinner()
            })
        },
        async siginSuccess(res) {
            this.stopSpinner()
            let stored = JSON.parse(localStorage.getItem('user'))
            stored = res
            localStorage.setItem('user', JSON.stringify(stored))
            await this.$store.commit('setToken', this.token)
            this.$router.push({ name: 'Home' })
        }
    },
    mounted() {
        let arr = JSON.parse(localStorage.getItem('newUser')).form.new_skills
        if(arr && arr.length) {
            let dataArray = arr
            this.form.new_skills = dataArray.join(',')
        }
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
.bg-img {
    height: 180px;
    button {
        background-color: rgba(255, 255, 255, 0.8);
        backdrop-filter: saturate(180%) blur(20px);
        -webkit-backdrop-filter: saturate(180%) blur(20px);
        inset: auto auto 16px 16px;
        padding: 10px;
        color: #000000;
        border-radius: 30px;
    }
}
.pill {
    background-color: #F6F6F6;
    padding-left: 20px;
    padding-right: 20px;
}
.body-wrapper {
    padding: 30px 0;
}
.bg-img {
    border-radius: 16px;
}
.grid-item {
    min-width: 135px;
    flex: 1;
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
    .grid-col-2 {
        grid-template-columns: 1fr;
    }
}
</style>