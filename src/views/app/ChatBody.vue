<template>
    <chat-bubble v-for="chat in chats" :key="chat.id" :chat="chat" />
</template>

<script>
import ChatBubble from '@/components/includes/ChatBubble.vue'
export default {
    name: 'ChatBody',
    components: { ChatBubble },
    props: {
        chats: Array
    }
}
</script>