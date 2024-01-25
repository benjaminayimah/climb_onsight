<template>
    <li>
        <router-link :to="{ name: 'ChatDetails', params: { recipient_id: user.id, recipient_name: user.name}, replace: true}" class="flx gap-8 br-16">
            <profile-avatar :avatar="user.profile_picture" :color="user.color" :name="user.name"/>
            <div class="flx flx-1" :class="{'column' : !contactOnly}">
                <div class="flx jc-sb ai-c">
                    <div class="wrap-text wrap-line-1 fw-600 fs-09 capitalize">{{ user.name }}</div>
                    <span v-if="!contactOnly" class="gray fs-08 wrap-text wrap-line-1">{{ ago_time(user.time) }}</span>
                </div>
                <div v-if="!contactOnly" class="flx jc-sb">
                    <span class="fs-09 wrap-text wrap-line-1 gray highlight">{{ user.preview }}</span>
                    <span class="count flx-shrink-0 br-50 centered fs-08" v-if="user.unread > 0">{{ user.unread }}</span>
                </div>
            </div>
        </router-link>
    </li>
</template>

<script>
import ProfileAvatar from './ProfileAvatar.vue'
import formatDateTime from '@/mixins/formatDateTime';
export default {
    components: { ProfileAvatar },
    name: 'ChatList',
    mixins: [formatDateTime],
    props: {
        user: Object,
        contactOnly: Boolean
    }
}
</script>
<style lang="scss" scoped>
img {
    height: 48px;
    width: 48px;
}
a {
    padding: 10px;
    border: 1px solid rgba(217, 217, 217, 0.49);
    transition: var(--input-btn-transition);
    &:hover {
        border: 1px solid rgba(0, 0, 0, 0.5);
    }
}
.flx-1 {
    width: calc(100% - 70px);
}
</style>