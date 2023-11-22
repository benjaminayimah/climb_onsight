<template>
    <div class="br-16 bg-white main-details-wrapper flx column gap-16">
        <div class="flx jc-sb ai-c">
            <h4>Climber Details</h4>
            <button  @click="$store.commit('setDeleteModal', {id: climber.id, type: 'climber'})" class="button-danger btn-rounded btn-sm">Delete Climber</button>
        </div>
        <img class="br-16 profile-img" :src="climber.profile_picture ? s3bucket+'/'+climber.profile_picture : default_avatar" :alt="climber.name">
        <h3>{{ climber.name }}</h3>
        <div>
            <div class="gray">Email</div>
            <div>{{ climber.email }}</div>
        </div>
        <div>
            <div class="gray">Phone number</div>
            <div>{{ climber.phone_number }}</div>
        </div>
        <div>
            <div class="gray">Age</div>
            <div>{{ calculateAge(climber.dob) }}</div>
        </div>
        <div>
            <div class="gray">Gender</div>
            <div class="capitalize">{{ climber.gender }}</div>
        </div>
        <div v-if="climber.bio" class="flx column gap-4">
            <div class="gray">Bio</div>
            <div>
                {{ climber.bio }}
            </div>
        </div>
        <div v-if="climber.skills && JSON.parse(climber.skills).length" >
            <div class="gray">Proficiency</div>
            <div>
                <li v-for="skill in JSON.parse(climber.skills)" :key="skill">{{ skill }}</li>
            </div>
        </div>
        <div v-if="climber.new_skills && JSON.parse(climber.new_skills).length" >
            <div class="gray">Skills i want to learn</div>
            <div>
                <li v-for="skill in JSON.parse(climber.new_skills)" :key="skill">{{ skill }}</li>
            </div>
        </div>
        <div v-if="climber.activities && JSON.parse(climber.activities).length">
            <div class="gray">Activity</div>
            <div id="act">
                <li v-for="activity in JSON.parse(climber.activities)" :key="activity.name">
                    {{ activity.name }} ({{ activity.level }}%)
                </li>
            </div>
        </div>
        <!-- <send-message-button /> -->
    </div>
</template>

<script>
import formatDateTime from '@/mixins/formatDateTime'
// import SendMessageButton from '@/components/includes/SendMessageButton.vue'
import { mapState, mapGetters } from 'vuex'
export default {
    name: 'ClimberDetails',
    // components: { SendMessageButton },
    mixins: [formatDateTime],
    computed: {
        ...mapState({
            s3bucket: (state) => state.s3bucket,
            default_avatar: (state) => state.data.default_avatar
        }),
        ...mapGetters(['getDevice'])
    },
    props: {
        climber: Object
    },
    mounted() {
        this.getDevice == 'mobile' ? document.body.classList.add('fixed-body') : ''
    },
    unmounted() {
        document.body.classList.remove('fixed-body')
    }
}
</script>

<style lang="scss" scoped>
</style>