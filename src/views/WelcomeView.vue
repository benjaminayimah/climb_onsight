<template>
    <section id="welcome_main">
        <div v-if="window >= 990" class="bg-img br-16" :style="{ backgroundImage: 'url('+s3bucket+banner+')'}"></div>
        <router-view></router-view>
    </section>
</template>

<script>
import { mapState } from 'vuex';
export default {
    name: 'WelcomeView',
    computed: {
        ...mapState({
            banner: (state) => state.data.bannerImage,
            window: (state) => state.windowWidth,
            s3bucket: (state) => state.s3bucket

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