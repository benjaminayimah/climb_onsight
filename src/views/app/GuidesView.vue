<template>
    <section class="flx gap-24 column main">
        <div class="flx section-main-wrapper">
            <div class="section-main-left">
                <div class="flx ai-c gap-24 tap-height pd-r-24">
                    <h1 class="title">Guides</h1>
                    <div class="search-wrapper bg-white br-32 flx ai-c">
                        Search Guides...
                    </div>
                </div>
                <div class="flx gap-16 flx-wrap body-content pd-r-24 overflow-y-scroll">
                    <user-list v-for="user in guides" :key="user.id" :user="user" :redirect="true" />
                </div>
            </div>
            <transition name="slide-from-right">
                <div v-if="$route.query.id" class="flx-grow-1 section-main-right">
                    <div class="flx jc-sb ai-c tap-height pd-l-24 bd-l-1">
                        <div>Selected Guide</div>
                        <div>
                            <a href="#" @click="goBack" class="btn-close scale-in a-button bg-transparent">
                                <svg xmlns="http://www.w3.org/2000/svg" height="10" viewBox="0 0 13.587 13.587">
                                    <path d="M7.163,19.188,5.8,17.83,11.239,12.4,5.8,6.96,7.163,5.6,12.6,11.036,18.033,5.6,19.392,6.96,13.957,12.4l5.435,5.435-1.359,1.359L12.6,13.754Z" transform="translate(-5.805 -5.602)" fill="#1c1b1f"></path>
                                </svg>
                            </a>
                        </div>
                    </div>
                    <div class="body-content pd-l-24 bd-l-1 overflow-y-scroll">
                        <guide-details :user="computedUser" />
                    </div>
                </div>
            </transition>
        </div>
    </section>
</template>
<script>
import UserList from '@/components/includes/UserList.vue'
import { mapState } from 'vuex'
import GuideDetails from './GuideDetails.vue'
export default {
    components: { UserList, GuideDetails },
    name: 'GuidesView',
    computed: {
        ...mapState({
            guides: (state) => state.guides
        }),
        computedUser() {
            if(this.guides.length) {
                const user = this.guides.find(user => user.id == this.$route.query.id)
                if(user)
                return user
                else
                return {}
            }
            return {}
        }
    },
    methods: {
        goBack() {
            if(this.$route.query.origin === this.$route.name) {
                this.$router.push({ name: 'Guides'})
            }
            else {
                return this.$router.go(-1)
            }
        }
    }
}
</script>

<style lang="scss" scoped>
section {
    --tap-height: 68px;
}
.tap-height {
    height: var(--tap-height);
}
.section-main-left {
    flex-basis: 60%;
    min-width: 60%;
}
.body-content {
    border-top: 1px solid #e4e4e4;
    padding-top: 20px;
    padding-bottom: 100px;
    height: calc(100dvh - 158px);
}
a.bg-img {
    flex-basis: calc(25% - 16px);
}
.search-wrapper {
    width: 300px;
    height: 45px;
    padding: 0 16px;
}
</style>