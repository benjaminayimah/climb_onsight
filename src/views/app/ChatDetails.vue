<template>
    <div class="flx flx-1 chat-middle-pane bg-white">
        <chat-interface :chats="chats" :user="user" @add-to-chat="addToChat" />
        <chat-user-details v-if="chatUserDetails" :user="user" />
    </div>
</template>

<script>
import axios from 'axios'
import { mapState } from 'vuex'
import ChatInterface from './ChatInterface.vue'
import ChatUserDetails from './ChatUserDetails.vue'

export default {
    name: 'ChatDetails',
    components: { ChatInterface, ChatUserDetails },
    computed: {
        ...mapState({
            chatUserDetails: (state) => state.chatUserDetails,
            token: (state) => state.token,
            hostname: (state) => state.hostname
        })
    },
    data() {
        return {
            chats: [],
            user: {}
        }
    },
    watch: {
        '$route.params.recipient_id'(newValue) {
            this.fetchThisChat(newValue);
        }
    },
    methods: {
        addToChat(payload) {
            this.chats.push(payload)
        },
        async fetchThisChat() {
            this.$store.commit('startLoadingChats')
            try {
                const res = await axios.get(this.hostname+'/api/fetch-this-chat/'+this.$route.params.recipient_id+'?token='+ this.token)
                this.chats = res.data.chats
                this.user = res.data.recipient
                this.$store.commit('stopLoadingChats')
            } catch (e) {
                console.error(e)
            }
        }
    },
    mounted() {
        this.fetchThisChat()
    }
}
</script>

<style lang="scss" scoped>
.chat-middle-pane {
    border-top-right-radius: 24px;
    border-bottom-right-radius: 24px;

}
</style>