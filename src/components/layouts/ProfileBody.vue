<template>
    <div v-if="is_guide || is_climber" class="grid grid-col-2 gap-32 profile-body-wrapper overflow-y-scroll scroll-hidden">
        <div>
            <div class="bg-img br-16 relative mb-16" :style="user.profile_picture ? { backgroundImage: 'url('+s3bucket+'/'+user.profile_picture+')'} : { backgroundImage: 'url('+default_avatar+')'} ">
                <button class="absolute fs-09">Change profile picture</button>
            </div>
            <div class="flx jc-sb mb-24">
                <h3>{{ user.name }}</h3>
                <div class="pill pill-neutral">0 Completed Events</div>
            </div>
            <div class="mb-32">
                <button class="button-primary btn-sm-lng gap-8 btn-rounded">
                    <svg xmlns="http://www.w3.org/2000/svg" height="16" viewBox="0 0 16.919 16.166">
                        <path d="M-3593.823-882.342a.749.749,0,0,1-.2-.713l.857-3.427a.75.75,0,0,1,.2-.348l10.708-10.708a2.555,2.555,0,0,1,1.816-.751,2.55,2.55,0,0,1,1.815.751,2.57,2.57,0,0,1,0,3.631l-10.708,10.708a.749.749,0,0,1-.348.2l-3.427.857a.753.753,0,0,1-.181.022A.751.751,0,0,1-3593.823-882.342Zm12.624-14.134-10.561,10.561-.5,2.012,2.012-.5,10.561-10.561a1.067,1.067,0,0,0,0-1.509,1.059,1.059,0,0,0-.754-.312A1.063,1.063,0,0,0-3581.2-896.476Zm-4.385,14.353a.75.75,0,0,1-.75-.75.75.75,0,0,1,.75-.75h7.709a.75.75,0,0,1,.75.75.75.75,0,0,1-.75.75Z" transform="translate(3594.043 898.288)" fill="#fff"/>
                    </svg>
                    Edit profile
                </button>
            </div>
            <div class="mb-24">
                <label class="gray">Climber fun facts</label>
                <div>
                    {{ user.bio || 'n/a' }}
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
                    <div>{{ calculateAge(user.dob) }}</div>
                </div>
                <div v-if="user.gender">
                    <label class="gray">Sex</label>
                    <div class="capitalize">{{ user.gender }}</div>
                </div>
                <div>
                    <label class="gray">Proficiency</label>
                    <div v-if="user.skills && user.skills.length" >
                        <li v-for="skill in user.skills" :key="skill">{{ skill }}</li>
                    </div>
                    <div v-else>
                        n/a
                    </div>
                </div>
                <div>
                    <label class="gray">Activity</label>
                    <div>
                        <li v-for="activity in user.activities" :key="activity.name">
                            {{ activity.name }} ({{ activity.level }}%)
                        </li>
                    </div>
                </div>
                <div>
                    <label class="gray">New skills</label>
                    <div v-if="user.new_skills && user.new_skills.length" >
                        <li v-for="skill in user.new_skills" :key="skill">{{ skill }}</li>
                    </div>
                    <div v-else>
                        n/a
                    </div>
                </div>
            </div>
        </div>
        <div>
            <div class="flx jc-sb mb-32">
                <span class="pill pill-neutral ft-secondary centered">Gallery</span>
                <button class="button-primary btn-sm-lng btn-rounded">Add image to gallery</button>
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
    </div>
    <div v-else class="flx column gap-24 profile-body-wrapper2 overflow-y-scroll scroll-hidden">
        <div class="centered text-center">
            <avatar-uploader v-if="editMode" :status="status" :hostname="hostname" :dimension="90" :auth="true" @deleteTemp="deltmp" @upload-click="uploadClick" />
            <img v-else class="br-50 mb-8" :src="user.profile_picture ? s3bucket+'/'+user.profile_picture : default_avatar" :alt="user.name">
            <span class="input-error" v-if="imageStatus.active">{{ imageStatus.msg }}</span>
            <div class="fs-102rem">{{ user.name }}</div>
            <span class="gray capitalize">{{ user.role.replace(/_/g, ' ') }}</span>
        </div>
        <div v-if="!editMode" class="centered">
            <button @click="preloadImage" class="button-primary gap-8 btn-sm btn-rounded">
                <svg v-if="!submiting" xmlns="http://www.w3.org/2000/svg" height="16" viewBox="0 0 16.919 16.166">
                    <path d="M-3593.823-882.342a.749.749,0,0,1-.2-.713l.857-3.427a.75.75,0,0,1,.2-.348l10.708-10.708a2.555,2.555,0,0,1,1.816-.751,2.55,2.55,0,0,1,1.815.751,2.57,2.57,0,0,1,0,3.631l-10.708,10.708a.749.749,0,0,1-.348.2l-3.427.857a.753.753,0,0,1-.181.022A.751.751,0,0,1-3593.823-882.342Zm12.624-14.134-10.561,10.561-.5,2.012,2.012-.5,10.561-10.561a1.067,1.067,0,0,0,0-1.509,1.059,1.059,0,0,0-.754-.312A1.063,1.063,0,0,0-3581.2-896.476Zm-4.385,14.353a.75.75,0,0,1-.75-.75.75.75,0,0,1,.75-.75h7.709a.75.75,0,0,1,.75.75.75.75,0,0,1-.75.75Z" transform="translate(3594.043 898.288)" fill="#fff"/>
                </svg>
                <spinner v-else :size="16" />
                Edit info
            </button>
        </div>
        <div>
            <ul v-if="!editMode" class="flx column gap-16">
                <li class="flx jc-sb bg-color br-32">
                    <div class="gray">Name</div>
                    <span>{{ user.name }}</span>
                </li>
                <li class="flx jc-sb bg-color br-32">
                    <div class="gray">Email</div>
                    <span>{{ user.email }}</span>
                </li>
                <li class="flx jc-sb bg-color br-32">
                    <div class="gray">Phone number</div>
                    <span>{{ user.phone_number }}</span>
                </li>
                <form @submit.prevent="">
                    <input class="hide" @change="uploadTemp('avatar_img')" name="image" id="avatar_img" type="file" ref="img"> 
                </form>
            </ul>
            <form v-else @submit.prevent="submitUpdate">
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
                            <spinner v-if="submiting" :size="18" />
                            <span>{{ submiting ? 'Please wait...' : 'Submit'}}</span>
                        </button>
                        <button @click="closeEditMode" class="button-outline w-100 bg-transparent btn-md">Cancel</button>
                    </div>
                </div>
            </form>
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
export default {
    components: { AvatarUploader, Spinner },
    name: 'ProfileBody',
    props: {
        user: Object
    },
    mixins: [formatDateTime, userRolesMixin, inputValidation, imageUploadMixin],
    computed: {
        ...mapState({
            s3bucket: (state) => state.s3bucket,
            default_avatar: (state) => state.data.default_avatar,
            hostname: (state) => state.hostname,
            token: (state) => state.token
        }),
    },
    data() {
        return {
            form: {
                name: '',
                email: '',
                phone_number: '',
                tempImage: null
            },
            editMode: false
        }
    },
    methods: {
        preloadImage() {
            if(this.user.profile_picture) {
                this.startSpinner()
                this.$store.dispatch('doPreloadTemp', this.user.profile_picture)
                .then((res) => {
                    this.stopSpinner()
                    this.setData(res.data)
                }).catch((e) => {
                    this.errorResponse(e)
                    this.stopSpinner()
                })
            }else {
                this.setData(null)
            }
        },
        setData(image) {
            this.afterTempUpload(image)
            this.form.name = this.user.name
            this.form.email = this.user.email
            this.form.phone_number = this.user.phone_number
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
                this.updateSuccess(res.data)
                this.stopSpinner()

            } catch (e) {
                this.errorResponse(e)
                this.stopSpinner()
            } 
        },
        updateSuccess(res) {
            this.$store.commit('updateUser', res)
            this.editMode = false
        }
        
    },
    mounted() {
        // this.user.profile_picture ? this.preloadImage() : ''
    }
}
</script>

<style lang="scss" scoped>
img {
    height: 90px;
    width: 90px;
}
.bg-img {
    border-radius: 16px;
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
.grid-item {
    min-width: 135px;
    flex: 1;
}
ul {
    li {
        padding: 14px 16px;
    }
}

@media screen and (max-width: 1040px){
    .grid-col-2 {
        grid-template-columns: 1fr !important;
    }
}
</style>