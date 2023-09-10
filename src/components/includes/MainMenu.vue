<template>
    <teleport v-if="logingOut" to="body">
        <div class="overlay centered">
            <spinner />
        </div>
    </teleport>
    <aside id="menus" class="flx" :class="{ 'expanded' : menu }">
        <nav class="flx column gap-32 jc-sb">
            <div v-if="device !== 'mobile'" id="logo_wrapper">
                <svg xmlns="http://www.w3.org/2000/svg" height="10" viewBox="0 0 54.5 14.4">
                    <path d="M.66-7.02C.66-2.36,3.3.2,9.46.2,15.04.2,17.84-1.94,18.2-6H14.54c-.34,2.28-2.1,3.18-5.08,3.18-3.64,0-5.2-1.32-5.2-4.2,0-2.86,1.54-4.16,5.2-4.16,3,0,4.74.88,5.08,3.14H18.2c-.36-4.04-3.16-6.16-8.74-6.16C3.3-14.2.66-11.66.66-7.02ZM34.88-7.6a4.1,4.1,0,0,0,1.1-2.72c0-2.06-.98-3.68-4.16-3.68H19.5V0H32.3c3.18,0,4.56-1.72,4.56-4.08A3.954,3.954,0,0,0,34.88-7.6ZM23.1-11.4h7.42c.98,0,1.86,0,1.86,1.44,0,1.46-.88,1.46-1.84,1.46H23.1Zm8.32,8.62H23.1V-5.74h8.32c.96,0,1.84,0,1.84,1.48S32.38-2.78,31.42-2.78ZM46.36.2c6.14,0,8.8-2.58,8.8-7.22,0-4.62-2.66-7.18-8.8-7.18-6.16,0-8.8,2.54-8.8,7.18C37.56-2.36,40.2.2,46.36.2Zm0-3.02c-3.74,0-5.2-1.32-5.2-4.2,0-2.86,1.44-4.16,5.2-4.16s5.2,1.32,5.2,4.16C51.56-4.16,50.1-2.82,46.36-2.82Z" transform="translate(-0.66 14.2)"/>
                </svg>
            </div>
            <div v-else class="flx column gap-40">
                <div class="flx jc-sb top-btn-wrapper">
                    <button @click="$store.commit('toggleMenu')" class="br-50 bg-transparent">
                        <svg xmlns="http://www.w3.org/2000/svg" height="20" viewBox="0 0 20.828 20.828">
                            <path d="M19,19l-9-9m0,0L1,1m9,9,9-9m-9,9L1,19" transform="translate(0.414 0.414)" fill="none" stroke="#fff" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/>
                        </svg>
                    </button>
                    <div class="flx gap-8">
                        <button class="br-50">
                            <svg id="settings" xmlns="http://www.w3.org/2000/svg" height="20" viewBox="0 0 22 24">
                                <path d="M9,12a2,2,0,1,0,2-2A2,2,0,0,0,9,12Z" fill="#595959"/>
                                <path d="M13.972,2.426a3.034,3.034,0,0,0-5.945,0A3.028,3.028,0,0,1,4.049,4.684,2.98,2.98,0,0,0,1.077,9.743a2.938,2.938,0,0,1,0,4.514,2.98,2.98,0,0,0,2.972,5.059,3.028,3.028,0,0,1,3.978,2.257,3.034,3.034,0,0,0,5.945,0,3.028,3.028,0,0,1,3.978-2.257,2.98,2.98,0,0,0,2.972-5.059,2.938,2.938,0,0,1,0-4.514,2.98,2.98,0,0,0-2.972-5.059A3.028,3.028,0,0,1,13.972,2.426ZM7,12a4,4,0,1,0,4-4A4,4,0,0,0,7,12Z" fill="#595959" fill-rule="evenodd"/>
                            </svg>
                        </button>
                        <button class="br-50">
                            <svg xmlns="http://www.w3.org/2000/svg" height="20" viewBox="0 0 20 23.5">
                                <path d="M-3271.98-1027.9a1,1,0,0,1,.2-1.4,1,1,0,0,1,1.4.2,2.751,2.751,0,0,0,4.4,0,1,1,0,0,1,1.4-.2,1,1,0,0,1,.2,1.4,4.723,4.723,0,0,1-3.8,1.9A4.721,4.721,0,0,1-3271.98-1027.9Zm-3.759-3.628a3.138,3.138,0,0,1-2.468-3.18,3.335,3.335,0,0,1,1.6-2.617c.844-.709,1.653-1.39,1.4-2.676-.5-4.2,2.654-7.965,6-8.448,0-.017,0-.035,0-.052a1,1,0,0,1,1-1,1,1,0,0,1,1,1,.465.465,0,0,1,0,.052c3.348.482,6.5,4.247,6,8.448-.257,1.287.544,1.961,1.382,2.667a3.394,3.394,0,0,1,1.617,2.625,3.177,3.177,0,0,1-2.468,3.18,23.019,23.019,0,0,1-7.532,1.028A23.018,23.018,0,0,1-3275.739-1031.528Z" transform="translate(3278.207 1049.5)" fill="#595959"/>
                            </svg>
                        </button>
                    </div>
                </div>
                <a href="#" class="u-a">
                    <div class="bg-img br-50" :style="{ backgroundImage: 'url('+avatar+')'}"></div>
                </a>
            </div>
            <div class="flx column nav-wrapper">
                <li>
                    <router-link :to="{ name: 'Home' }">
                        <svg xmlns="http://www.w3.org/2000/svg" height="22" viewBox="0 0 22.664 22.664">
                            <path d="M-1981.058,22.6a.469.469,0,0,1-.443-.47V15.216a.945.945,0,0,1,.944-.946h3.777a.945.945,0,0,1,.944.946v6.915a.469.469,0,0,1-.443.47q-1.193.063-2.376.063Q-1979.858,22.664-1981.058,22.6Zm7.112-.7V15.216a2.836,2.836,0,0,0-2.833-2.839h-3.777a2.835,2.835,0,0,0-2.832,2.839v6.673a.469.469,0,0,1-.521.468c-.18-.021-.361-.043-.541-.066-2.93-.374-4.319-1.5-4.855-3.943a29.608,29.608,0,0,1-.485-9.857c.159-1.057,5.785-5.379,8.988-7.764a3.652,3.652,0,0,1,4.36-.01c3.23,2.383,8.911,6.718,8.981,7.774,0,.033,0,.068.006.1a37.322,37.322,0,0,1-.492,9.753c-.485,2.464-1.923,3.577-4.855,3.943q-.313.039-.625.074a.469.469,0,0,1-.053,0A.47.47,0,0,1-1973.947,21.9Z" transform="translate(1990)" fill="#b5a28f"/>
                        </svg>
                        <span>Home</span>
                    </router-link>
                </li>
                <li>
                    <a href="">
                        <svg xmlns="http://www.w3.org/2000/svg" height="21" viewBox="0 0 20 18.333">
                            <path d="M3.568,4.593a3.65,3.65,0,0,0-.355,7.273l1.9,6.1A1.475,1.475,0,0,0,8,17.53V12.152a21.958,21.958,0,0,1,5.145,2.3c.578.32,1.149.635,1.714.924,3.172,1.621,4.027-1.588,4.257-4.359a.95.95,0,0,0,.65-.22C20,10.561,20,10.186,20,9.434V7.043c0-.752,0-1.127-.234-1.361a.95.95,0,0,0-.65-.22c-.23-2.771-1.085-5.98-4.257-4.359-.565.289-1.136.6-1.714.924A21.466,21.466,0,0,1,7.885,4.353c-.76.18-1.141.27-1.313.487S6.4,5.4,6.4,6.077v.966a.8.8,0,0,1-1.6,0V5.821a1.978,1.978,0,0,0-.071-.759.8.8,0,0,0-.4-.4A2,2,0,0,0,3.568,4.593Z" transform="translate(0 -0.666)" fill="#b5a28f"/>
                        </svg>
                        <span>Upcoming Events</span>
                    </a>
                </li>
                <li>
                    <a href="">
                        <svg xmlns="http://www.w3.org/2000/svg" height="23" viewBox="0 0 22.663 24.552">
                            <path d="M-3163-918.784q0-.5.008-.979a.928.928,0,0,1,.933-.909h20.78a.928.928,0,0,1,.933.909q.008.475.008.979c0,9.332-2,11.332-11.331,11.332S-3163-909.452-3163-918.784Zm13.22,5.666a.944.944,0,0,0,.944.944H-3146a.944.944,0,0,0,.944-.944.943.943,0,0,0-.944-.944h-2.833A.944.944,0,0,0-3149.78-913.117Zm-8.5,0a.945.945,0,0,0,.944.944h2.833a.945.945,0,0,0,.944-.944.944.944,0,0,0-.944-.944h-2.833A.944.944,0,0,0-3158.278-913.117Zm-3.518-9.444a.909.909,0,0,1-.913-1.038c.566-3.615,2.063-5.342,5.375-6.067v2.383a1.889,1.889,0,0,0,1.888,1.889,1.889,1.889,0,0,0,1.889-1.889v-2.8q.89-.034,1.889-.032t1.888.032v2.8a1.889,1.889,0,0,0,1.888,1.889,1.89,1.89,0,0,0,1.889-1.889v-2.383c3.312.724,4.809,2.452,5.375,6.067a.909.909,0,0,1-.913,1.038Zm12.961-4.721v-3.777a.944.944,0,0,1,.944-.944.945.945,0,0,1,.945.944v3.777a.945.945,0,0,1-.945.945A.945.945,0,0,1-3148.835-927.283Zm-7.555,0v-3.777a.945.945,0,0,1,.944-.944.945.945,0,0,1,.945.944v3.777a.945.945,0,0,1-.945.945A.945.945,0,0,1-3156.39-927.283Z" transform="translate(3163 932.004)" fill="#b5a28f"/>
                        </svg>
                        <span>Calendar</span>
                    </a>
                </li>
                <li>
                    <a href="">
                        <svg xmlns="http://www.w3.org/2000/svg" height="22" viewBox="0 0 22.663 22.664">
                            <path d="M-3164-1016.966c0-9.332,2-11.332,11.331-11.332,7.329,0,10.136,1.234,11,6.283a.28.28,0,0,1-.276.328h-6a4.73,4.73,0,0,0-1.806.359,4.722,4.722,0,0,0-1.532,1.023,4.727,4.727,0,0,0-1.023,1.532,4.72,4.72,0,0,0-.36,1.807,4.72,4.72,0,0,0,.36,1.807,4.717,4.717,0,0,0,1.023,1.532,4.722,4.722,0,0,0,1.532,1.023,4.713,4.713,0,0,0,1.806.359h6a.28.28,0,0,1,.276.328c-.867,5.049-3.674,6.283-11,6.283C-3162-1005.634-3164-1007.634-3164-1016.966Zm16.052,2.833a2.835,2.835,0,0,1-1.083-.216,2.832,2.832,0,0,1-.919-.614,2.848,2.848,0,0,1-.615-.919,2.841,2.841,0,0,1-.215-1.084,2.833,2.833,0,0,1,.215-1.084,2.861,2.861,0,0,1,.615-.92,2.832,2.832,0,0,1,.919-.614,2.835,2.835,0,0,1,1.083-.216h6.265a.282.282,0,0,1,.282.266c.044.787.064,1.642.064,2.568s-.02,1.781-.064,2.569a.282.282,0,0,1-.282.265Zm0-2.833a.944.944,0,0,0,.945.944h1.888a.943.943,0,0,0,.944-.944.944.944,0,0,0-.944-.944H-3147A.945.945,0,0,0-3147.947-1016.966Z" transform="translate(3164 1028.298)" fill="#b5a28f"/>
                        </svg>
                        <span>Payout</span>
                    </a>
                </li>
                <li>
                    <a href="">
                        <svg xmlns="http://www.w3.org/2000/svg" height="22" viewBox="0 0 22.663 22.664">
                            <path d="M22.663,10.073C22.663,1.679,20.663,0,11.332,0S0,1.778,0,10.073c0,5.349.945,8.814,5.194,8.814a3.61,3.61,0,0,1,3.576,2.083,2.785,2.785,0,0,0,5.125,0,3.61,3.61,0,0,1,3.575-2.083C21.719,18.886,22.663,15.529,22.663,10.073ZM7.555,11.332a.944.944,0,1,0-.944-.944A.944.944,0,0,0,7.555,11.332Zm4.722-.944a.944.944,0,1,1-.944-.944A.944.944,0,0,1,12.276,10.387Zm2.833.944a.944.944,0,1,0-.944-.944A.944.944,0,0,0,15.109,11.332Z" fill="#b5a28f" fill-rule="evenodd"/>
                        </svg>
                        <span>Chats</span>
                    </a>
                </li>
            </div>
            <li>
                <a href="#" @click.prevent="logOut">
                    <div class="centered br-50">
                        <svg xmlns="http://www.w3.org/2000/svg" height="20" viewBox="0 0 16.661 18.176">
                            <path id="Subtract" d="M.169,9.467c0,6.627.633,6.819,5.451,8.281.336.1.692.21,1.069.327,3.177.983,4.83.432,5.676-1.436a8.562,8.562,0,0,0,2.267-.244,2.55,2.55,0,0,0,1.613-1.244,5.535,5.535,0,0,0,.521-2.248c.064-.9.064-2.026.064-3.414V9.435c0-1.388,0-2.518-.064-3.413a5.516,5.516,0,0,0-.522-2.245,2.546,2.546,0,0,0-1.614-1.24,8.6,8.6,0,0,0-2.266-.243C11.519.427,9.866-.124,6.689.859c-.377.117-.733.225-1.069.327C.8,2.648.169,2.84.169,9.467Zm14.05,5.553a5.864,5.864,0,0,1-1.4.175,29.343,29.343,0,0,0,.391-5.728,29.351,29.351,0,0,0-.391-5.728,5.9,5.9,0,0,1,1.4.174,1.111,1.111,0,0,1,.752.549,4.221,4.221,0,0,1,.35,1.661c.06.838.06,1.917.06,3.338s0,2.5-.06,3.34a4.24,4.24,0,0,1-.35,1.665A1.114,1.114,0,0,1,14.219,15.019ZM9.586,10.184a.717.717,0,1,1,.724-.717A.721.721,0,0,1,9.586,10.184Z" transform="translate(-0.169 -0.379)" fill="#fff" fill-rule="evenodd"/>
                        </svg>
                    </div>
                    <span>Log out</span>
                </a>
            </li>
        </nav>
    </aside>
</template>

<script>
import { mapState } from 'vuex';
import Spinner from './Spinner.vue';
export default {
    components: { Spinner },
    name: 'MainMenu',
    props: ['user', 'device', 'avatar'],
    computed: {
        ...mapState({
            menu: (state) => state.menu
        })
    },
    data() {
        return {
            logingOut: false
        }
    },
    methods: {
        logOut() {
            this.logingOut = true
            this.$store.dispatch('logOut', this.user)
        }
    }
}
</script>

<style lang="scss" scoped>
$navWidth: 185px;
$colapseGap: 12px;
aside{
    background-color: var(--secondary-light);
    position: fixed;
    bottom: 0;
    top: 0;
    z-index: 92;
    *{
        transition: 0.3s ease-out width;
    }
    overflow-x: auto;
    &::-webkit-scrollbar {
        display: none;
        -ms-overflow-style: none; 
        scrollbar-width: none; 
    }
    a {
        position: relative;
        display: flex;
        &:hover:not(.router-link-active, .u-a){
            background-color: rgba($color: #ffffff, $alpha: .1);
        }
        &:active:not(.router-link-active, .u-a) {
            background-color: rgba($color: #ffffff, $alpha: .08) ;
            transform: scale(0.98);
        }
        i{
            background-color: var(--primary-color);
            font-size: 0.8rem;
            border-radius: 16px;
            font-weight: 600;
            font-style: normal;
        }
        div {
            background-color: #212020;
            height: 40px;
            width: 40px;
        }
    }
}
.tablet aside, .desktop aside {
    padding: 32px var(--aside-padding);
    left: 0;
    margin: var(--dash-padding);
    border-radius: 40px;
    height: calc(100vh - var(--dash-padding) *2);
    #icon {
        display: block;
        margin-top: 5px;
    }
    #logo_wrapper{
        display: flex;
    }
    nav{
        height: 100%;
        width: var(--nav-width);
        color: var(--ft-white);
        *{
            transition: inherit;
        }
        .nav-wrapper{
            gap: $colapseGap;
            svg {
                margin-left: 8px;
            }
        }
        li {
            display: flex;
            &:hover {
                a {
                    background-color: #3721040c;
                }
            }
        }
        #logo{
            display: none;
        }
        a{
            flex-grow: 1;
            width: inherit;
            height: 45px;
            border-radius: 16px;
            align-items: center;
            transition: 100ms background-color linear;
            span {
                display: none;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
                font-size: 15px;
                animation: fadeOutSlide .6s;
            }
            i{
                position: absolute;
                right: 8px;
                top: 8px;
                height: 9px;
                width: 9px;
                overflow: hidden;
                border: 2px solid #000;
            }
        }
    }
    &:hover {
        border-radius: 24px;
        nav {
            width: $navWidth;
            gap: 16px;
            a {
                justify-content: flex-start;
                gap: 12px;
                span {
                    display: block;
                    animation: fadeInSlide 0.6s;
                }
                i{
                    position: unset;
                    padding: 0 8px;
                    height: unset;
                    width: unset;
                    border: unset;
                }
            }
            #logo {
                display: block;
            }
            #icon {
                display: none;
            }
        }
    }
}
.mobile {
    --aside-padding: 20px;
    aside {
        padding: 16px var(--aside-padding);
        left: calc((-100vw - 120px));
        width: 100vw;
        min-width: 270px;
        height: 100dvh;
        transition: 0.3s ease-out;
        visibility: hidden;
        background-color: #000;
        .nav-wrapper{
            gap: 2px;
            path {
                fill: #c1c1c4;
            }
        }
        #icon{
            display: none;
        }
        nav {
            gap: 16px;
            width: 100%;
            a {
                border-radius: 16px;
                gap: 16px;
                height: 60px;
                padding: 0 16px;
                align-items: center;
                color: #c1c1c4;
                i{
                    padding: 0 8px;
                }
            }
            span {
                transform: translateX(-50px);
                transition: 0.6s ease;
            }
            
            .logout{
                margin-top: 20px;
            }
            #logo_wrapper{
                padding: 10px 16px;
                svg {
                    height: 35px;
                }
            }
        }
    }
    .expanded{
        left: 0;
        visibility: visible;
        span {
            transform: translateX(0);
        }
    }
}
.top-btn-wrapper{
    button {
        height: 50px;
        width: 50px;
    }
}
@keyframes fadeInSlide {
  from { opacity: 0; transform: translateX(10px);}
  to { opacity: 1; display: block; transform: translateX(0)}
}
@keyframes fadeOutSlide {
  from { display: block; transform: translateX(0) }
  to { display: none; transform: translateX(60px)}
}
.desktop, .tablet {
    .router-link-active{
        path {
            fill: #000;
        }
        i {
            background-color: var(--white);
            color: var(--primary-color);
            border-color: var(--primary-color);
        }
    }
}
.mobile {
    .router-link-active{
        &::before {
            content: '';
            width: 4px;
            background-color: var(--primary-color);
            position: absolute;
            height: 50%;
            border-radius: 2px;
            left: -8px;
        }
    }
}
.bg-img{
    width: 75px;
    height: 75px;
    transition: 0.3s ease;
}
.overlay{
    --opacity: 0.7;
    background-color: rgba($color: #000000, $alpha: var(--opacity));
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 999;
}
</style>