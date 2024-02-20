<template>
    <teleport v-if="acceptTrigger.active" to="body">
        <backdrop :index="401" :opacity="0.5" />
        <div class="modal-container fixed flx jc-c ai-c">
            <div class="bg-white br-24 pd-24">
                <div class="flx jc-sb ai-c">
                    <h3>{{ acceptTrigger.type === 'accept' ? 'Accept Guide' : 'Decline Guide' }}</h3>
                    <button @click="triggerCancel" class="btn-close scale-in bg-transparent">
                        <svg xmlns="http://www.w3.org/2000/svg" height="10" viewBox="0 0 13.587 13.587">
                            <path d="M7.163,19.188,5.8,17.83,11.239,12.4,5.8,6.96,7.163,5.6,12.6,11.036,18.033,5.6,19.392,6.96,13.957,12.4l5.435,5.435-1.359,1.359L12.6,13.754Z" transform="translate(-5.805 -5.602)" fill="#1c1b1f"/>
                        </svg>
                    </button>
                </div>
                <p v-if="acceptTrigger.type === 'accept'">
                    By accepting this guide, an invite will be sent to <strong>{{ guide.company_email }}</strong> to setup their guide account.
                </p>
                <p v-else-if="acceptTrigger.type === 'decline'">
                    By declining this guide, their request will be deleted from the system.
                </p>
                <p>
                    Are you sure you want to {{ acceptTrigger.type === 'accept' ? 'accept' : 'decline' }} this guide?
                </p>
                <div class="flx column gap-8">
                    <button v-if="acceptTrigger.type === 'accept'" @click="acceptGuide" class="button-secondary btn-md gap-8 w-100 ">
                        <spinner v-if="submiting" :size="20" :color="'#fff'" />
                        <span>{{ submiting ? 'Please wait...' : 'Yes, proceed' }}</span>
                    </button>
                    <button v-else-if="acceptTrigger.type === 'decline'" @click="declineGuide" class="btn-danger btn-md gap-8 w-100 ">
                        <spinner v-if="submiting" :size="20" :color="'#fff'" />
                        <span>{{ submiting ? 'Please wait...' : 'Delete Guide' }}</span>
                    </button>
                    <button @click="triggerCancel" class="button-outline w-100  btn-md bg-transparent">Cancel</button>
                </div>
            </div>
        </div>
    </teleport>
    <teleport to="#modal_title">
        Guide profile
    </teleport>
    <teleport to="#modal_content">
        <div class="modal-width">
            <div class="br-16 flx column gap-24">
                <div class="flx column gap-16">
                    <div>
                        <div class="gray fs-09">Name</div>
                        <div>{{ guide.name }}</div>
                    </div>
                    <div>
                        <div class="gray fs-09">Email</div>
                        <div>{{ guide.company_email }}</div>
                    </div>
                    <div>
                        <div class="gray fs-09">Phone number</div>
                        <div>{{ guide.phone_number }}</div>
                    </div>
                    <div class="flx gap-24 flx-1 flx-wrap">
                        <div v-if="computedInsurance.length">
                            <div class="gray fs-09">Guide Insurance</div>
                            <div>
                                <a class="a-link flx gap-4 ai-c" v-for="insurance in computedInsurance" :key="insurance.id" :href="s3bucket+'/'+insurance.url" target="_blank" onclick="return !window.open(this.href, 'Guide Insurance', 'width=700,height=800');">
                                    <svg xmlns="http://www.w3.org/2000/svg" height="16" viewBox="0 0 15.5 19.5">
                                        <path d="M19.53,9.44l-7-7A.79.79,0,0,0,12,2.25H9A4.75,4.75,0,0,0,4.25,7V17A4.75,4.75,0,0,0,9,21.75h6A4.75,4.75,0,0,0,19.75,17V10A.79.79,0,0,0,19.53,9.44ZM12.75,4.79l4.46,4.46H14A1.25,1.25,0,0,1,12.75,8ZM5.75,17A3.26,3.26,0,0,0,9,20.25h6A3.26,3.26,0,0,0,18.25,17V10.75H14A2.75,2.75,0,0,1,11.25,8V3.75H9A3.26,3.26,0,0,0,5.75,7Z" transform="translate(-4.25 -2.25)" fill-rule="evenodd"/>
                                    </svg>
                                    {{ insurance.key }}
                                    <svg xmlns="http://www.w3.org/2000/svg" height="12" viewBox="0 0 14.5 14.5">
                                        <path d="M-3437.481-683.708a2,2,0,0,1-2-2v-8.25a2,2,0,0,1,2-2h4.5a.5.5,0,0,1,.5.5.5.5,0,0,1-.5.5h-4.5a1,1,0,0,0-1,1v8.25a1,1,0,0,0,1,1h8.249a1,1,0,0,0,1-1v-4.5a.5.5,0,0,1,.5-.5.5.5,0,0,1,.5.5v4.5a2,2,0,0,1-2,2Zm3.4-5.4a.5.5,0,0,1,0-.707l7.4-7.4h-3.293a.5.5,0,0,1-.5-.5.5.5,0,0,1,.5-.5h4.5a.5.5,0,0,1,.243.063h0l.009.005,0,0,.006,0,.006,0,0,0,.008.005h0a.491.491,0,0,1,.074.061.5.5,0,0,1,.146.379v4.475a.5.5,0,0,1-.5.5.5.5,0,0,1-.5-.5V-696.5l-7.4,7.4a.5.5,0,0,1-.354.147A.5.5,0,0,1-3434.085-689.1Z" transform="translate(3439.481 698.208)"/>
                                    </svg>
                                </a>
                            </div>
                        </div>
                        <div v-if="computedCertificate.length">
                            <div class="gray fs-09">Guide Certificates</div>
                            <div>
                                <a class="a-link flx gap-4 ai-c" v-for="certificate in computedCertificate" :key="certificate.id" :href="s3bucket+'/'+certificate.url" target="_blank" onclick="return !window.open(this.href, 'Guide Certificates', 'width=700,height=800');">
                                    <svg xmlns="http://www.w3.org/2000/svg" height="16" viewBox="0 0 15.5 19.5">
                                        <path d="M19.53,9.44l-7-7A.79.79,0,0,0,12,2.25H9A4.75,4.75,0,0,0,4.25,7V17A4.75,4.75,0,0,0,9,21.75h6A4.75,4.75,0,0,0,19.75,17V10A.79.79,0,0,0,19.53,9.44ZM12.75,4.79l4.46,4.46H14A1.25,1.25,0,0,1,12.75,8ZM5.75,17A3.26,3.26,0,0,0,9,20.25h6A3.26,3.26,0,0,0,18.25,17V10.75H14A2.75,2.75,0,0,1,11.25,8V3.75H9A3.26,3.26,0,0,0,5.75,7Z" transform="translate(-4.25 -2.25)" fill-rule="evenodd"/>
                                    </svg>
                                    {{ certificate.key }}
                                    <svg xmlns="http://www.w3.org/2000/svg" height="12" viewBox="0 0 14.5 14.5">
                                        <path d="M-3437.481-683.708a2,2,0,0,1-2-2v-8.25a2,2,0,0,1,2-2h4.5a.5.5,0,0,1,.5.5.5.5,0,0,1-.5.5h-4.5a1,1,0,0,0-1,1v8.25a1,1,0,0,0,1,1h8.249a1,1,0,0,0,1-1v-4.5a.5.5,0,0,1,.5-.5.5.5,0,0,1,.5.5v4.5a2,2,0,0,1-2,2Zm3.4-5.4a.5.5,0,0,1,0-.707l7.4-7.4h-3.293a.5.5,0,0,1-.5-.5.5.5,0,0,1,.5-.5h4.5a.5.5,0,0,1,.243.063h0l.009.005,0,0,.006,0,.006,0,0,0,.008.005h0a.491.491,0,0,1,.074.061.5.5,0,0,1,.146.379v4.475a.5.5,0,0,1-.5.5.5.5,0,0,1-.5-.5V-696.5l-7.4,7.4a.5.5,0,0,1-.354.147A.5.5,0,0,1-3434.085-689.1Z" transform="translate(3439.481 698.208)"/>
                                    </svg>
                                </a>
                            </div>
                        </div>
                        <div>
                            <div class="gray fs-09">Awards</div>
                            <div class="flx gap-4">
                                <li v-for="award in JSON.parse(guide.guide_awards)" :key="award.id" >
                                    {{ award }}
                                </li>
                            </div>
                        </div>
                        <div>
                            <div class="gray fs-09">Link to review</div>
                            <div>
                                <a class="a-link flx gap-4 ai-c" :href="guide.customer_reviews" target="_blank">
                                    <svg xmlns="http://www.w3.org/2000/svg"  height="16" viewBox="0 0 12.63 17.542">
                                        <path d="M-3596.535-398.6c-2.849-.757-3.132-2.13-1.605-7.782s2.465-6.7,5.313-5.943c2.729.725,3.1,2.016,1.789,7.093a.714.714,0,0,1-.874.506.717.717,0,0,1-.51-.872c.278-1.073.471-1.941.58-2.652a5.2,5.2,0,0,0,.057-1.734.75.75,0,0,0-.274-.5,3.151,3.151,0,0,0-1.137-.473,3.167,3.167,0,0,0-1.223-.154.759.759,0,0,0-.487.294,5.2,5.2,0,0,0-.825,1.529,32.248,32.248,0,0,0-1.025,3.27,32.009,32.009,0,0,0-.76,3.34,5.163,5.163,0,0,0-.057,1.734.746.746,0,0,0,.273.5,3.156,3.156,0,0,0,1.137.473,3.17,3.17,0,0,0,1.224.154.757.757,0,0,0,.486-.294,2.286,2.286,0,0,0,.19-.247.8.8,0,0,1,.855-.353l.023.006a.654.654,0,0,1,.425.963,2.4,2.4,0,0,1-2.183,1.359A5.506,5.506,0,0,1-3596.535-398.6Zm3.88-3.382c-2.729-.725-3.1-2.016-1.789-7.092a.715.715,0,0,1,.875-.507.716.716,0,0,1,.51.872c-.278,1.073-.47,1.941-.579,2.652a5.163,5.163,0,0,0-.057,1.734.742.742,0,0,0,.274.5,3.137,3.137,0,0,0,1.136.473,3.171,3.171,0,0,0,1.224.154.756.756,0,0,0,.486-.294,5.189,5.189,0,0,0,.825-1.529,32.169,32.169,0,0,0,1.024-3.27,32.2,32.2,0,0,0,.761-3.34,5.19,5.19,0,0,0,.057-1.734.749.749,0,0,0-.274-.5,3.151,3.151,0,0,0-1.137-.473,3.168,3.168,0,0,0-1.223-.154.76.76,0,0,0-.487.294,2.307,2.307,0,0,0-.19.248.8.8,0,0,1-.855.352l-.024-.006a.654.654,0,0,1-.425-.963c.867-1.4,1.885-1.591,3.574-1.142,2.849.757,3.133,2.131,1.606,7.782-1.247,4.615-2.1,6.161-3.923,6.16A5.513,5.513,0,0,1-3592.655-401.98Z" transform="translate(3599.056 415.923)" fill="#212135"/>
                                    </svg>
                                    {{ guide.customer_reviews }}
                                    <svg xmlns="http://www.w3.org/2000/svg" height="12" viewBox="0 0 14.5 14.5">
                                        <path d="M-3437.481-683.708a2,2,0,0,1-2-2v-8.25a2,2,0,0,1,2-2h4.5a.5.5,0,0,1,.5.5.5.5,0,0,1-.5.5h-4.5a1,1,0,0,0-1,1v8.25a1,1,0,0,0,1,1h8.249a1,1,0,0,0,1-1v-4.5a.5.5,0,0,1,.5-.5.5.5,0,0,1,.5.5v4.5a2,2,0,0,1-2,2Zm3.4-5.4a.5.5,0,0,1,0-.707l7.4-7.4h-3.293a.5.5,0,0,1-.5-.5.5.5,0,0,1,.5-.5h4.5a.5.5,0,0,1,.243.063h0l.009.005,0,0,.006,0,.006,0,0,0,.008.005h0a.491.491,0,0,1,.074.061.5.5,0,0,1,.146.379v4.475a.5.5,0,0,1-.5.5.5.5,0,0,1-.5-.5V-696.5l-7.4,7.4a.5.5,0,0,1-.354.147A.5.5,0,0,1-3434.085-689.1Z" transform="translate(3439.481 698.208)"/>
                                    </svg>
                                </a>
                            </div>
                        </div>
                        <div>
                            <div class="gray fs-09">Reference details</div>
                            <div>
                                <div v-for="referee in JSON.parse(guide.referees)" :key="referee.id" class="flx gap-8 flx-wrap">
                                    <div class="flx gap-4">
                                        <span class="gray">name:</span>
                                        <span>{{ referee.name }}</span>
                                    </div>
                                    <div class="flx gap-4">
                                        <span class="gray">Email:</span>
                                        <span>{{ referee.email }}</span>
                                    </div>
                                    <div class="flx gap-4">
                                        <span class="gray">Phone:</span>
                                        <span>{{ referee.phone }}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div class="gray fs-09">Experiences</div>
                        <div>
                            <div v-for="experience in JSON.parse(guide.guide_experience)" :key="experience.id">
                                <div v-if="experience.value > 0 && experience.name.toLowerCase() !== 'other'">{{experience.value}} years in {{ experience.name }}</div>
                                <div v-else-if="experience.value > 0 && experience.name.toLowerCase() === 'other'">{{experience.value}} years in {{ experience.alias }}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </teleport>
    <teleport to="#modal_footer">
        <div class="flx jc-fe gap-8">
            <button @click="triggerAccept('accept')" class="button-primary btn-md" :class="{ 'button-disabled' : submiting }" :disabled="submiting ? true : false">
                <span>Accept</span>
            </button>
            <button @click="triggerAccept('decline')" class="btn-md btn-danger">
                <span>Decline</span>
            </button> 
        </div>
    </teleport>
</template>

<script>
import alertMixin from '@/mixins/alertMixin'
import inputValidation from '@/mixins/inputValidation'
import axios from 'axios'
import Backdrop from '@/components/includes/Backdrop.vue'
import { mapState } from 'vuex'
import Spinner from '@/components/includes/Spinner.vue'
export default {
    components: { Backdrop, Spinner },
    name: 'NewGuideModal',
    mixins: [inputValidation, alertMixin],
    computed: {
        ...mapState({
            guide: (state) => state.forms.tempStorage,
            s3bucket: (state) => state.s3bucket,
            hostname: (state) => state.hostname,
            token: (state) => state.token
        }),
        computedCertificate() {
            if(this.guide.guide_certificate && Array.isArray(JSON.parse(this.guide.guide_certificate))) {
                return JSON.parse(this.guide.guide_certificate)
            }
            else
            return []
        },
        computedInsurance() {
            if(this.guide.guide_insurance && Array.isArray(JSON.parse(this.guide.guide_insurance))) {
                return JSON.parse(this.guide.guide_insurance)
            }
            else
            return []
        },
    },
    data() {
        return {
            acceptTrigger: { active: false, type: ''}
        }
    },
    methods: {
        triggerAccept(type) {
            this.acceptTrigger.active = true
            this.acceptTrigger.type = type
        },
        triggerCancel() {
            this.acceptTrigger.active = false
        },
        async acceptGuide() {
            this.startSpinner()
            try {
                const res = await axios.put(this.hostname+'/api/accept-guide/'+this.guide.id+'?token='+this.token )
                this.stopSpinner()
                this.$store.commit('acceptGuide', this.guide.id)
                this.acceptTrigger.active = false
                this.$store.commit('closeModal')
                this.showAlert('success', res.data.message)
            } catch (e) {
                this.stopSpinner()
                this.showAlert('danger', e.response.data.message)

            }
        },
        async declineGuide() {
            this.startSpinner()
            try {
                await axios.put(this.hostname+'/api/decline-guide/'+this.guide.id+'?token='+this.token )
                this.stopSpinner()
                this.$store.commit('declineGuide', this.guide.id)
                this.acceptTrigger.active = false
                this.$store.commit('closeModal')
                // console.log(res.data)
            } catch (e) {
                this.stopSpinner()
            }
        }
    },
    mounted() {
        this.$store.commit('stopFormLoader')
    }
}
</script>
<style lang="scss" scoped>
.modal-width {
    width: 900px;
}
li {
    list-style-type: disc;
}
.modal-container {
    margin: 0 20px;
    z-index: 402;
    .bg-white {
        min-width: 300px;
        max-width: 400px;
    }
}
</style>