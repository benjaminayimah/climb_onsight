<template>
    <div class="centered sticky pd-32 bt--100">
        <button @click.prevent="handleChat" class="button-primary btn-md gap-4">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="23" viewBox="0 0 24 23" fill="none">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M23.3315 10.2407C23.3315 1.84678 21.3314 0.167969 11.9997 0.167969C2.66802 0.167969 0.667969 1.9458 0.667969 10.2407C0.667969 15.5893 1.61251 19.0542 5.86192 19.0542C8.13286 19.0542 8.80841 20.133 9.43746 21.1375C9.9855 22.0126 10.4983 22.8315 12 22.8315C13.5018 22.8315 14.0145 22.0127 14.5626 21.1375C15.1916 20.133 15.8671 19.0542 18.138 19.0542C22.3874 19.0542 23.3315 15.6967 23.3315 10.2407ZM8.22248 11.4997C8.74401 11.4997 9.16679 11.0769 9.16679 10.5554C9.16679 10.0339 8.74401 9.6111 8.22248 9.6111C7.70095 9.6111 7.27816 10.0339 7.27816 10.5554C7.27816 11.0769 7.70095 11.4997 8.22248 11.4997ZM12.944 10.5554C12.944 11.0769 12.5213 11.4997 11.9997 11.4997C11.4782 11.4997 11.0554 11.0769 11.0554 10.5554C11.0554 10.0339 11.4782 9.6111 11.9997 9.6111C12.5213 9.6111 12.944 10.0339 12.944 10.5554ZM15.777 11.4997C16.2985 11.4997 16.7213 11.0769 16.7213 10.5554C16.7213 10.0339 16.2985 9.6111 15.777 9.6111C15.2555 9.6111 14.8327 10.0339 14.8327 10.5554C14.8327 11.0769 15.2555 11.4997 15.777 11.4997Z" fill="white"/>
            </svg>
            Send a message
        </button>
    </div>
</template>

<script>
export default {
    name: 'SendMessageButton',
    props: {
        user: Object
    },
    methods: {
        handleChat() {
            this.$router.push({ name: 'ChatDetails', params: { recipient_id: this.user.id, recipient_name: this.user.name }, replace: true})
        }
    }
}
</script>

<style lang="scss" scoped>
.sticky {
    background: linear-gradient(to top, #fff 20%,rgba(255,255,255,0) 80%);
}
.btn-md {
    padding: 12px 16px;
}
</style>