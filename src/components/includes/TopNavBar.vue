<template>
    <nav class="sticky" id="top_nav">
        <div class="flx jc-sb ai-c nav-wrapper">
            <div class="flx">
                <button @click.prevent="$store.commit('toggleMenu')" aria-expanded="false" aria-controls="menus" v-if="device == 'mobile'" id="mobile_menu_toggle">
                    <svg xmlns="http://www.w3.org/2000/svg" height="17" viewBox="0 0 25.143 19.533">
                        <path d="M2,18.234H24m-22-8.2H24M2,1.844H14.571" transform="translate(-0.429 -0.272)" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="3.143"/>
                    </svg>
                </button>
                <div v-else>
                    <div>Hello <strong>{{ computedFirstName(user.full_name) }}!</strong></div>
                </div>
            </div>
            <div class="flx gap-70">
                <ul class="flx gap-16 ai-c">
                    <a href="#" class="a-btn br-50 centered relative">
                        <svg id="settings" xmlns="http://www.w3.org/2000/svg" height="20" viewBox="0 0 22 24">
                            <path d="M9,12a2,2,0,1,0,2-2A2,2,0,0,0,9,12Z" fill="#595959"/>
                            <path d="M13.972,2.426a3.034,3.034,0,0,0-5.945,0A3.028,3.028,0,0,1,4.049,4.684,2.98,2.98,0,0,0,1.077,9.743a2.938,2.938,0,0,1,0,4.514,2.98,2.98,0,0,0,2.972,5.059,3.028,3.028,0,0,1,3.978,2.257,3.034,3.034,0,0,0,5.945,0,3.028,3.028,0,0,1,3.978-2.257,2.98,2.98,0,0,0,2.972-5.059,2.938,2.938,0,0,1,0-4.514,2.98,2.98,0,0,0-2.972-5.059A3.028,3.028,0,0,1,13.972,2.426ZM7,12a4,4,0,1,0,4-4A4,4,0,0,0,7,12Z" fill="#595959" fill-rule="evenodd"/>
                        </svg>
                    </a>
                    <a href="#" class="a-btn br-50 centered relative">
                        <svg xmlns="http://www.w3.org/2000/svg" height="18" viewBox="0 0 20 23.5">
                            <path id="Path_2297" data-name="Path 2297" d="M-3271.98-1027.9a1,1,0,0,1,.2-1.4,1,1,0,0,1,1.4.2,2.751,2.751,0,0,0,4.4,0,1,1,0,0,1,1.4-.2,1,1,0,0,1,.2,1.4,4.723,4.723,0,0,1-3.8,1.9A4.721,4.721,0,0,1-3271.98-1027.9Zm-3.759-3.628a3.138,3.138,0,0,1-2.468-3.18,3.335,3.335,0,0,1,1.6-2.617c.844-.709,1.653-1.39,1.4-2.676-.5-4.2,2.654-7.965,6-8.448,0-.017,0-.035,0-.052a1,1,0,0,1,1-1,1,1,0,0,1,1,1,.465.465,0,0,1,0,.052c3.348.482,6.5,4.247,6,8.448-.257,1.287.544,1.961,1.382,2.667a3.394,3.394,0,0,1,1.617,2.625,3.177,3.177,0,0,1-2.468,3.18,23.019,23.019,0,0,1-7.532,1.028A23.018,23.018,0,0,1-3275.739-1031.528Z" transform="translate(3278.207 1049.5)" fill="#595959"/>
                        </svg>
                        <i v-if="computedNotifications" class="bg-primary br-50"></i>
                    </a>
                    <a href="#" class="u-a">
                        <div class="bg-img br-50" :style="{ backgroundImage: 'url('+avatar+')'}"></div>
                    </a>
                </ul>
            </div>
        </div>
    </nav>
</template>

<script>
import userNameMixin from '@/mixins/userNameMixin'
export default {
    name: 'TopNavBar',
    props: ['device', 'user', 'avatar'],
    mixins: [userNameMixin],
    data() {
        return {
            computedNotifications: false
        }
    }
}
</script>

<style lang="scss" scoped>
nav {
    container-type: inline-size;
    top: 0;
    padding: 32px 0 16px 0;
    z-index: 90;
    background-color: var(--bg-color);
}
.nav-wrapper{
    height: 60px;
}
.bg-img{
    width: 52px;
    height: 52px;
    transition: 0.3s ease;
    border: 1.5px solid #e1dedb;
    background-color: #ffffff;
}
.a-btn {
    height: 52px;
    width: 52px;
    background-color: #fff;
    &:hover {
        path {
            fill: #000
        }
    }
    i{
        position: absolute;
        height: 8px;
        width: 8px;
        top: 16px;
        right: 17px;
    }
}
button {
    padding: 16px;
    background-color: transparent;
    &:active {   
        background-color: var(--input-hover);
    }
}
@container (inline-size <= 548px) {
    span {
        display: none
    }
    .gap-50{
        gap: 30px
    }
}
</style>