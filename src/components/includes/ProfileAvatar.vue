<template>
    <img class="br-50" :src="avatar ? s3bucket+'/'+avatar : default_avatar" />
</template>
<script>
import { mapState } from 'vuex';
export default {
    name: 'ProfileAvatar',
    props: {
        avatar: String
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

</style>