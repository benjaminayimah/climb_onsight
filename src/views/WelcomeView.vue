<template>
    <section id="welcome_main">
        <div v-if="window >= 990" class="bg-img br-16" :style="{ backgroundImage: 'url('+banner+')'}"></div>
        <router-view></router-view>
    </section>
</template>

<script>
import { mapGetters, mapState } from 'vuex';
export default {
    name: 'WelcomeView',
    computed: {
        ...mapGetters(['getWindowWidth']),
        ...mapState({
            banner: (state) => state.data.bannerImage,
            window: (state) => state.windowWidth
        })

    }
}
</script>
<style lang="scss" scoped>
section {
    min-height: 100dvh;
    background-color: var(--bg-color);
}
</style>