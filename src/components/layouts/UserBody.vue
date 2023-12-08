<template>
    <div>
        <div class="uppercase mb-8 fs-09"><strong>Account profile</strong></div>
        <div class="list-row-shading">
            <div class="gray">Name</div>
            <div>{{ user.name }}</div>
        </div>
    </div>
    <div class="list-row-shading">
        <div class="gray">Email</div>
        <div>{{ user.email || user.company_email }}</div>
    </div>
    <div class="list-row-shading">
        <div class="gray">Phone number</div>
        <div>{{ user.phone_number }}</div>
    </div>
    <div v-if="computedAttendees.length > 1 && is_guide">
        <div class="uppercase mb-8 mt-8 fs-09"><strong>All registered attendees</strong></div>
        <div class="list-row-shading">
            <div class="grid-table">
                <div class="grid table-body">
                    <div class="grid-col-attendees grid">
                        <span class="gray">Name</span>
                        <span class="gray">Email</span>
                        <span class="gray">Age</span>
                    </div>
                    <div v-for="attendee in computedAttendees" :key="attendee.id" class="grid-col-attendees grid">
                        <span>{{ attendee.name }}</span>
                        <a class="a-link" :href="'mailto:'+ attendee.email">{{ attendee.email }}</a>
                        <span>{{ calculateAge(attendee.dob) }}</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="uppercase mt-8 fs-09"><strong>Other information</strong></div>
    <div class="list-row-shading" v-if="user.event_name">
        <div class="gray">Event name</div>
        <div>{{ user.event_name }}</div>
    </div>
    <div class="list-row-shading" v-if="user.date_selected">
        <div class="gray">Due chosen</div>
        <div>{{ format_date(user.date_selected) }}</div>
    </div>
    <div class="list-row-shading" v-if="user.event_type">
        <div class="gray">Event type</div>
        <event-type :eventType="user.event_type" />
    </div>
    <div class="list-row-shading" v-if="user.dob">
        <div class="gray">Age</div>
        <div>{{ calculateAge(user.dob) }}</div>
    </div>
    <div class="list-row-shading" v-if="user.gender">
        <div class="gray">Gender</div>
        <div class="capitalize">{{ user.gender }}</div>
    </div>
    <div v-if="user.bio" class="flx column gap-4 list-row-shading">
        <div class="gray">Bio</div>
        <div>
            {{ user.bio }}
        </div>
    </div>
    <div v-if="user.skills && JSON.parse(user.skills).length" class="list-row-shading">
        <div class="gray">Proficiency</div>
        <div>
            <li v-for="(skill, index) in JSON.parse(user.skills)" :key="index">{{ skill }}</li>
        </div>
    </div>
    <div v-if="user.new_skills && JSON.parse(user.new_skills).length" class="list-row-shading">
        <div class="gray">Skills i want to learn</div>
        <div>
            <li v-for="(skill, index) in JSON.parse(user.new_skills)" :key="index">{{ skill }}</li>
        </div>
    </div>
    <div v-if="user.activities && JSON.parse(user.activities).length" class="list-row-shading">
        <div class="gray">Activity</div>
        <div>
            <li v-for="activity in JSON.parse(user.activities)" :key="activity.name">
                {{ activity.name }} ({{ activity.level }}%)
            </li>
        </div>
    </div>
    <div v-if="computedInsurance.length" class="list-row-shading">
        <div class="gray">Guide Insurance</div>
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
    <div v-if="computedCertificate.length" class="list-row-shading">
        <div class="gray">Guide Certificates</div>
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
    <!-- <div v-if="user.guide_terms" class="flx column gap-4 list-row-shading">
        <div class="gray">Guide Terms & Conditions</div>
        <div>
            <a class="a-link flx gap-4 ai-c" :href="s3bucket+'/'+JSON.parse(user.guide_terms).url" target="_blank" onclick="return !window.open(this.href, 'Terms & Conditions', 'width=700,height=800');">
                <svg xmlns="http://www.w3.org/2000/svg" height="16" viewBox="0 0 15.5 19.5">
                    <path d="M19.53,9.44l-7-7A.79.79,0,0,0,12,2.25H9A4.75,4.75,0,0,0,4.25,7V17A4.75,4.75,0,0,0,9,21.75h6A4.75,4.75,0,0,0,19.75,17V10A.79.79,0,0,0,19.53,9.44ZM12.75,4.79l4.46,4.46H14A1.25,1.25,0,0,1,12.75,8ZM5.75,17A3.26,3.26,0,0,0,9,20.25h6A3.26,3.26,0,0,0,18.25,17V10.75H14A2.75,2.75,0,0,1,11.25,8V3.75H9A3.26,3.26,0,0,0,5.75,7Z" transform="translate(-4.25 -2.25)" fill-rule="evenodd"/>
                </svg>
                {{ JSON.parse(user.guide_terms).key }}
                <svg xmlns="http://www.w3.org/2000/svg" height="12" viewBox="0 0 14.5 14.5">
                    <path d="M-3437.481-683.708a2,2,0,0,1-2-2v-8.25a2,2,0,0,1,2-2h4.5a.5.5,0,0,1,.5.5.5.5,0,0,1-.5.5h-4.5a1,1,0,0,0-1,1v8.25a1,1,0,0,0,1,1h8.249a1,1,0,0,0,1-1v-4.5a.5.5,0,0,1,.5-.5.5.5,0,0,1,.5.5v4.5a2,2,0,0,1-2,2Zm3.4-5.4a.5.5,0,0,1,0-.707l7.4-7.4h-3.293a.5.5,0,0,1-.5-.5.5.5,0,0,1,.5-.5h4.5a.5.5,0,0,1,.243.063h0l.009.005,0,0,.006,0,.006,0,0,0,.008.005h0a.491.491,0,0,1,.074.061.5.5,0,0,1,.146.379v4.475a.5.5,0,0,1-.5.5.5.5,0,0,1-.5-.5V-696.5l-7.4,7.4a.5.5,0,0,1-.354.147A.5.5,0,0,1-3434.085-689.1Z" transform="translate(3439.481 698.208)"/>
                </svg>
            </a>
        </div>
    </div> -->
    <div v-if="user.guide_awards" class="flx column gap-4 list-row-shading">
        <div class="gray">Awards</div>
        <div class="flx gap-4 column">
            <li class="list-style" v-for="award in JSON.parse(user.guide_awards)" :key="award.id" >
                {{ award }}
            </li>
        </div>
    </div>
    <div v-if="user.customer_reviews" class="flx column gap-4 list-row-shading">
        <div class="gray">Link to review</div>
        <div>
            <a class="a-link flx gap-4 ai-c" :href="user.customer_reviews" target="_blank">
                <svg xmlns="http://www.w3.org/2000/svg"  height="16" viewBox="0 0 12.63 17.542">
                    <path d="M-3596.535-398.6c-2.849-.757-3.132-2.13-1.605-7.782s2.465-6.7,5.313-5.943c2.729.725,3.1,2.016,1.789,7.093a.714.714,0,0,1-.874.506.717.717,0,0,1-.51-.872c.278-1.073.471-1.941.58-2.652a5.2,5.2,0,0,0,.057-1.734.75.75,0,0,0-.274-.5,3.151,3.151,0,0,0-1.137-.473,3.167,3.167,0,0,0-1.223-.154.759.759,0,0,0-.487.294,5.2,5.2,0,0,0-.825,1.529,32.248,32.248,0,0,0-1.025,3.27,32.009,32.009,0,0,0-.76,3.34,5.163,5.163,0,0,0-.057,1.734.746.746,0,0,0,.273.5,3.156,3.156,0,0,0,1.137.473,3.17,3.17,0,0,0,1.224.154.757.757,0,0,0,.486-.294,2.286,2.286,0,0,0,.19-.247.8.8,0,0,1,.855-.353l.023.006a.654.654,0,0,1,.425.963,2.4,2.4,0,0,1-2.183,1.359A5.506,5.506,0,0,1-3596.535-398.6Zm3.88-3.382c-2.729-.725-3.1-2.016-1.789-7.092a.715.715,0,0,1,.875-.507.716.716,0,0,1,.51.872c-.278,1.073-.47,1.941-.579,2.652a5.163,5.163,0,0,0-.057,1.734.742.742,0,0,0,.274.5,3.137,3.137,0,0,0,1.136.473,3.171,3.171,0,0,0,1.224.154.756.756,0,0,0,.486-.294,5.189,5.189,0,0,0,.825-1.529,32.169,32.169,0,0,0,1.024-3.27,32.2,32.2,0,0,0,.761-3.34,5.19,5.19,0,0,0,.057-1.734.749.749,0,0,0-.274-.5,3.151,3.151,0,0,0-1.137-.473,3.168,3.168,0,0,0-1.223-.154.76.76,0,0,0-.487.294,2.307,2.307,0,0,0-.19.248.8.8,0,0,1-.855.352l-.024-.006a.654.654,0,0,1-.425-.963c.867-1.4,1.885-1.591,3.574-1.142,2.849.757,3.133,2.131,1.606,7.782-1.247,4.615-2.1,6.161-3.923,6.16A5.513,5.513,0,0,1-3592.655-401.98Z" transform="translate(3599.056 415.923)" fill="#212135"/>
                </svg>
                {{ user.customer_reviews }}
                <svg xmlns="http://www.w3.org/2000/svg" height="12" viewBox="0 0 14.5 14.5">
                    <path d="M-3437.481-683.708a2,2,0,0,1-2-2v-8.25a2,2,0,0,1,2-2h4.5a.5.5,0,0,1,.5.5.5.5,0,0,1-.5.5h-4.5a1,1,0,0,0-1,1v8.25a1,1,0,0,0,1,1h8.249a1,1,0,0,0,1-1v-4.5a.5.5,0,0,1,.5-.5.5.5,0,0,1,.5.5v4.5a2,2,0,0,1-2,2Zm3.4-5.4a.5.5,0,0,1,0-.707l7.4-7.4h-3.293a.5.5,0,0,1-.5-.5.5.5,0,0,1,.5-.5h4.5a.5.5,0,0,1,.243.063h0l.009.005,0,0,.006,0,.006,0,0,0,.008.005h0a.491.491,0,0,1,.074.061.5.5,0,0,1,.146.379v4.475a.5.5,0,0,1-.5.5.5.5,0,0,1-.5-.5V-696.5l-7.4,7.4a.5.5,0,0,1-.354.147A.5.5,0,0,1-3434.085-689.1Z" transform="translate(3439.481 698.208)"/>
                </svg>
            </a>
        </div>
    </div>
    <div v-if="user.guide_experience" class="flx column gap-4 list-row-shading">
        <div class="gray">Experiences</div>
        <div>
            <div v-for="experience in JSON.parse(user.guide_experience)" :key="experience.id">
                <div v-if="experience.value > 0">{{experience.value}} years in {{ experience.name }}</div>
            </div>
        </div>
    </div>
    <div v-if="user.referees && is_super" class="flx column gap-4 list-row-shading">
        <div class="gray">Reference details</div>
        <div>
            <div v-for="referee in JSON.parse(user.referees)" :key="referee.id" class="flx gap-8 flx-wrap">
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
</template>

<script>
import userRolesMixin from '@/mixins/userRolesMixin'
import formatDateTime from '@/mixins/formatDateTime'
import { mapState } from 'vuex'
import EventType from '../includes/EventType.vue'
export default {
  components: { EventType },
    name: 'UserBody',
    mixins: [formatDateTime, userRolesMixin],
    props: {
        user: Object
    },
    computed: {
        ...mapState({
            s3bucket: (state) => state.s3bucket
        }),
        computedCertificate() {
            if(this.user.guide_certificate && Array.isArray(JSON.parse(this.user.guide_certificate))) {
                return JSON.parse(this.user.guide_certificate)
            }
            else
            return []
        },
        computedInsurance() {
            if(this.user.guide_insurance && Array.isArray(JSON.parse(this.user.guide_insurance))) {
                return JSON.parse(this.user.guide_insurance)
            }
            else
            return []
        },
        computedAttendees() {
            if(this.user.attendees && Array.isArray(JSON.parse(this.user.attendees))) {
                return JSON.parse(this.user.attendees)
            }
            else
            return []
        },
    }
}
</script>
<style lang="css" scoped>
.grid-col-attendees{
    place-content: center;
    grid-template-columns: 1fr 1fr .4fr;
}
</style>