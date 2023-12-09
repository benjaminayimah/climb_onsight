<template>
    <div v-if="is_super" class="flx column gap-24 profile-body-wrapper overflow-y-scroll scroll-hidden">
        <div class="centered text-center">
            <avatar-uploader
                v-if="editMode"
                :status="status"
                :hostname="hostname"
                :dimension="90"
                :auth="true"
                :color="user.color"
                @deleteTemp="deltmp"
                @upload-click="uploadClick"
            />
            <img v-else class="br-50 mb-8" :class="{'custom-color' : !user.profile_picture }" :src="user.profile_picture ? s3bucket+'/'+user.profile_picture : default_avatar" :alt="user.name">
            <span class="input-error" v-if="imageStatus.active">{{ imageStatus.msg }}</span>
            <div class="fs-102rem">{{ user.name }}</div>
            <span class="gray capitalize">{{ user.role.replace(/_/g, ' ') }}</span>
        </div>
        <div v-if="!editMode" class="centered">
            <button @click="setData" class="button-primary gap-8 btn-sm btn-rounded">
                <svg v-if="!submiting" xmlns="http://www.w3.org/2000/svg" height="15" viewBox="0 0 16.919 16.166">
                    <path d="M-3593.823-882.342a.749.749,0,0,1-.2-.713l.857-3.427a.75.75,0,0,1,.2-.348l10.708-10.708a2.555,2.555,0,0,1,1.816-.751,2.55,2.55,0,0,1,1.815.751,2.57,2.57,0,0,1,0,3.631l-10.708,10.708a.749.749,0,0,1-.348.2l-3.427.857a.753.753,0,0,1-.181.022A.751.751,0,0,1-3593.823-882.342Zm12.624-14.134-10.561,10.561-.5,2.012,2.012-.5,10.561-10.561a1.067,1.067,0,0,0,0-1.509,1.059,1.059,0,0,0-.754-.312A1.063,1.063,0,0,0-3581.2-896.476Zm-4.385,14.353a.75.75,0,0,1-.75-.75.75.75,0,0,1,.75-.75h7.709a.75.75,0,0,1,.75.75.75.75,0,0,1-.75.75Z" transform="translate(3594.043 898.288)" fill="#fff"/>
                </svg>
                <spinner v-else :size="18" :color="'#fff'" />
                Edit info
            </button>
        </div>
        <div>
            <ul v-if="!editMode" class="flx column gap-16">
                <li class="flx jc-sb list-row-shading">
                    <div class="gray">Name</div>
                    <span>{{ user.name }}</span>
                </li>
                <li class="flx jc-sb list-row-shading">
                    <div class="gray">Email</div>
                    <span>{{ user.email }}</span>
                </li>
                <li class="flx jc-sb list-row-shading">
                    <div class="gray">Phone number</div>
                    <span>{{ user.phone_number }}</span>
                </li>
                <form @submit.prevent="" id="img_hidden_form">
                    <input class="hide" @change="uploadTemp('avatar_img')" name="image" id="avatar_img" type="file" ref="img"> 
                </form>
            </ul>
            <form v-else @submit.prevent="submitUpdate" id="profile_form">
                <input class="hide" @change="uploadTemp('avatar_img')" name="image" id="avatar_img" type="file" ref="img"> 
                <div v-if="systemErr.error" class="invalid-credentials response-message text-center mb-32">
                    <span>{{ systemErr.message }}</span>
                </div>
                <div class="form-wrapper flx column gap-16">
                    <div class="form-row column">
                        <div class="input-wrapper">
                            <input v-model="form.name" class="form-control" :class="{ 'error-border': validation.errors.name }" type="text" name="name" id="name" placeholder="Enter your full name">
                        </div>
                        <span class="input-error" v-if="validation.error && validation.errors.name">
                            {{ validation.errors.name[0] }}
                        </span>
                    </div>
                    <div class="form-row column">
                        <div class="input-wrapper">
                            <input v-model="form.email" class="form-control" :class="{ 'error-border': validation.errors.email }" type="text" name="email" id="email" placeholder="Enter your email">
                        </div>
                        <span class="input-error" v-if="validation.error && validation.errors.email">
                            {{ validation.errors.email[0] }}
                        </span>
                    </div>
                    <div class="form-row column">
                        <div class="input-wrapper">
                            <input v-model="form.phone_number" @input="formatPhoneNumber" class="form-control" :class="{ 'error-border': validation.errors.phone_number }" type="text" name="phone" id="phone" placeholder="111 222 3334">
                        </div>
                        <span class="input-error" v-if="validation.error && validation.errors.phone_number">
                            {{ validation.errors.phone_number[0] }}
                        </span>
                    </div>
                    <div>
                        <button class="button-primary gap-8 w-100 btn-md ai-c mb-16" :class="{ 'button-disabled' : submiting }" :disabled="submiting ? true : false">
                            <spinner v-if="submiting" :size="20" :color="'#fff'" />
                            <span>{{ submiting ? 'Please wait...' : 'Submit'}}</span>
                        </button>
                        <button @click.prevent="closeEditMode" class="button-outline w-100 bg-transparent btn-md">Cancel</button>
                    </div>
                </div>
            </form>
        </div>
    </div>
    <div v-else class="flx gap-32 profile-body-wrapper overflow-y-scroll scroll-hidden" :class="is_guide ? 'column' : ''">
        <div class="w-50 flx column gap-16">
            <img class="bg-img br-16" :class="{'custom-color' : !user.profile_picture }" :src="user.profile_picture ? s3bucket+'/'+user.profile_picture : default_avatar" :alt="user.name">
            <div class="flx jc-sb">
                <h3>{{ user.name }}</h3>
            </div>
            <div v-if="guest" class="flx column gap-8">
                <div>
                    <div class="gray">Status</div>
                    <div class="flx gap-4 ai-c">
                        <span>{{ user.is_approved ? 'Verified' : 'Unverified'}}</span>
                        <i class="br-50 centered pill-neutral">
                            <svg v-if="user.is_approved" xmlns="http://www.w3.org/2000/svg" height="10" viewBox="0 0 12 10" fill="none">
                                <path d="M4.5853 8.02089L10.3203 2.28589L9.54932 1.52843L4.57177 6.49246L2.28589 4.19304L1.51491 4.96402L4.5853 8.02089ZM4.5853 9.54932L0 4.96402L2.28589 2.66461L4.5853 4.96402L9.5358 0L11.8623 2.27236L4.5853 9.54932Z" fill="#5AF9C0"/>
                            </svg>
                            <svg v-else xmlns="http://www.w3.org/2000/svg" height="14" viewBox="0 0 16.195 16.195">
                                <path d="M10.668,3.4l6.786,13.525H3.882L10.668,3.4Zm0-1.467a1.171,1.171,0,0,0-.963.706L2.793,16.411c-.53.942-.079,1.712,1,1.712H17.542c1.08,0,1.531-.77,1-1.712h0L11.631,2.634A1.17,1.17,0,0,0,10.668,1.928ZM11.68,15.086a1.012,1.012,0,1,1-1.012-1.012A1.012,1.012,0,0,1,11.68,15.086Zm-1.012-2.024A1.012,1.012,0,0,1,9.656,12.05V9.013a1.012,1.012,0,1,1,2.024,0V12.05A1.012,1.012,0,0,1,10.668,13.062Z" transform="translate(-2.571 -1.928)" fill="#ff3b3b"/>
                            </svg>
                        </i>
                    </div>
                </div>
                <div>
                    <div class="gray">Customer ratings</div>
                    <div>
                        <svg xmlns="http://www.w3.org/2000/svg" height="18" viewBox="0 0 105 17" fill="none">
                            <path d="M7.54894 2.92705C7.8483 2.00574 9.1517 2.00574 9.45106 2.92705L10.1839 5.18237C10.3177 5.5944 10.7017 5.87336 11.1349 5.87336L13.5063 5.87336C14.475 5.87336 14.8778 7.11297 14.0941 7.68237L12.1756 9.07624C11.8251 9.33088 11.6784 9.78225 11.8123 10.1943L12.5451 12.4496C12.8445 13.3709 11.79 14.137 11.0063 13.5676L9.08778 12.1738C8.7373 11.9191 8.2627 11.9191 7.91221 12.1738L5.99372 13.5676C5.21001 14.137 4.15553 13.3709 4.45488 12.4496L5.18768 10.1943C5.32155 9.78225 5.1749 9.33088 4.82441 9.07624L2.90592 7.68237C2.1222 7.11297 2.52498 5.87336 3.4937 5.87336L5.86509 5.87336C6.29832 5.87336 6.68227 5.5944 6.81614 5.18237L7.54894 2.92705Z" fill="#F2C37B"/>
                            <path d="M29.5489 2.92705C29.8483 2.00574 31.1517 2.00574 31.4511 2.92705L32.1839 5.18237C32.3177 5.5944 32.7017 5.87336 33.1349 5.87336L35.5063 5.87336C36.475 5.87336 36.8778 7.11297 36.0941 7.68237L34.1756 9.07624C33.8251 9.33088 33.6784 9.78225 33.8123 10.1943L34.5451 12.4496C34.8445 13.3709 33.79 14.137 33.0063 13.5676L31.0878 12.1738C30.7373 11.9191 30.2627 11.9191 29.9122 12.1738L27.9937 13.5676C27.21 14.137 26.1555 13.3709 26.4549 12.4496L27.1877 10.1943C27.3216 9.78225 27.1749 9.33088 26.8244 9.07624L24.9059 7.68237C24.1222 7.11297 24.525 5.87336 25.4937 5.87336L27.8651 5.87336C28.2983 5.87336 28.6823 5.5944 28.8161 5.18237L29.5489 2.92705Z" fill="#F2C37B"/>
                            <path d="M51.5489 2.92705C51.8483 2.00574 53.1517 2.00574 53.4511 2.92705L54.1839 5.18237C54.3177 5.5944 54.7017 5.87336 55.1349 5.87336L57.5063 5.87336C58.475 5.87336 58.8778 7.11297 58.0941 7.68237L56.1756 9.07624C55.8251 9.33088 55.6784 9.78225 55.8123 10.1943L56.5451 12.4496C56.8445 13.3709 55.79 14.137 55.0063 13.5676L53.0878 12.1738C52.7373 11.9191 52.2627 11.9191 51.9122 12.1738L49.9937 13.5676C49.21 14.137 48.1555 13.3709 48.4549 12.4496L49.1877 10.1943C49.3216 9.78225 49.1749 9.33088 48.8244 9.07624L46.9059 7.68237C46.1222 7.11297 46.525 5.87336 47.4937 5.87336L49.8651 5.87336C50.2983 5.87336 50.6823 5.5944 50.8161 5.18237L51.5489 2.92705Z" fill="#F2C37B"/>
                            <path d="M73.5489 2.92705C73.8483 2.00574 75.1517 2.00574 75.4511 2.92705L76.1839 5.18237C76.3177 5.5944 76.7017 5.87336 77.1349 5.87336L79.5063 5.87336C80.475 5.87336 80.8778 7.11297 80.0941 7.68237L78.1756 9.07624C77.8251 9.33088 77.6784 9.78225 77.8123 10.1943L78.5451 12.4496C78.8445 13.3709 77.79 14.137 77.0063 13.5676L75.0878 12.1738C74.7373 11.9191 74.2627 11.9191 73.9122 12.1738L71.9937 13.5676C71.21 14.137 70.1555 13.3709 70.4549 12.4496L71.1877 10.1943C71.3216 9.78225 71.1749 9.33088 70.8244 9.07624L68.9059 7.68237C68.1222 7.11297 68.525 5.87336 69.4937 5.87336L71.8651 5.87336C72.2983 5.87336 72.6823 5.5944 72.8161 5.18237L73.5489 2.92705Z" fill="#F2C37B"/>
                            <path d="M95.5489 2.92705C95.8483 2.00574 97.1517 2.00574 97.4511 2.92705L98.1839 5.18237C98.3177 5.5944 98.7017 5.87336 99.1349 5.87336L101.506 5.87336C102.475 5.87336 102.878 7.11297 102.094 7.68237L100.176 9.07624C99.8251 9.33088 99.6784 9.78225 99.8123 10.1943L100.545 12.4496C100.844 13.3709 99.79 14.137 99.0063 13.5676L97.0878 12.1738C96.7373 11.9191 96.2627 11.9191 95.9122 12.1738L93.9937 13.5676C93.21 14.137 92.1555 13.3709 92.4549 12.4496L93.1877 10.1943C93.3216 9.78225 93.1749 9.33088 92.8244 9.07624L90.9059 7.68237C90.1222 7.11297 90.525 5.87336 91.4937 5.87336L93.8651 5.87336C94.2983 5.87336 94.6823 5.5944 94.8161 5.18237L95.5489 2.92705Z" fill="#F2C37B"/>
                        </svg>
                    </div>
                </div>
            </div>
            <div v-if="!guest && token" class="mb-8">
                <button @click="triggerEdit" class="button-primary btn-sm-lng gap-8 btn-rounded">
                    <svg xmlns="http://www.w3.org/2000/svg" height="15" viewBox="0 0 16.919 16.166">
                        <path d="M-3593.823-882.342a.749.749,0,0,1-.2-.713l.857-3.427a.75.75,0,0,1,.2-.348l10.708-10.708a2.555,2.555,0,0,1,1.816-.751,2.55,2.55,0,0,1,1.815.751,2.57,2.57,0,0,1,0,3.631l-10.708,10.708a.749.749,0,0,1-.348.2l-3.427.857a.753.753,0,0,1-.181.022A.751.751,0,0,1-3593.823-882.342Zm12.624-14.134-10.561,10.561-.5,2.012,2.012-.5,10.561-10.561a1.067,1.067,0,0,0,0-1.509,1.059,1.059,0,0,0-.754-.312A1.063,1.063,0,0,0-3581.2-896.476Zm-4.385,14.353a.75.75,0,0,1-.75-.75.75.75,0,0,1,.75-.75h7.709a.75.75,0,0,1,.75.75.75.75,0,0,1-.75.75Z" transform="translate(3594.043 898.288)" fill="#fff"/>
                    </svg>
                    Edit profile
                </button>
            </div>
            <div v-if="user.bio">
                <div class="gray">Climber fun facts</div>
                <div>
                    {{ user.bio }}
                </div>
            </div>
            <div v-if="user.email">
                <div class="gray">Email</div>
                <div>{{ user.email }}</div>
            </div>
            <div v-if="user.phone_number">
                <div class="gray">Phone</div>
                <div>{{ user.phone_number }}</div>
            </div>
            <div v-if="user.dob">
                <div class="gray">Age</div>
                <div id="ag">{{ calculateAge(user.dob) }}</div>
            </div>
            <div v-if="user.gender">
                <div class="gray">Sex</div>
                <div class="capitalize">{{ user.gender }}</div>
            </div>
            <div v-if="user.skills && user.skills.length" >
                <div class="gray">Proficiency</div>
                <div>
                    <li v-for="skill in user.skills" :key="skill">{{ skill }}</li>
                </div>
            </div>
            <div v-if="user.activities && user.activities.length">
                <div class="gray">Activity</div>
                <div id="act">
                    <li v-for="activity in user.activities" :key="activity.name">
                        {{ activity.name }} ({{ activity.level }}%)
                    </li>
                </div>
            </div>
            <div v-if="user.new_skills && user.new_skills.length" >
                <div class="gray">New skills</div>
                <div>
                    <li v-for="skill in user.new_skills" :key="skill">{{ skill }}</li>
                </div>
            </div>
            <div v-if="is_guide" class="mt-16 terms">
                <!-- <div v-if="computedGuide" class="flx jc-sb ai-c">
                    <a :href="s3bucket+'/'+computedGuide" class=" a-link" target="_blank" onclick="return !window.open(this.href, 'Guide Terms & Conditions', 'width=700,height=800');">
                        Terms & Conditions
                    </a>
                    <button @click.prevent="changeTerms" class="br-50 btn-close scale-in bg-transparent">
                        <svg xmlns="http://www.w3.org/2000/svg" height="15" viewBox="0 0 16.919 16.166">
                            <path d="M-3593.823-882.342a.749.749,0,0,1-.2-.713l.857-3.427a.75.75,0,0,1,.2-.348l10.708-10.708a2.555,2.555,0,0,1,1.816-.751,2.55,2.55,0,0,1,1.815.751,2.57,2.57,0,0,1,0,3.631l-10.708,10.708a.749.749,0,0,1-.348.2l-3.427.857a.753.753,0,0,1-.181.022A.751.751,0,0,1-3593.823-882.342Zm12.624-14.134-10.561,10.561-.5,2.012,2.012-.5,10.561-10.561a1.067,1.067,0,0,0,0-1.509,1.059,1.059,0,0,0-.754-.312A1.063,1.063,0,0,0-3581.2-896.476Zm-4.385,14.353a.75.75,0,0,1-.75-.75.75.75,0,0,1,.75-.75h7.709a.75.75,0,0,1,.75.75.75.75,0,0,1-.75.75Z" transform="translate(3594.043 898.288)" fill="#333"/>
                        </svg>
                    </button>
                </div>
                <div v-else class="centered">
                    <a href="#" class="block flx gap-8 ai-c">
                        <svg xmlns="http://www.w3.org/2000/svg" height="15" viewBox="0 0 15.132 15.132">
                            <path d="M-1983.684,13.883V8.816h-5.066a1.25,1.25,0,0,1-1.25-1.25,1.25,1.25,0,0,1,1.25-1.25h5.066V1.25a1.25,1.25,0,0,1,1.25-1.25,1.25,1.25,0,0,1,1.249,1.25V6.316h5.066a1.25,1.25,0,0,1,1.25,1.25,1.25,1.25,0,0,1-1.25,1.25h-5.066v5.066a1.249,1.249,0,0,1-1.249,1.249A1.249,1.249,0,0,1-1983.684,13.883Z" transform="translate(1990)" fill="#222"/>
                        </svg>
                        Upload terms & conditions
                    </a>
                </div> -->
            </div>
            <div v-if="guest && user.guide_experience">
                <div class="gray">Experiences</div>
                <div v-for="experience in JSON.parse(user.guide_experience)" :key="experience.id">
                    <div v-if="experience.value > 0">
                        <span>{{ experience.value }} years experience</span> in {{ experience.name }}
                    </div>
                </div>
            </div>
        </div>
        <div v-if="guest" class="w-50">
            <div class="flx jc-sb mb-32">
                <ul class="flx bg-white br-32 tab">
                    <li>
                        <a @click="switchTab('gallery')" href="#" :class="{'active' : tab === 'gallery'}">Gallery</a>
                    </li>
                    <li>
                        <a @click="switchTab('reviews')"  href="#" :class="{'active' : tab === 'reviews'}">Reviews</a>
                    </li>
                </ul>
                <button v-if="!guest" class="button-primary btn-sm-lng btn-rounded">Add image to gallery</button>
            </div>
            <div v-if="tab === 'gallery'">
                <div v-if="user.gallery" class="flx flx-wrap gap-16">
                    <div class="grid-item bg-img"></div>
                    <div class="grid-item bg-img"></div>
                    <div class="grid-item bg-img"></div>
                    <div class="grid-item bg-img"></div>
                    <div class="grid-item bg-img"></div>
                    <div class="grid-item bg-img"></div>
                </div>
                <div v-else>
                    <h4>No gallery found</h4>
                    <div>{{ guest ? 'Guide has' : 'You have'}} no gallery</div>
                </div>
            </div>
            <div v-else>
                <h4>No reviews found</h4>
                <div>{{ guest ? 'This Guide has' : 'You have'}} no review at the moment</div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import imageUploadMixin from '@/mixins/imageUpload';
import inputValidation from '@/mixins/inputValidation';
import userRolesMixin from '@/mixins/userRolesMixin';
import { mapState } from 'vuex';
import formatDateTime from '@/mixins/formatDateTime'
import AvatarUploader from '../includes/AvatarUploader.vue';
import Spinner from '../includes/Spinner.vue';
import alertMixin from '@/mixins/alertMixin';
export default {
    components: { AvatarUploader, Spinner },
    name: 'ProfileBody',
    props: {
        user: Object,
        guest: Boolean    },
    mixins: [formatDateTime, userRolesMixin, inputValidation, imageUploadMixin, alertMixin],
    computed: {
        ...mapState({
            s3bucket: (state) => state.s3bucket,
            default_avatar: (state) => state.data.default_avatar,
            hostname: (state) => state.hostname,
            token: (state) => state.token
        }),
        computedColor() {
            return this.user.color
        }
        // computedGuide() {
        //     if(this.user && this.user.guide_terms) {
        //         return JSON.parse(this.user.guide_terms).url
        //     }else {
        //         return ''
        //     }
        // }
    },
    data() {
        return {
            form: {
                name: '',
                email: '',
                phone_number: '',
                tempImage: null
            },
            tab: 'gallery',
            editMode: false
        }
    },
    methods: {
        setData() {
            this.form.name = this.user.name
            this.form.email = this.user.email
            this.form.phone_number = this.user.phone_number
            this.user.profile_picture ? this.afterTempUpload(this.user.profile_picture) : ''
            this.editMode = true
        },
        closeEditMode() {
            this.editMode = false
        },
        async submitUpdate() {
            this.validation.error || this.systemErr.error ? this.clearErrs() : ''
            this.startSpinner()
            try {
                const res = await axios.put(this.hostname+'/api/auth-user/' + this.user.id + '?token=' + this.token, this.form)
                this.updateSuccess(res.data.user)
                this.showAlert('success', res.data.message)
                this.stopSpinner()
            } catch (e) {
                this.stopSpinner()
                this.errorResponse(e)

            } 
        },
        updateSuccess(res) {
            this.$store.commit('updateUser', res)
            this.editMode = false
            this.$emit('close-modal')
        },
        triggerEdit() {
            this.$emit('close-modal')
            this.$store.commit('preSetTempData', {data: this.user, modal: 'profile_edit' })
        },
        switchTab(tab) {
            this.tab = tab
        },
        changeTerms() {
            console.log('me')
        }
        
    }
}
</script>

<style lang="scss" scoped>
img {
    height: 90px;
    width: 90px;
}
.bg-img {
    height: 180px;
    width: 100%;
}
.grid-item {
    min-width: 135px;
    flex: 1;
}
ul:not(.tab) {
    li {
        padding: 14px 16px;
    }
}
ul.tab {
    background-color: #F6F6F6;
    li {
        padding: 8px;
    }
    a {
        padding: 4px 12px;
    }
}
.column.w-50 {
    width: 100%;
}
.terms {
    div {
        border-radius: 10px;
        padding: 12px 16px;
        border: 1px #e0e0e0 solid;
        box-shadow: rgba(0, 0, 0, 0.1) 0px 1px 4px;
    }
    button {
        height: 35px;
        width: 35px;
    }
}

@media screen and (max-width: 1040px){
    .grid-col-2 {
        grid-template-columns: 1fr !important;
    }
}
img.custom-color {
    background-color: v-bind(computedColor);
}
</style>