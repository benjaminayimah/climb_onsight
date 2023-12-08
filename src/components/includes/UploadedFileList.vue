<template>
    <ul>
        <li class="flx jc-sb gap-8 ai-c">
            <a :href="s3bucket+'/'+file.url" target="_blank" class="wrap-text wrap-line-1">{{ file.name }}</a>
            <button @click="deleteFile(file.url)" class="centered br-50 bg-transparent">
                <svg v-if="!deleting" xmlns="http://www.w3.org/2000/svg" height="12" viewBox="0 0 12.437 12.438">
                    <path d="M-1978.791,12.553l-4.656-4.656-4.537,4.537a.951.951,0,0,1-1.344,0,.951.951,0,0,1,0-1.344l4.537-4.537-4.42-4.419a.95.95,0,0,1,0-1.344.949.949,0,0,1,1.343,0l4.419,4.419,4.538-4.538a.951.951,0,0,1,1.344,0,.951.951,0,0,1,0,1.344l-4.538,4.538,4.656,4.656a.951.951,0,0,1,0,1.344.947.947,0,0,1-.672.278A.947.947,0,0,1-1978.791,12.553Z" transform="translate(1989.607 -0.393)" fill="#e01818"/>
                </svg>
                <spinner v-else :size="18" :color="'#f13c3c'" />
            </button>
        </li>
    </ul>
</template>

<script>
import axios from 'axios';
import { mapState } from 'vuex'
import Spinner from './Spinner.vue'
export default {
    components: { Spinner },
    name: 'UploadedFileList',
    props: {
        file: Object,
        id: String
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
                const data = {
                    key: this.id,
                    file: file
                }
                this.$emit('delete-file', data)
            } catch (e) {
                this.deleting = false
            }
            
        }
    }
}
</script>

<style lang="scss" scoped>
li {
    padding: 5px 0;
}
button {
    height: 30px;
    width: 30px;
    &:hover {
        background-color: #ffbdbd;
    }
}
a:hover {
    text-decoration: underline;
}
</style>