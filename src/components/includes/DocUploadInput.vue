<template>
    <div class="input-wrapper">
        <div @click="uploadClick(id)" class="div-input flx jc-sb ai-c" :class="{ 'error-border': validation.errors.file || validationError }">
            <span :id="id+'_label'" class="gray fs-09 wrap-text wrap-line-1" :title="label">{{ label }}</span>
            <span class="flx column ai-c scale-in">
                <svg xmlns="http://www.w3.org/2000/svg" height="16" viewBox="0 0 18.764 16.165">
                    <path d="M-3399.151-270.485v-4.981l-1.5,1.3a.647.647,0,0,1-.425.158.652.652,0,0,1-.492-.225.652.652,0,0,1,.067-.917l2.569-2.219a.65.65,0,0,1,.85,0l2.568,2.219a.65.65,0,0,1,.066.917.649.649,0,0,1-.915.067l-1.487-1.285v4.97a.649.649,0,0,1-.649.65A.65.65,0,0,1-3399.151-270.485Zm2.911-1.28h0Zm-7.113-.039a5,5,0,0,1-4.531-4.821,5.078,5.078,0,0,1,5.014-5.065.343.343,0,0,0,.312-.2,6.931,6.931,0,0,1,6.321-4.111,7.14,7.14,0,0,1,7.117,7.113,7.208,7.208,0,0,1-4.34,6.565c-.021.009,0,0,.018-.009l.016-.007a.679.679,0,0,1-.87-.585v-.038a.608.608,0,0,1,.366-.57l.07-.032a5.907,5.907,0,0,0,3.446-5.325,5.846,5.846,0,0,0-5.824-5.818,5.667,5.667,0,0,0-5.35,3.866.65.65,0,0,1-.033.219,4.55,4.55,0,0,0-.224,1.091,2.267,2.267,0,0,0,.21,1.047.647.647,0,0,1-.348.846.638.638,0,0,1-.248.05.647.647,0,0,1-.6-.4,3.552,3.552,0,0,1-.31-1.543,4.128,4.128,0,0,1,.116-.864,3.79,3.79,0,0,0-3.567,3.768,3.7,3.7,0,0,0,3.237,3.516.734.734,0,0,1,.645.7.6.6,0,0,1-.576.613A.57.57,0,0,1-3403.352-271.8Z" transform="translate(3407.883 286)" fill="#e27a30"/>
                </svg>
                <span class="fs-08 upload">Upload</span>
            </span>
        </div>
        <input class="hide" @change="uploadPDF(id)" type="file" :id="id">
        <span class="input-error" v-if="validation.error && validation.errors.file">
            {{ validation.errors.file[0] }}
        </span>
        <div v-if="formInput">
            <uploaded-file-list
                v-for="input in formInput"
                :key="input.name"
                :file="input"
                :id="id"
                @delete-file="deleteFile"
            />
        </div>
        <div v-else-if="formInput2">
            <uploaded-file-list
                :key="formInput2.name"
                :file="formInput2"
                :id="id"
                @delete-file="deleteFile"
            />
        </div>
        <div v-if="status.spin" class="flx gap-8 ai-c">
            <spinner :size="10" />
            <span class="fs-8">uploading...</span>
        </div>
    </div>
</template>

<script>
import inputValidation from '@/mixins/inputValidation';
import UploadedFileList from '@/components/includes/UploadedFileList.vue';
import imageUploadMixin from '@/mixins/imageUpload';
import Spinner from './Spinner.vue';
export default {
    components: { UploadedFileList, Spinner },
    name: 'DocUploadInput',
    mixins: [imageUploadMixin, inputValidation],
    props: {
        formInput: Array,
        formInput2: Object,
        id: String,
        label: String,
        validationError: String
    },
    methods: {
        deleteFile(file) {
            this.$emit('del-file', file)
        }
    }
}
</script>

<style lang="css" scoped>
.upload {
    color: #e27a30;
}
.div-input {
    cursor: pointer;
}
</style>