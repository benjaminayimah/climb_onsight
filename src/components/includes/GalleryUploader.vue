<template>
    <button class="bg-img br-16 grid-item centered" @click="uploadClick(id)">
        <spinner v-if="status.spin" :size="20" />
        <svg v-else xmlns="http://www.w3.org/2000/svg" height="16" viewBox="0 0 18 18">
            <path d="M7.75 17.749V10.249H0.25V7.74902H7.75V0.249023H10.25V7.74902H17.75V10.249H10.25V17.749H7.75Z" fill="#1C1B1F"/>
        </svg>
        <input class="hide" @change="uploadTemp(id)" name="image" :id="id" type="file" ref="img"> 
    </button>
</template>

<script>
import { mapState } from 'vuex'
import imageUpload from '@/mixins/imageUpload'
import Spinner from './Spinner.vue'
export default {
    inheritAttrs: false,
    components: { Spinner },
    name: 'GelleryUploader',
    mixins: [imageUpload],
    props: {
        index: Number,
        id: String
    },
    computed: {
        ...mapState({
            s3bucket: (state) => state.s3bucket,
            token: (state) => state.token
        }),
    },
    watch: {
        'status.tempImage'(newFIle) {
            this.addToGallery(newFIle)
        },
        'imageStatus.msg'(newMessage) {
            this.showUploadError(newMessage)
        }
    },
    methods: {
        addToGallery(file) {
            this.$emit('add-to-gallery', file)
        },
        showUploadError(message) {
            this.$emit('show-error', message, this.imageStatus.active)
        }
    }
}
</script>

<style lang="scss" scoped>
button {
    &:hover {
        background-color: #e2e2e2;
    }
}
</style>