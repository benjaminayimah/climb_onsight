<template>
    <div class="flx-grow-1 notification-card bg-white br-16">
        <div class="mb-8">New Notifications({{ notifications.length }})</div>
        <ul>
            <li v-for="notifiction in notifications.slice(0, 5)" :key="notifiction.id">
                <a href="" class="flx jc-sb ai-c gap-8">
                    <div class="flx gap-8">
                        <i class="br-50 centered flx-shrink-0">
                            <svg xmlns="http://www.w3.org/2000/svg" height="14" viewBox="0 0 12 14.1">
                                <path d="M-3484.264-194.94a.6.6,0,0,1,.12-.84.6.6,0,0,1,.841.12,1.65,1.65,0,0,0,2.64,0,.6.6,0,0,1,.84-.12.6.6,0,0,1,.121.84,2.833,2.833,0,0,1-2.28,1.14A2.833,2.833,0,0,1-3484.264-194.94Zm-2.255-2.177a1.881,1.881,0,0,1-1.48-1.907,2,2,0,0,1,.963-1.571c.5-.426.991-.834.837-1.606a4.647,4.647,0,0,1,3.6-5.069c0-.01,0-.021,0-.031a.6.6,0,0,1,.6-.6.6.6,0,0,1,.6.6c0,.01,0,.021,0,.031a4.647,4.647,0,0,1,3.6,5.069c-.154.772.327,1.177.83,1.6a2.037,2.037,0,0,1,.97,1.576,1.9,1.9,0,0,1-1.48,1.907,13.8,13.8,0,0,1-4.52.617A13.8,13.8,0,0,1-3486.519-197.117Z" transform="translate(3488 207.9)"/>
                            </svg>
                        </i>
                        <div class="wrap-text wrap-line-2 flx noti-preview">Ivan Jhay accepted your guide request</div>
                    </div>
                    <span class="pill fs-09">View</span>
                </a>
            </li>
            <div class="text-center mt-16">
                <a href="#" class="a-link">See all</a>
            </div>
        </ul>
    </div>
</template>

<script>
export default {
    name: 'NotificationCard',
    data() {
        return {
            notifications: [
                {id: 1},
                {id: 2},
                {id: 3},
                {id: 4},
                {id: 5},
                {id: 6},
                {id: 7},
                {id: 8},
                {id: 9},
                {id: 0}
            ]
        }
    }
}
</script>

<style lang="scss" scoped>
.notification-card {
    padding: 20px;
}
li {
    margin: 0 -8px;
    &:hover {
        a {
            background-color: #fbf8f7;
        }
    }
}
a {
    padding: 8px;
    border-radius: 12px;
    span {
        background-color: var(--secondary-color);
    }
    i {
        height: 45px;
        width: 45px;
        background-color: rgba(0, 0, 0, 0.03);
    }
}
.noti-preview {
    max-width: 225px;
}
</style>