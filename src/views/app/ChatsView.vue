<template>
    <section class="main">
        <div class="bg-white br-24 flx chat-section-wrapper">
            <div class="chat-left-pane overflow-y-scroll ">
                <div class="pd-32">
                    <h1 class="mb-16">Chats</h1>
                    <div class="chat-wrapper flx column gap-16">
                        <div class="input-wrapper">
                            <i>
                                <svg xmlns="http://www.w3.org/2000/svg" height="16" viewBox="0 0 13.974 13.974">
                                    <path d="M-3384.438-704.614l-1.494-1.5c-1.017.746-2.525,1.083-4.788,1.083-2.569,0-4.164-.435-5.174-1.408-1.052-1.015-1.521-2.646-1.521-5.288s.469-4.273,1.521-5.288c1.01-.974,2.605-1.408,5.174-1.408s4.164.434,5.174,1.408c1.053,1.014,1.522,2.645,1.522,5.288,0,2.244-.338,3.759-1.085,4.786l1.5,1.5a.583.583,0,0,1,0,.824.58.58,0,0,1-.412.171A.582.582,0,0,1-3384.438-704.614Zm-10.647-11.556c-.795.766-1.165,2.18-1.165,4.448s.37,3.682,1.165,4.449c.775.747,2.121,1.08,4.364,1.08s3.589-.333,4.364-1.08c.795-.767,1.165-2.181,1.165-4.449s-.37-3.682-1.165-4.448c-.775-.748-2.12-1.081-4.364-1.081S-3394.311-716.918-3395.085-716.17Z" transform="translate(3397.417 718.417)" fill="#212135"></path>
                                </svg>
                            </i>
                            <input class="form-control" type="search" placeholder="Search message...">
                        </div>
                        <div>
                            <span class="gray mb-8 block">All messages</span>
                            <div class="flx column gap-8">
                                <chat-list v-for="chat in climbers" :key="chat.id" :user="chat" /> 
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="flx flx-1 chat-middle-pane">
                <div class="flx-1 chat-area column flx jc-sb flx-1">
                    <div class="chat-area-top flx gap-8 ai-c">
                        <profile-avatar :avatar="null" />
                        <div class="flx column">
                            <strong>John Doe</strong>
                            <i class="gray fs-08">Online</i>
                        </div>
                    </div>
                    <div class="chat-body flx-1 pd-24">
                        <div class="text-center">
                            <span class="pill pill-neutral fs-09">Today June 20</span>
                        </div>
                    </div>
                    <div class="chat-footer">
                        <form @submit.prevent="" class="flx ai-c gap-8 flx-1 br-32">
                            <div class="flx-1">
                                <input type="text" class="form-control" placeholder="Type a message">
                            </div>
                            <div class="flx ai-c gap-16">
                                <svg xmlns="http://www.w3.org/2000/svg" height="16" viewBox="0 0 12.631 16.84">
                                    <path d="M-3546.738-399.434a.777.777,0,0,1-.789-.765.778.778,0,0,1,.789-.766h1.579v-.765c0-.014,0-.027,0-.04a6.139,6.139,0,0,1-5.527-6.083.778.778,0,0,1,.789-.766.778.778,0,0,1,.79.766,4.6,4.6,0,0,0,4.736,4.593,4.6,4.6,0,0,0,4.737-4.593.777.777,0,0,1,.789-.766.778.778,0,0,1,.789.766,6.139,6.139,0,0,1-5.527,6.083c0,.013,0,.027,0,.04v.765H-3542a.778.778,0,0,1,.789.766.777.777,0,0,1-.789.765Zm-1.579-10.716c0-2.624.394-6.124,3.947-6.124s3.947,3.5,3.947,6.124-.4,6.124-3.947,6.124S-3548.317-407.525-3548.317-410.15Z" transform="translate(3550.686 416.273)" fill="#989087"/>
                                </svg>
                                <svg xmlns="http://www.w3.org/2000/svg" height="18" viewBox="0 0 12.63 17.542">
                                    <path d="M-3596.535-398.6c-2.849-.757-3.132-2.13-1.605-7.782s2.465-6.7,5.313-5.943c2.729.725,3.1,2.016,1.789,7.093a.714.714,0,0,1-.874.506.717.717,0,0,1-.51-.872c.278-1.073.471-1.941.58-2.652a5.2,5.2,0,0,0,.057-1.734.75.75,0,0,0-.274-.5,3.151,3.151,0,0,0-1.137-.473,3.167,3.167,0,0,0-1.223-.154.759.759,0,0,0-.487.294,5.2,5.2,0,0,0-.825,1.529,32.248,32.248,0,0,0-1.025,3.27,32.009,32.009,0,0,0-.76,3.34,5.163,5.163,0,0,0-.057,1.734.746.746,0,0,0,.273.5,3.156,3.156,0,0,0,1.137.473,3.17,3.17,0,0,0,1.224.154.757.757,0,0,0,.486-.294,2.286,2.286,0,0,0,.19-.247.8.8,0,0,1,.855-.353l.023.006a.654.654,0,0,1,.425.963,2.4,2.4,0,0,1-2.183,1.359A5.506,5.506,0,0,1-3596.535-398.6Zm3.88-3.382c-2.729-.725-3.1-2.016-1.789-7.092a.715.715,0,0,1,.875-.507.716.716,0,0,1,.51.872c-.278,1.073-.47,1.941-.579,2.652a5.163,5.163,0,0,0-.057,1.734.742.742,0,0,0,.274.5,3.137,3.137,0,0,0,1.136.473,3.171,3.171,0,0,0,1.224.154.756.756,0,0,0,.486-.294,5.189,5.189,0,0,0,.825-1.529,32.169,32.169,0,0,0,1.024-3.27,32.2,32.2,0,0,0,.761-3.34,5.19,5.19,0,0,0,.057-1.734.749.749,0,0,0-.274-.5,3.151,3.151,0,0,0-1.137-.473,3.168,3.168,0,0,0-1.223-.154.76.76,0,0,0-.487.294,2.307,2.307,0,0,0-.19.248.8.8,0,0,1-.855.352l-.024-.006a.654.654,0,0,1-.425-.963c.867-1.4,1.885-1.591,3.574-1.142,2.849.757,3.133,2.131,1.606,7.782-1.247,4.615-2.1,6.161-3.923,6.16A5.513,5.513,0,0,1-3592.655-401.98Z" transform="translate(3599.056 415.923)" fill="#989087"/>
                                </svg>
                                <button class="button-primary btn-rounded send-btn fw-600">
                                    send
                                    <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 26 26" fill="none">
                                        <path d="M23.8845 13.0179C23.8784 13.7769 23.4587 14.4218 23.1147 14.8512C22.7307 15.3304 22.2192 15.8091 21.6554 16.265C20.5217 17.1816 19.0237 18.1277 17.4779 18.9345C15.9342 19.7403 14.2791 20.4405 12.8217 20.8329C12.0956 21.0284 11.3686 21.1613 10.7023 21.1731C10.0656 21.1844 9.29813 21.0892 8.66299 20.6373L8.65954 20.6348C8.54031 20.5494 8.43685 20.4535 8.40036 20.4197L8.3934 20.4132C8.02409 20.0727 7.8428 19.6412 7.74596 19.3196C7.64242 18.9758 7.59112 18.6073 7.57025 18.2538C7.5284 17.5452 7.60017 16.7421 7.75891 15.9883C7.84589 15.5752 7.96525 15.1469 8.12241 14.7373C8.35555 14.1296 8.94758 13.7662 9.59397 13.6863L13.3377 13.3799C13.5294 13.3642 13.6766 13.2042 13.6763 13.0119C13.676 12.8195 13.5283 12.6591 13.3366 12.6428L9.59194 12.3252C8.90457 12.2383 8.27624 11.8426 8.04377 11.1895C7.89513 10.7719 7.78426 10.3368 7.70639 9.916C7.55935 9.12131 7.50993 8.2684 7.59784 7.51878C7.6417 7.14476 7.72508 6.74948 7.87777 6.38435C8.02532 6.03152 8.28529 5.59429 8.75031 5.29667L8.75107 5.29618C9.38615 4.88986 10.1412 4.82035 10.7664 4.84494C11.4248 4.87084 12.1452 5.01069 12.8687 5.21093C14.3204 5.61271 15.97 6.31024 17.5101 7.11064C19.051 7.91145 20.5449 8.84783 21.6738 9.75717C22.235 10.2092 22.7456 10.6861 23.128 11.1662C23.4714 11.5973 23.8907 12.2494 23.8845 13.0179Z" fill="#FBF7F4"/>
                                    </svg>
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
                <div class="chat-user-details">
                    <div class="pd-32 flx column gap-32">
                        <div class="centered profile gap-4">
                            <profile-avatar :avatar="null" />
                            <div class="fw-600">John Doe</div>
                            <span class="fs-09 gray">Mountain guide</span>
                        </div>
                        <div>
                            <div class="mb-16">Event History</div>
                            <ul class="flx column gap-16">
                                <li v-for="guide in climbers.slice(0, 3)" :key="guide.id">
                                    <a href="#" class="flx gap-8">
                                        <profile-avatar :avatar="guide.image" />
                                        <div>
                                            <div>The Climber</div>
                                            <div class="fs-09 gray">June 12th</div>
                                        </div>
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
import ChatList from '@/components/includes/ChatList.vue'
import { mapState } from 'vuex'
import ProfileAvatar from '@/components/includes/ProfileAvatar.vue'
export default {
    components: { ChatList, ProfileAvatar },
    name: 'ChatsView',
    computed: {
        ...mapState({
            climbers: (state) => state.climbers
        })
    }
}
</script>

<style lang="scss" scoped>
section {
    height: calc(100dvh - 116px);
}
.chat-section-wrapper{
    height: 100%;
}
.chat-left-pane, .chat-user-details{
    width: 360px;
}
.chat-area {
    border-right: 1px solid #F3F3F3;
    border-left: 1px solid #F3F3F3;
}
.chat-area-top, .chat-footer {
    border-bottom: 1px solid #F3F3F3;
    padding: 16px 24px;
}
.chat-area-top {
    img {
        height: 48px;
        width: 48px;
    }
}
.chat-footer {
    border-top-right-radius: 16px;
    border-top-left-radius: 16px;
    form {
        padding: 8px 12px 8px 16px;
        border: 1px solid #D9D9D9;
    }
    .form-control {
        border: unset;
    }
}
.input-wrapper {
    input {
        padding: 8px 12px 8px 45px;
        background-color: #FAFAFA;
        border-color: transparent;
        &:hover {
            background-color: #f4f3f2;
            border-color: transparent;
        }
        &:focus {
            border-color: #000;
            background-color: transparent;
        }
    }
    i {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        display: flex;
        justify-content: center;
        align-items: center;
        left: 20px;
    }
}

.send-btn {
    padding: 4px 16px;
}
.profile {
    img {
        height: 120px;
        width: 120px;
    }
}
ul {
    img {
        height: 55px;
        width: 55px;
    }
}
</style>