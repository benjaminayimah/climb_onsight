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
            <div>Settings</div>
            {{dynamicFloatingDiv.left}}
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
    width: 200px;
    position: fixed;
    background-color: #ffffff;
    z-index: 101;
    padding: 20px 0;
    box-shadow: 0 1px 15px 0 rgb(14 20 44 / 12%);
    border-radius: 16px;
    right: calc(134px + var(--main-padding));

}
</style>