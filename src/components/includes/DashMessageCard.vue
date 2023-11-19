<template>
    <h3 class="title flx jc-sb ai-c">
        <div>New Messages({{ messages.length }})</div>
        <a href="#" class="fs-1rem a-link">See all</a>
    </h3>
    <div v-if="messages.length" class="grid grid-col-2 bg-white br-16">
        <a v-for="message in messages.slice(0, 4)" :key="message.id" href="" class="flx jc-sb msg-list gap-4">
            <div class="flx gap-8">
                <div class="bg-img br-50"></div>
                <div>
                    <div class="name">Andrey Finn</div>
                    <div class="wrap-text wrap-line-1 gray fs-09">Hello, Good day i would love to make an enquiry as regards your timing</div>
                </div>
            </div>
            <div>
                <span class="count br-50 flx jc-c ai-c fs-09">3</span>
            </div>
        </a>
    </div>
    <div v-else class="bg-white flx-1 br-16 centered">
        <div class="text-center">
            <div>No Messages</div>
            <span class="gray">New Messages will appear here</span>
        </div>
    </div>
</template>
<script>
import { mapState } from 'vuex'
export default {
    name: 'DashMessageCard',
    computed: {
        ...mapState({
            messages: (state) => state.messages
        })
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
.bg-img {
    height: 40px;
    width: 40px;
}
a {
    &:hover {
        background-color: #fdfcfc;
    }
}
</style>