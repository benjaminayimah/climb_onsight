<template>
    <section class="flx gap-24 column main">
        <div v-if="climbers.length" class="flx section-main-wrapper">
            <div class="section-main-left">
                <div class="flx ai-c gap-24 tap-height pd-r-24 collapsible">
                    <h1 class="title">All Climbers</h1>
                    <search-input @perform-search="performSearch" />
                </div>
                <div v-if="searchParam" class="mt-8">
                    <i>Search results for: </i>
                    <strong>{{ searchParam }}</strong>
                </div>
                <div class="body-content pd-r-24 overflow-y-scroll">
                    <div class="flx gap-16 flx-wrap">
                        <user-list v-for="user in computedClimbers" :key="user.id" :user="user" :climber="true" :redirect="true" />
                    </div>
                </div>
            </div>
            <transition name="slide-from-right">
                <div v-if="$route.query.id" class="flx-grow-1 section-main-right">
                    <div class="flx jc-sb ai-c tap-height pd-l-24 bd-l-1">
                        <div>Selected Climber</div>
                        <div>
                            <a href="#" @click="goBack" class="btn-close scale-in a-button bg-transparent">
                                <svg xmlns="http://www.w3.org/2000/svg" height="10" viewBox="0 0 13.587 13.587">
                                    <path d="M7.163,19.188,5.8,17.83,11.239,12.4,5.8,6.96,7.163,5.6,12.6,11.036,18.033,5.6,19.392,6.96,13.957,12.4l5.435,5.435-1.359,1.359L12.6,13.754Z" transform="translate(-5.805 -5.602)" fill="#1c1b1f"></path>
                                </svg>
                            </a>
                        </div>
                    </div>
                    <div class="body-content pd-l-24 bd-l-1 overflow-y-scroll">
                        <climber-details :climber="computedUser" />
                    </div>
                </div>
            </transition>
        </div>
        <div v-else class="empty-state flx column jc-c ai-c gap-16">
            <div class="text-center">
                <svg class="mb-16" xmlns="http://www.w3.org/2000/svg" height="70" viewBox="0 0 342.943 283.808">
                    <path d="M34.17,203.762c-7.082-5.553-9.146-16.957-9.23-17.44L11.719,95.371a3.161,3.161,0,1,1,6.256-.91l13.208,90.861s1.729,9.418,6.889,13.464c4.291,3.365,11.96,3.534,14.553,3.316l231.908-.012c.284.013,9.09.509,14.564-2.587,5.26-2.975,8.019-9.781,8.045-9.85l.248-1.185a3.161,3.161,0,1,1,6.153,1.452l-.378,1.6c-.271.782-3.668,9.361-10.956,13.482-7.125,4.03-17.441,3.428-17.878,3.4l-231.441.006c-.054.007-.814.069-2.035.069C47.219,208.482,39.491,207.933,34.17,203.762Zm298.679-10.38-55.417-54.808a63.178,63.178,0,1,1,8.073-8.687l55.679,55.067a5.927,5.927,0,0,1-8.336,8.428ZM183.985,91.391a51.367,51.367,0,1,0,51.367-51.367A51.424,51.424,0,0,0,183.985,91.391ZM75.278,171.79a15.2,15.2,0,0,1-10.172-6.6c-3.843-5.45-3.393-9.237-3.264-9.941a3.161,3.161,0,0,1,6.219,1.136h0c.014,0-.044,1.963,2.212,5.163a9.361,9.361,0,0,0,5.525,3.961l55.052.476a10.768,10.768,0,0,0,4.936-2.667,12.378,12.378,0,0,0,2.44-5.913l-.489-18.261a6.761,6.761,0,0,0-1.448-2.9,5.548,5.548,0,0,0-4.154-2.667c-2.013-.167-33.527-.265-54.2-.288-.923.054-4.1.517-5.774,1.953a9.957,9.957,0,0,0-2.759,4.562,3.161,3.161,0,0,1-6.15-1.464,16.061,16.061,0,0,1,4.792-7.9c3.617-3.1,9.131-3.445,9.748-3.473,12.567.011,53.23.076,55.188.341a11.765,11.765,0,0,1,8.43,5.227c2.622,3.625,2.683,6.069,2.639,6.731l.477,18.409a18.41,18.41,0,0,1-4.01,9.829c-3.385,3.82-8.655,4.679-9.245,4.764Zm243.011-28.972a3.161,3.161,0,0,1-2.746-3.528l17.1-137.422c-.335-1.778-2.111-9.609-8.15-14.411-6.89-5.477-16.51-4.8-16.607-4.79l-285.943.009c.1.016-7.015,1.076-11.237,6.34C7.032-6.395,6.276,2.067,6.3,4.941L16.981,79.189a3.161,3.161,0,0,1-6.259.9L.005,5.412c-.036-.942-.05-13.088,5.774-20.35,5.922-7.386,15.37-8.633,15.769-8.683l286.095-.023c.249-.029,11.973-.854,20.788,6.154C337.266-10.467,338.908.89,338.972,1.371l.057.409-.051.409L321.817,140.072a3.162,3.162,0,0,1-3.133,2.77A3.252,3.252,0,0,1,318.289,142.818ZM24.691-36.1s.2-6.416,2.808-10.277c2.051-3.038,6.458-6.279,8.866-7.013a16.145,16.145,0,0,1,3.237-.77l151.551-.165s4.146-9.949,9.432-15.349,10.029-5.653,10.029-5.653h91.011a16.263,16.263,0,0,1,7.934,2.38,11.857,11.857,0,0,1,4.616,6.341V-36.1Z" transform="translate(0 75.325)" fill="#2d74ff"/>
                </svg>
                <h3>No Climbers</h3>
                <div class="mb-24">There are no climbers</div>
            </div>
        </div>
    </section>
</template>
<script>
import UserList from '@/components/includes/UserList.vue'
import { mapState } from 'vuex'
import ClimberDetails from './ClimberDetails.vue'
import SearchInput from '@/components/includes/SearchInput.vue'
export default {
    components: { UserList, ClimberDetails, SearchInput },
    name: 'ClimbersView',
    computed: {
        ...mapState({
            climbers: (state) => state.climbers
        }),
        computedClimbers() {
            if(this.searchParam) {
                return this.climbers.filter(item => {
                    return item.name.toLowerCase().match(this.searchParam.replace(/[^\w\s]/gi, "").toLowerCase())
                })
            }else {
                return this.climbers
            }
        },
        computedUser() {
            if(this.climbers.length) {
                const user = this.climbers.find(user => user.id == this.$route.query.id)
                if(user)
                return user
                else
                return {}
            }
            return {}
        }
    },
    data() {
        return {
            searchParam: ''
        }
    },
    methods: {
        goBack() {
            if(this.$route.query.origin === this.$route.name) {
                this.$router.push({ name: 'Climbers'})
            }
            else {
                return this.$router.go(-1)
            }
        },
        performSearch(param) {
            this.searchParam = param
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
    border-bottom: 1px solid #e4e4e4;
}
.section-main-left {
    flex-basis: 60%;
    min-width: 60%;
}
.body-content {
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
.desktop, .tablet {
    a.user-list {
        max-width: calc(25% - 12px);
    }
}
.empty-state{
    height: 80vh;
}
</style>