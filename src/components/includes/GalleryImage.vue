<template>
    <div class="bg-img br-16 grid-item centered relative centered">
        <img :src="s3bucket+'/'+image" :alt="'Gallery image'+ Number(index + 1)">
        <button class="br-50 absolute" @click="deleteFile(image)">
            <svg v-if="!deleting"  xmlns="http://www.w3.org/2000/svg" height="16" viewBox="0 0 17.5 21">
                <path d="M-3568.023-836.575a6.145,6.145,0,0,1-1.2-2.411c-.266-.878-.493-1.9-.78-3.2l-.152-.686c-.69-3.1-.346-5.1,1.082-6.3a6.375,6.375,0,0,1,2.894-1.23,22.93,22.93,0,0,1,4.43-.345,22.933,22.933,0,0,1,4.431.345,6.39,6.39,0,0,1,2.894,1.23c1.427,1.2,1.771,3.2,1.082,6.3l-.151.684c-.287,1.3-.514,2.326-.78,3.2a6.145,6.145,0,0,1-1.2,2.411c-1.031,1.148-2.731,1.575-6.273,1.575S-3566.992-835.427-3568.023-836.575Zm2.189-12.115a4.815,4.815,0,0,0-2.116.857c-1.145.958-.832,3.072-.5,4.578q.08.355.152.686c.279,1.264.5,2.262.745,3.075a4.667,4.667,0,0,0,.829,1.75c.463.517,1.387.995,4.971.995s4.508-.478,4.971-.995a4.672,4.672,0,0,0,.828-1.75c.247-.815.467-1.812.746-3.074q.073-.332.152-.687c.7-3.146.051-4.119-.5-4.578a4.82,4.82,0,0,0-2.116-.857,21.307,21.307,0,0,0-4.085-.31A21.3,21.3,0,0,0-3565.834-848.69Zm6.709,8.44v-5.25a.875.875,0,0,1,.875-.876.875.875,0,0,1,.875.876v5.25a.874.874,0,0,1-.875.875A.874.874,0,0,1-3559.125-840.25Zm-3.5,0v-5.25a.876.876,0,0,1,.875-.876.876.876,0,0,1,.876.876v5.25a.875.875,0,0,1-.876.875A.875.875,0,0,1-3562.625-840.25Zm-3.517,0v-5.25a.875.875,0,0,1,.875-.876.875.875,0,0,1,.875.876v5.25a.874.874,0,0,1-.875.875A.875.875,0,0,1-3566.142-840.25Zm11.816-10.625a14.576,14.576,0,0,0-7.424-1.625c-3.911,0-6.362.943-7.4,1.611a.876.876,0,0,1-1.21-.264.875.875,0,0,1,.264-1.209,14.509,14.509,0,0,1,6.6-1.827v-.937a.875.875,0,0,1,.875-.875h1.751a.875.875,0,0,1,.875.875v.937a14.935,14.935,0,0,1,6.576,1.814.874.874,0,0,1,.3,1.2.875.875,0,0,1-.75.424A.869.869,0,0,1-3554.326-850.875Z" transform="translate(3570.5 856)" fill="#fff"/>
            </svg>
            <spinner v-else :size="16"/>
        </button>
    </div>
</template>

<script>
import axios from 'axios'
import { mapState } from 'vuex'
import Spinner from './Spinner.vue'
export default {
  components: { Spinner },
    name: 'GalleryImage',
    props: {
        image: String,
        index: Number
    },
    computed: {
        ...mapState({
            s3bucket: (state) => state.s3bucket,
            hostname: (state) => state.hostname
        })
    },
    data() {
        return {
            deleting: false

        }
    },
    methods: {
        async deleteFile(file) {
            //delete from server
            this.deleting = true
            try {
                await axios.post(this.hostname + '/api/delete-uploaded-file', { file })
                this.deleting = false
                this.$emit('delete-image', file)
            } catch (e) {
                this.deleting = false
            }
            
        }
    }
}
</script>

<style lang="scss" scoped>
button {
    opacity: 1;
    padding: 0;
    height: 40px;
    width: 40px;
    background-color: rgba(0, 0, 0, 0.4);
    left: 50%;
    transform: translateX(-50%);
    &:hover {
        background-color: rgba(0, 0, 0, 0.9);
    }
}
</style>