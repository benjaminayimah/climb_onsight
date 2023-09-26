<template>
    <div class="grid grid-col-2 gap-32 overflow-y-scroll scroll-hidden profile-body-wrapper">
        <div>
            <div class="bg-img br-16 relative mb-16" :style="user.profile_picture ? { backgroundImage: 'url('+s3bucket+'/images/'+user.profile_picture+')'} : ''">
                <button class="absolute fs-09">Change profile picture</button>
            </div>
            <div class="flx jc-sb mb-32">
                <h3>{{ user.name }}</h3>
                <div class="pill pill-neutral">0 Completed Events</div>
            </div>
            <div class="flx jc-sb mb-24">
                <div>
                    <label class="gray">Interest</label>
                    <div>Mountain climbing</div>
                </div>
                <div>
                    <button class="button-primary btn-sm-lng btn-rounded">Edit profile</button>
                </div>
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
                <div>
                    <label class="gray">Sex</label>
                    <div class="capitalize">{{ user.gender}}</div>
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
    
</template>

<script>
import { mapState } from 'vuex';
import formatDateTime from '@/mixins/formatDateTime'
export default {
    name: 'ProfileBody',
    props: {
        user: Object
    },
    mixins: [formatDateTime],
    computed: {
        ...mapState({
            s3bucket: (state) => state.s3bucket
        }),
    }
}
</script>

<style lang="scss" scoped>
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

@media screen and (max-width: 1040px){
    .grid-col-2 {
        grid-template-columns: 1fr !important;
    }
}
</style>