<template>
    <section class="main">
        <div class="flx chat-section-wrapper">
            <div class="chat-left-pane overflow-y-scroll scroll-hidden bg-white">
                <div class="pd-32">
                    <h1 class="mb-16">Chats</h1>
                    <div class="chat-wrapper flx column gap-16">
                        <div class="input-wrapper search">
                            <i>
                                <svg xmlns="http://www.w3.org/2000/svg" height="16" viewBox="0 0 19.658 19.661">
                                    <path d="M10.248,19.051a9.373,9.373,0,1,1,9.373-9.373A9.386,9.386,0,0,1,10.248,19.051Zm0-17.374a8,8,0,1,0,8,8A8.01,8.01,0,0,0,10.248,1.676Zm9.6,18.29a.678.678,0,0,1-.485-.2l-1.829-1.829a.685.685,0,0,1,.969-.969L20.334,18.8a.69.69,0,0,1,0,.969A.678.678,0,0,1,19.85,19.966Z" transform="translate(-0.875 -0.305)"/>
                                </svg>
                            </i>
                            <input class="form-control" v-model="search" type="search" ref="searchInput" placeholder="Search message...">
                        </div>
                        <div>
                            <nav v-if="is_super || is_admin" class="flx mb-16">
                                <ul class="flx br-16 tab">
                                    <li><a href="#" :class="{'active' : messageTab == 'recent'}" @click.prevent="toggleDisplay('recent')">Recent</a></li>
                                    <li><a href="#" :class="{'active' : messageTab == 'guides'}" @click.prevent="toggleDisplay('guides')">Guides</a></li>
                                    <li><a href="#" :class="{'active' : messageTab == 'climbers'}" @click.prevent="toggleDisplay('climbers')">Climbers</a></li>
                                </ul>
                            </nav>
                            <div v-if="!messages.length && !computedItem.length && !search" class="bg-white mt-24 pd-24 br-16 centered">
                                No Messages
                            </div>
                            <div v-else-if="computedItem.length" class="flx column gap-8">
                                <chat-list v-for="message in computedItem" :key="message.id" :user="message" :contactOnly="contactOnly" /> 
                            </div>
                            <div v-else class="mt-16"><strong>No search result for:</strong> <i>{{ search }}</i></div>
                        </div>
                    </div>
                </div>
            </div>
            <router-view></router-view>
        </div>
    </section>
</template>

<script>
import ChatList from '@/components/includes/ChatList.vue'
import userRolesMixin from '@/mixins/userRolesMixin'
import { mapState } from 'vuex'
export default {
    components: { ChatList },
    name: 'ChatsView',
    mixins: [userRolesMixin],
    computed: {
        ...mapState({
            messages: (state) => state.messages,
            climbers: (state) => state.climbers,
            guides: (state) => state.guides,
            messageTab: (state) => state.messageTab,
            contactOnly: (state) => state.contactOnly
        }),
        computedItem() {
            let newArr = []
            let tab = this.messageTab
            if(tab === 'climbers') {
                newArr = this.climbers
            }else if(tab === 'guides') {
                newArr = this.guides
            }else {
                newArr = this.messages.map(element => {
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
            if(this.search !=='') {
                return newArr.filter(item => {
                    if(!this.contactOnly)
                    return item.name.toLowerCase().match(this.search.replace(/[^\w\s]/gi, "").toLowerCase()) || item.preview.toLowerCase().match(this.search.replace(/[^\w\s]/gi, "").toLowerCase())
                    else
                    return item.name.toLowerCase().match(this.search.replace(/[^\w\s]/gi, "").toLowerCase())
                })
            }else {
                if(tab === 'climbers' || tab === 'guides')
                return newArr.sort((a, b) => a.name.localeCompare(b.name)) 
                else
                return newArr.sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at))
            }
        }
    },
    data () {
        return {
            search: '',
        }
    },
    methods: {
        toggleDisplay(tab) {
            this.$store.commit('setMessageTab', tab)
        }
    },
    mounted() {
        this.$store.commit('closeModal')
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
.chat-left-pane {
    border-top-left-radius: 24px;
    border-bottom-left-radius: 24px;

}
.input-wrapper.search {
    input[type=search] {
        background-color: #FAFAFA;
        &:hover {
            background-color: #f4f3f2;
        }
        &:focus {
            background-color: transparent;
        }
    }
}

</style>