<template>
    <h3 class="title flx jc-sb ai-c">
        <div>New Messages({{ messages.length }})</div>
        <router-link  to="/chats" class="fs-1rem a-link">See all</router-link>
    </h3>
    <div v-if="messages.length" class="grid grid-col-2 bg-white br-16 flx-1">
        <router-link :to="{ name: 'ChatDetails', params: { recipient_id: message.id, recipient_name: message.name}, replace: true}"  v-for="message in computedMessages.slice(0, 4)" :key="message.id" class="flx jc-sb msg-list gap-4">
            <div class="flx gap-8">
                <div class="bg-img br-50"></div>
                <profile-avatar :avatar="message.profile_picture" :color="message.color" :name="message.name"/>
                <div>
                    <div class="name">{{ message.name }}</div>
                    <div class="wrap-text wrap-line-1 gray fs-09">{{ message.preview }}</div>
                </div>
            </div>
            <div>
                <span class="count br-50 flx jc-c ai-c fs-09" v-if="message.unread > 0">{{ message.unread }}</span>
            </div>
        </router-link>
    </div>
    <div v-else class="bg-white flx-1 br-16 centered pd-16">
        <div class="text-center">
            <div>No Messages</div>
            <span class="gray">New Messages will appear here</span>
        </div>
    </div>
</template>
<script>
import { mapState } from 'vuex'
import ProfileAvatar from './ProfileAvatar.vue';
export default {
  components: { ProfileAvatar },
    name: 'DashMessageCard',
    computed: {
        ...mapState({
            messages: (state) => state.messages
        }),
        computedMessages() {
            return this.messages.map(element => {
                return {
                    id: element.sender.id,
                    name: element.sender.name,
                    profile_picture: element.sender.profile_picture,
                    preview: element.message.preview,
                    color: element.sender.color,
                    time: element.message.updated_at,
                    unread: element.unread
                };
            });
        }
    }
}
</script>
<style lang="scss" scoped>
.grid-col-2 {
    overflow: hidden;
    .msg-list {
        padding: 8px;
        &:nth-child(1), &:nth-child(2) {
            border-bottom: 1px solid #eeeded;;
        }
        &:nth-child(2), &:nth-child(4) {
            border-left: 1px solid #eeeded;;
        }
    }
}
img {
    height: 40px;
    width: 40px;
}
a {
    &:hover {
        background-color: #fdfcfc;
    }
}
</style>