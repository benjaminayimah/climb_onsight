<template>
    <a href="#" :id="id" @click.prevent="openDropdown(id)" class="u-a">
        <div class="bg-img br-50" :style="{ backgroundImage: 'url('+avatar+')'}"></div>
    </a>
    <teleport to="body">
        <backdrop v-if="toggleMenu" @click="closeDropdown(id)" :index="100" :opacity="0.5" />
        <div v-if="toggleMenu" class="dropdown" :style="{ right: '3%', top: dynamicFloatingDiv.top+60 + 'px'}">
            <div>Profile</div>
            {{dynamicFloatingDiv.left}}
        </div>
    </teleport>
</template>

<script>
import dropdownToggleMixin from '@/mixins/dropdownToggleMixin'
import Backdrop from '../includes/Backdrop.vue'
import { mapState } from 'vuex'
export default {
    components: { Backdrop },
    name: 'ProfileDropdown',
    props: ['id', 'avatar'],
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
    border-radius: 16px;
}
.bg-img{
    width: 52px;
    height: 52px;
    transition: 0.3s ease;
    border: 1.5px solid #e1dedb;
    background-color: #ffffff;
}
</style>