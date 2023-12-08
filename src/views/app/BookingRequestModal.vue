<!-- <template>
    <teleport to="#modal_title">
        Approve request
    </teleport>
    <teleport to="#modal_content">
        <div class="modal-width">
            <div class="flx column ai-c gap-4">
                <profile-avatar  :avatar="climber.profile_picture"/>
                <strong>{{ climber.name }}</strong>
                <span class="gray">Climber</span>
            </div>
            {{ climber }}
        </div>
    </teleport>
    <teleport to="#modal_footer">
        <div class="flx gap-8">
            <button @click="acceptBooking" class="button-primary w-50 btn-md gap-8" :class="{ 'button-disabled' : submiting }" :disabled="submiting ? true : false">
                <spinner v-if="submiting" :size="20" />
                <span>{{ submiting ? 'Please wait...' : 'Accept' }}</span>
            </button>
            <button @click="declineBooking" class="button-outline w-50 btn-md gap-8 bg-transparent" :class="{ 'button-disabled' : declining }" :disabled="declining ? true : false">
                <spinner v-if="declining" :size="20" />
                <span>{{ declining ? 'Please wait...' : 'Decline' }}</span>
            </button>
        </div>
    </teleport>
</template>

<script>
import axios from 'axios';
import alertMixin from '@/mixins/alertMixin';
import inputValidation from '@/mixins/inputValidation';
import { mapState } from 'vuex';
import Spinner from '@/components/includes/Spinner.vue';
import ProfileAvatar from '@/components/includes/ProfileAvatar.vue';
export default {
    components: { Spinner, ProfileAvatar },
    name: 'ProfileEditModal',
    mixins: [inputValidation, alertMixin],
    computed: {
        ...mapState({
            climber: (state) => state.forms.tempStorage,
            s3bucket: (state) => state.s3bucket,
            default_avatar: (state) => state.data.default_avatar,
            hostname: (state) => state.hostname,
            token: (state) => state.token
        })
    },
    data() {
        return {
            declining: false
        }
    },
    methods: {
        async acceptBooking() {
            this.startSpinner()
            try {
                const res = await axios.post(this.hostname+'/api/accept-booking/'+ this.climber.id + '?token='+ this.token)
                this.stopSpinner()
                this.showAlert('success', res.data.message)
                this.$store.commit('updateNotifications', this.climber.id)
                this.$store.commit('updateBooking', res.data.booking)
                this.$store.commit('closeModal')
            } catch (e) {
                this.errorResponse(e)
                this.stopSpinner()
            }
        },
        async declineBooking() {
            this.declining = true
            try {
                const res = await axios.post(this.hostname+'/api/decline-booking/'+ this.climber.id + '?token='+ this.token)
                this.showAlert('success', res.data.message)
                this.$store.commit('updateNotifications', this.climber.id)
                this.$store.commit('deleteBooking', res.data.booking)
                this.$store.commit('closeModal')
            } catch (e) {
                this.errorResponse(e)
                this.declining = false
            }
        }
        
    },
    mounted() {
        this.$store.commit('stopFormLoader')
    }
}
</script>

<style lang="scss" scoped>
img {
    height: 120px;
    width: 120px;
}
.modal-width {
    width: 360px;
}

</style> -->