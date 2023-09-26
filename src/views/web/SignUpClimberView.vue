<template>
    <div class="logon-column-wrapper flx column ai-c br-16 bg-white">
        <div class="flx column column-inner ai-c gap-24">
            <div class="mb-32">
                <logo />
            </div>
            <div class="w-100 flx column gap-24 ai-c">
                <ul class="flx gap-8 logon-stepper mb-24">
                    <li :class="[{'active' : $route.path === '/signup-personal-info'}, {'completed' : newUser.dob}]">
                        <svg class="completed-check" xmlns="http://www.w3.org/2000/svg" height="11" viewBox="0 0 14.347 11.549">
                            <path d="M5.872,10.427l6.936-6.936-.932-.916-6.02,6L3.091,5.8l-.932.932Zm0,1.849L.326,6.73,3.091,3.949,5.872,6.73l5.987-6,2.814,2.748Z" transform="translate(-0.326 -0.727)" fill="#7afc96"/>
                        </svg>
                        <a href="#" @click.prevent class="centered">
                            <svg xmlns="http://www.w3.org/2000/svg" height="16" viewBox="0 0 17.417 19">
                                <path d="M-3508.083-442.334c0-3.259,1.537-3.958,8.708-3.958s8.708.7,8.708,3.958-1.537,3.959-8.708,3.959S-3508.083-439.074-3508.083-442.334Zm3.958-10.292a4.749,4.749,0,0,1,4.75-4.749,4.749,4.749,0,0,1,4.749,4.749,4.749,4.749,0,0,1-4.749,4.75A4.75,4.75,0,0,1-3504.125-452.625Z" transform="translate(3508.083 457.375)"/>
                            </svg>
                        </a>
                        <span>Personal information</span>
                    </li>
                    <li :class="[{'active' : $route.path === '/signup-climbing-experience'}, {'completed': ((newUser.skills && newUser.skills.length) || newUser.activities) }]">
                        <svg  class="completed-check" xmlns="http://www.w3.org/2000/svg" height="11" viewBox="0 0 14.347 11.549">
                            <path d="M5.872,10.427l6.936-6.936-.932-.916-6.02,6L3.091,5.8l-.932.932Zm0,1.849L.326,6.73,3.091,3.949,5.872,6.73l5.987-6,2.814,2.748Z" transform="translate(-0.326 -0.727)" fill="#7afc96"/>
                        </svg>
                        <a href="#" @click.prevent class="centered">
                            <svg xmlns="http://www.w3.org/2000/svg" height="12" viewBox="0 0 21 15.556">
                                <path d="M6.033,5.238A7.593,7.593,0,0,1,13.222,0a7.771,7.771,0,1,1,0,15.542c-2.655.03-5.123,0-7.778,0A5.28,5.28,0,0,1,0,10.491a5.327,5.327,0,0,1,5.25-5.31A5.354,5.354,0,0,1,6.033,5.238Z" fill-rule="evenodd"/>
                            </svg>

                        </a>
                        <span>Climbing experience</span>
                    </li>
                    <li :class="[{'active' : $route.path === '/signup-fun-facts'}, {'completed': newUser.bio}]">
                        <svg class="completed-check" xmlns="http://www.w3.org/2000/svg" height="11" viewBox="0 0 14.347 11.549">
                            <path d="M5.872,10.427l6.936-6.936-.932-.916-6.02,6L3.091,5.8l-.932.932Zm0,1.849L.326,6.73,3.091,3.949,5.872,6.73l5.987-6,2.814,2.748Z" transform="translate(-0.326 -0.727)" fill="#7afc96"/>
                        </svg>
                        <a href="#" @click.prevent class="centered">
                            <svg xmlns="http://www.w3.org/2000/svg" height="17" viewBox="0 0 19 19">
                                <path d="M-1980.5,19c-4.222,0-6.376-.509-7.683-1.816S-1990,13.722-1990,9.5s.509-6.376,1.816-7.683S-1984.723,0-1980.5,0s6.377.509,7.684,1.816S-1971,5.277-1971,9.5s-.509,6.377-1.816,7.684S-1976.278,19-1980.5,19Zm-.85-7.147h1.7v1.6a.751.751,0,0,0,.751.75.751.751,0,0,0,.75-.75v-1.6h1.6a.751.751,0,0,0,.75-.751.751.751,0,0,0-.75-.75h-1.6v-1.7h1.6a.751.751,0,0,0,.75-.75.751.751,0,0,0-.75-.75h-1.6V5.548a.751.751,0,0,0-.75-.75.751.751,0,0,0-.751.75V7.153h-1.7V5.548a.751.751,0,0,0-.75-.75.751.751,0,0,0-.75.75V7.153h-1.606a.751.751,0,0,0-.75.75.751.751,0,0,0,.75.75h1.606v1.7h-1.606a.751.751,0,0,0-.75.75.751.751,0,0,0,.75.751h1.606v1.6a.751.751,0,0,0,.75.75.751.751,0,0,0,.75-.75v-1.6Zm1.7-1.5h-1.7v-1.7h1.7v1.7Z" transform="translate(1990)"/>
                            </svg>
                        </a>
                        <span>Fun facts</span>
                    </li>
                    <li :class="[{'active' : $route.path === '/signup-interested-new-skills'}, {'completed': newUser.new_skills }]">
                        <svg class="completed-check" xmlns="http://www.w3.org/2000/svg" height="11" viewBox="0 0 14.347 11.549">
                            <path d="M5.872,10.427l6.936-6.936-.932-.916-6.02,6L3.091,5.8l-.932.932Zm0,1.849L.326,6.73,3.091,3.949,5.872,6.73l5.987-6,2.814,2.748Z" transform="translate(-0.326 -0.727)" fill="#7afc96"/>
                        </svg>
                        <a href="#" @click.prevent class="centered">
                            <svg xmlns="http://www.w3.org/2000/svg" height="15" viewBox="0 0 18 16.615">
                                <path d="M-3582.994-491.388a.39.39,0,0,1-.234-.691c1.128-.944,2.468-2.213,4.1-3.847,1.13-1.13,2.084-2.118,2.878-2.994a.359.359,0,0,1,.4-.1c1.429.592,1.846,1.652,1.846,3.478,0,3.42-1.466,4.153-8.307,4.153Zm-9.006-8.3c0-6.841.733-8.308,4.154-8.308s4.153,1.467,4.153,8.308-.733,8.307-4.153,8.307S-3592-492.851-3592-499.692Zm3.462,4.153a.692.692,0,0,0,.692.692.692.692,0,0,0,.692-.692.692.692,0,0,0-.692-.692A.693.693,0,0,0-3588.538-495.539Zm5.64.716a32.859,32.859,0,0,0,.245-4.869,29.5,29.5,0,0,0-.3-5.2.384.384,0,0,1,.126-.369c2.91-2.48,4.287-2.412,6.208-.49,2.419,2.419,1.9,3.974-2.937,8.812-1.037,1.037-1.923,1.875-2.7,2.529a.351.351,0,0,1-.229.085A.432.432,0,0,1-3582.9-494.823Z" transform="translate(3592 508)"/>
                            </svg>
                        </a>
                        <span>Interested new skills</span>
                    </li>            
                </ul>
                <router-view></router-view>
            </div>
        </div>
    </div>
</template>

<script>
import Logo from '@/components/includes/Logo.vue'
import { mapState } from 'vuex';
export default {
    components: { Logo },
    name: 'SignUpClimberView',
    computed: {
        ...mapState({
            newUser: (state) => state.newUser.form,
        })
    }
}
</script>

<style lang="scss" scoped>
.logon-column-wrapper {
    padding-top: 60px;
    padding-bottom: 60px;
}
li::after{
    top: 38% !important;
}

</style>