<template>
    <button class="nav-dropdown-toggle br-50" :id="id" @click="openDropdown(id)">
        <svg id="settings" xmlns="http://www.w3.org/2000/svg" height="20" viewBox="0 0 22 24">
            <path d="M9,12a2,2,0,1,0,2-2A2,2,0,0,0,9,12Z" fill="#595959"/>
            <path d="M13.972,2.426a3.034,3.034,0,0,0-5.945,0A3.028,3.028,0,0,1,4.049,4.684,2.98,2.98,0,0,0,1.077,9.743a2.938,2.938,0,0,1,0,4.514,2.98,2.98,0,0,0,2.972,5.059,3.028,3.028,0,0,1,3.978,2.257,3.034,3.034,0,0,0,5.945,0,3.028,3.028,0,0,1,3.978-2.257,2.98,2.98,0,0,0,2.972-5.059,2.938,2.938,0,0,1,0-4.514,2.98,2.98,0,0,0-2.972-5.059A3.028,3.028,0,0,1,13.972,2.426ZM7,12a4,4,0,1,0,4-4A4,4,0,0,0,7,12Z" fill="#595959" fill-rule="evenodd"/>
        </svg>
    </button>
    <teleport to="body">
        <backdrop v-if="toggleMenu" @click="closeDropdown(id)" :index="100" :opacity="0.5" />
        <div v-if="toggleMenu" class="dropdown" :style="{ top: dynamicFloatingDiv.top+60 + 'px'}">
            <div class="flx jc-sb ai-c mb-8">
                <strong>Settings</strong>
                <button @click="closeDropdown(id)" class="btn-close bg-transparent">
                    <svg xmlns="http://www.w3.org/2000/svg" height="10" viewBox="0 0 13.587 13.587">
                        <path d="M7.163,19.188,5.8,17.83,11.239,12.4,5.8,6.96,7.163,5.6,12.6,11.036,18.033,5.6,19.392,6.96,13.957,12.4l5.435,5.435-1.359,1.359L12.6,13.754Z" transform="translate(-5.805 -5.602)" fill="#1c1b1f"/>
                    </svg>
                </button>
            </div>
            <ul>
                <li>
                    <a href="" class="flx gap-16 ai-c">
                        <svg xmlns="http://www.w3.org/2000/svg" height="16" viewBox="0 0 16.5 18">
                            <path d="M-3427-681.75c0-3.088,1.456-3.75,8.25-3.75s8.25.662,8.25,3.75-1.456,3.75-8.25,3.75S-3427-678.662-3427-681.75Zm3.75-9.75a4.5,4.5,0,0,1,4.5-4.5,4.5,4.5,0,0,1,4.5,4.5,4.5,4.5,0,0,1-4.5,4.5A4.5,4.5,0,0,1-3423.25-691.5Z" transform="translate(3427 696)" fill="#212135"/>
                        </svg>
                        <span>Reset password</span>
                    </a>
                </li>
                <li>
                    <a href="" class="flx gap-16 ai-c">
                        <svg xmlns="http://www.w3.org/2000/svg" height="16" viewBox="0 0 18 18">
                            <path d="M-3458-676c-7.4,0-9-1.2-9-6.75a8.888,8.888,0,0,1,.76-4.358,4.208,4.208,0,0,1,3-1.978,5.03,5.03,0,0,1,1.65-3.6A5.381,5.381,0,0,1-3458-694a5.384,5.384,0,0,1,3.592,1.314,5.033,5.033,0,0,1,1.65,3.6,4.21,4.21,0,0,1,3,1.978,8.885,8.885,0,0,1,.76,4.358C-3449-677.2-3450.6-676-3458-676Zm0-9.75a3,3,0,0,0-3,3,3,3,0,0,0,3,3,3,3,0,0,0,3-3A3,3,0,0,0-3458-685.75Zm-.126-3.764c1.825,0,3.828.187,3.848.189a4.215,4.215,0,0,0-.564-1.633,3.394,3.394,0,0,0-3.1-1.633h-.033a3.58,3.58,0,0,0-3.156,1.641,4.216,4.216,0,0,0-.595,1.625.116.116,0,0,1,.028,0C-3461.135-689.384-3459.66-689.513-3458.126-689.513Zm.126,8.264a1.5,1.5,0,0,1-1.5-1.5,1.5,1.5,0,0,1,1.5-1.5,1.5,1.5,0,0,1,1.5,1.5A1.5,1.5,0,0,1-3458-681.25Z" transform="translate(3467 694)" fill="#212135"/>
                        </svg>
                        <span>Edit profile</span>
                    </a>
                </li>
            </ul>
        </div>
    </teleport>
</template>

<script>
import { mapState } from 'vuex';
import dropdownToggleMixin from '@/mixins/dropdownToggleMixin'
import Backdrop from '../includes/Backdrop.vue'
export default {
    components: { Backdrop },
    name: 'SettingsDropdown',
    props: ['id'],
    mixins: [dropdownToggleMixin],
    computed: {
        ...mapState({
            dynamicFloatingDiv: (state) => state.dropdown.dynamicFloatingDiv
        })
    }
}
</script>

<style lang="scss" scoped>
.dropdown{
    width: 320px;
    right: calc(134px + var(--main-padding));
}
ul {
    margin-left: -12px;
}
li {
    &:hover {
        a {
            background-color: var(--list-hover);
        }
    }
}
a {
    padding: 16px 12px;
    border-radius: 12px;
}
</style>