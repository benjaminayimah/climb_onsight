<template>
    <img class="br-50" :class="{ 'custom-color' : !avatar}" :src="avatar ? s3bucket+'/'+avatar : default_avatar" :alt="name ? name : ''" :title="name ? name : ''" />
</template>
<script>
import { mapState } from 'vuex';
export default {
    name: 'ProfileAvatar',
    props: {
        avatar: String,
        color: String,
        name: String
    },
    computed: {
        ...mapState({
            s3bucket: (state) => state.s3bucket,
            default_avatar: (state) => state.data.default_avatar
        })
    }
}
</script>
<style lang="scss" scoped>
img.custom-color {
    background-color: v-bind(color);
}
</style>