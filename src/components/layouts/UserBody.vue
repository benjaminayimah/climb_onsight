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
    <div class="list-row-shading" v-if="user.dob">
        <div class="gray">Age</div>
        <div>{{ calculateAge(user.dob) }}</div>
    </div>
    <div class="list-row-shading" v-if="user.gender">
        <div class="gray">Gender</div>
        <div class="capitalize">{{ user.gender }}</div>
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
    <div>
        <div v-if="user.gender || user.dob" class="uppercase mt-8 fs-09"><strong>Event details</strong></div>
        <div v-if="is_guide && user.event_id" class="list-row-link">
            <a href="#" @click.prevent="goToEvent" class="flx jc-sb ai-c">
                <div class="flx gap-8">
                    <div>
                        <img class="br-16 profile-img" :src="computedEvent.gallery && computedEvent.gallery.length ? s3bucket+'/'+ JSON.parse(computedEvent.gallery)[0] : ''" :alt="computedEvent.event_name">
                    </div>
                    <div class="flx column gap-4">
                        <div class="name">{{ user.event_name }}</div>
                        <div class="flx gap-8">
                            <event-type :eventType="user.event_type" />
                            <span class="fs-08 badge badge-cyan br-24 wrap-text wrap-line-1">{{ computedEvent.category }}</span>
                        </div>
                        <div class="flx gap-8">
                            <span class="fs-08 flx gap-4 ai-c">
                                <svg xmlns="http://www.w3.org/2000/svg" height="16" viewBox="0 0 24 26">
                                    <path d="M-3300-660c0-.707.011-1.372.035-2q.019-.516.051-1,.034-.518.083-1c.5-4.965,2.267-7.018,6.832-7.707V-673a1,1,0,0,1,1-1,1,1,0,0,1,1,1v1.085c.911-.059,1.908-.086,3-.086s2.09.026,3,.086V-673a1,1,0,0,1,1-1,1,1,0,0,1,1,1v1.293c4.566.688,6.327,2.741,6.832,7.707.033.321.06.654.083,1,.022.322.038.655.052,1,.023.629.034,1.3.034,2,0,9.882-2.118,12-12,12S-3300-650.118-3300-660Zm2,0a26.907,26.907,0,0,0,.438,5.61,5.206,5.206,0,0,0,1.271,2.681,5.214,5.214,0,0,0,2.681,1.271A26.852,26.852,0,0,0-3288-650a26.842,26.842,0,0,0,5.61-.438,5.214,5.214,0,0,0,2.682-1.271,5.214,5.214,0,0,0,1.27-2.681A26.831,26.831,0,0,0-3278-660c0-.716-.011-1.381-.036-2h-19.928C-3297.989-661.38-3298-660.715-3298-660Zm2.108-8.634c-.944.692-1.625,1.908-1.929,4.633h19.642c-.3-2.725-.985-3.941-1.93-4.633a6.7,6.7,0,0,0-2.892-1.048V-669a1,1,0,0,1-1,1,1,1,0,0,1-1-1v-.909c-.869-.061-1.861-.091-3-.091s-2.132.03-3,.091V-669a1,1,0,0,1-1,1,1,1,0,0,1-1-1v-.681A6.7,6.7,0,0,0-3295.892-668.633Zm10.5,14.27a1,1,0,0,1-1-1,1,1,0,0,1,1-1h3a1,1,0,0,1,1,1,1,1,0,0,1-1,1Zm-8.61,0a1,1,0,0,1-1-1,1,1,0,0,1,1-1h3a1,1,0,0,1,1,1,1,1,0,0,1-1,1Z" transform="translate(3300 674)" fill="#a7a7a7"/>
                                </svg>
                                {{ format_date_short(user.date_selected) }}
                            </span>
                            <span class="fs-08 flx gap-4 ai-c">
                                <svg xmlns="http://www.w3.org/2000/svg" height="14" viewBox="0 0 21.137 21.137">
                                    <path d="M-3539.018-766.128a10.581,10.581,0,0,1,10.569-10.569,10.581,10.581,0,0,1,10.569,10.569,10.58,10.58,0,0,1-10.569,10.569A10.58,10.58,0,0,1-3539.018-766.128Zm2,0a8.579,8.579,0,0,0,8.569,8.569,8.578,8.578,0,0,0,8.569-8.569,8.578,8.578,0,0,0-8.569-8.569A8.579,8.579,0,0,0-3537.018-766.128Zm10.74,4.4-3.307-2.146a1,1,0,0,1-.455-.839v-5.869a1,1,0,0,1,1-1,1,1,0,0,1,1,1v5.325l2.852,1.85a1,1,0,0,1,.294,1.382,1,1,0,0,1-.84.456A1,1,0,0,1-3526.278-761.729Z" transform="translate(3539.018 776.696)" fill="#a7a7a7"/>
                                </svg>
                                {{ computedEvent.event_duration }}
                            </span>
                        </div>
                    </div>
                </div>
                <span>
                    <svg xmlns="http://www.w3.org/2000/svg" height="12" viewBox="0 0 14.5 14.5">
                        <path d="M-3437.481-683.708a2,2,0,0,1-2-2v-8.25a2,2,0,0,1,2-2h4.5a.5.5,0,0,1,.5.5.5.5,0,0,1-.5.5h-4.5a1,1,0,0,0-1,1v8.25a1,1,0,0,0,1,1h8.249a1,1,0,0,0,1-1v-4.5a.5.5,0,0,1,.5-.5.5.5,0,0,1,.5.5v4.5a2,2,0,0,1-2,2Zm3.4-5.4a.5.5,0,0,1,0-.707l7.4-7.4h-3.293a.5.5,0,0,1-.5-.5.5.5,0,0,1,.5-.5h4.5a.5.5,0,0,1,.243.063h0l.009.005,0,0,.006,0,.006,0,0,0,.008.005h0a.491.491,0,0,1,.074.061.5.5,0,0,1,.146.379v4.475a.5.5,0,0,1-.5.5.5.5,0,0,1-.5-.5V-696.5l-7.4,7.4a.5.5,0,0,1-.354.147A.5.5,0,0,1-3434.085-689.1Z" transform="translate(3439.481 698.208)" fill="#d75e09"/>
                    </svg>
                </span>
            </a>
        </div>
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
    <div v-if="computedLicense.length" class="list-row-shading">
        <div class="gray">Permit or License</div>
        <div>
            <a class="a-link flx gap-4 ai-c" v-for="license in computedLicense" :key="license.id" :href="s3bucket+'/'+license.url" target="_blank" onclick="return !window.open(this.href, 'Permit or License', 'width=700,height=800');">
                <svg xmlns="http://www.w3.org/2000/svg" height="16" viewBox="0 0 15.5 19.5">
                    <path d="M19.53,9.44l-7-7A.79.79,0,0,0,12,2.25H9A4.75,4.75,0,0,0,4.25,7V17A4.75,4.75,0,0,0,9,21.75h6A4.75,4.75,0,0,0,19.75,17V10A.79.79,0,0,0,19.53,9.44ZM12.75,4.79l4.46,4.46H14A1.25,1.25,0,0,1,12.75,8ZM5.75,17A3.26,3.26,0,0,0,9,20.25h6A3.26,3.26,0,0,0,18.25,17V10.75H14A2.75,2.75,0,0,1,11.25,8V3.75H9A3.26,3.26,0,0,0,5.75,7Z" transform="translate(-4.25 -2.25)" fill-rule="evenodd"/>
                </svg>
                {{ license.key }}
                <svg xmlns="http://www.w3.org/2000/svg" height="12" viewBox="0 0 14.5 14.5">
                    <path d="M-3437.481-683.708a2,2,0,0,1-2-2v-8.25a2,2,0,0,1,2-2h4.5a.5.5,0,0,1,.5.5.5.5,0,0,1-.5.5h-4.5a1,1,0,0,0-1,1v8.25a1,1,0,0,0,1,1h8.249a1,1,0,0,0,1-1v-4.5a.5.5,0,0,1,.5-.5.5.5,0,0,1,.5.5v4.5a2,2,0,0,1-2,2Zm3.4-5.4a.5.5,0,0,1,0-.707l7.4-7.4h-3.293a.5.5,0,0,1-.5-.5.5.5,0,0,1,.5-.5h4.5a.5.5,0,0,1,.243.063h0l.009.005,0,0,.006,0,.006,0,0,0,.008.005h0a.491.491,0,0,1,.074.061.5.5,0,0,1,.146.379v4.475a.5.5,0,0,1-.5.5.5.5,0,0,1-.5-.5V-696.5l-7.4,7.4a.5.5,0,0,1-.354.147A.5.5,0,0,1-3434.085-689.1Z" transform="translate(3439.481 698.208)"/>
                </svg>
            </a>
        </div>
    </div>
    <div v-if="user.guide_awards && user.guide_awards != '[null]'" class="flx column gap-4 list-row-shading">
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
    <div v-if="computedExperience.length && is_super" class="flx column gap-4 list-row-shading">
        <div class="gray">Experiences</div>
        <div>
            <div v-for="experience in computedExperience" :key="experience.id">
                <div v-if="experience.name.toLowerCase() !== 'other'">
                    {{experience.value}} years in {{ experience.name }}
                    <span v-if="experience.description" class="gray fs-08"> - {{ experience.description }}</span>
                </div>
                <div v-else-if="experience.name.toLowerCase() === 'other'">
                    {{experience.value}} years in {{ experience.alias }}
                    <span v-if="experience.description" class="gray fs-08"> - {{ experience.description }}</span>
                </div>
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
            s3bucket: (state) => state.s3bucket,
            events: (state) => state.events
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
        computedLicense() {
            if(this.user.guide_license && Array.isArray(JSON.parse(this.user.guide_license))) {
                return JSON.parse(this.user.guide_license)
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
        computedExperience() {
            let experiences = []
            if(this.user.guide_experience) {
                experiences = JSON.parse(this.user.guide_experience).filter(data => data.value > 0)
            }
            return experiences
        },
        computedEvent() {
            return this.events && this.user.event_id ? this.events.find(data => data.id === this.user.event_id) : null
        }
    },
    methods: {
        goToEvent() {
            this.$router.push({ name: 'UpcomingEvents', query: { current: this.computedEvent.id, origin: this.$route.name, status: 'event' } } )
            this.$store.commit('closeModal')
        }
    }
}
</script>
<style lang="scss" scoped>
.grid-col-attendees.grid-col-attendees{
    place-content: center;
    grid-template-columns: 1fr 1fr .4fr;
}
.profile-img {
    height: 80px;
    width: 80px
}
.list-row-link {
    margin: 0 -12px;
    a {
        transition: .2s background-color;
        border-radius: 14px;
        padding: 12px;
    }
    &:hover {
        a {
            background-color: var(--list-hover);
        }
    }
}
</style>