import axios from 'axios'
import { mapState } from 'vuex';
export default {
    computed: {
        ...mapState({
            hostname: (state) => state.hostname,
            token: (state) => state.token
        })
    },
    data() {
        return {
            status: { spin: false, tempImage: null},
            imageStatus: { active: false, msg: ''}
        }
    },
    methods: {
        uploadClick(id) {
            document.querySelector(`#${id}`).click()
        },
        //check img
        showError(msg) {
            this.imageStatus.active = true;
            this.imageStatus.msg = msg;
            this.status.spin = false
            this.clrOldfile()
        },
        clrOldfile() {
            document.querySelector('#avatar_img').value = null;
        },
        clrError() {
            this.imageStatus.active = false;
            this.imageStatus.msg = '';
        },
        uploadTemp() {
            this.startLoader()
            if (this.imageStatus.active) {
                this.clrError();
            }
            let file = this.$refs.img.files[0];
            if(file) {
                if (!(file.type == "image/png" || file.type == "image/jpg" || file.type == "image/jpeg")) {
                    return this.showError("Unsupported file. The file type must be \"png, jpg or jpeg\"");
                }else {
                    if (this.checksize(file.size)) {
                        let formData = new FormData()
                        formData.append('file', file);
                        axios.post(this.hostname + "/api/files/uplssoad", formData, {
                            headers: {
                                'Content-Type': 'multipart/form-data',
                                'Authorization' : `Bearer ${this.token}`
                            }
                        }).then((res) => {
                            this.stopLoader()
                            this.afterTempUpload(res.data.image)
                            console.log(res.data)
                        }).catch((e) => {
                            this.stopLoader()
                            if(e.response.status == 400) {
                                // this.$store.commit('setExpSession')
                            }
                            console.error(e.response)
                        })
                    }else {
                        return this.showError('This file is too large. The file size must be less than 300KB');
                    }
                }
            }
        },
        checksize(size) {
            return size > 300000 ? false : true
        },
        startLoader() {
            this.status.spin = true
        },
        stopLoader() {
            this.status.spin = false
        },
        afterTempUpload(res) {
            this.stopLoader()
            this.form.tempImage = res
            this.status.tempImage = res
            this.clrOldfile()
        },
        afterDeletion() {
            this.stopLoader()
            this.form.tempImage = null
            this.status.tempImage = null
        },
        deltmp(file) {
            this.startLoader()
            axios.delete(this.hostname + "/api/files/delete/", {file_name: file})
            .then((res) => {
                console.log(res.data)
                // this.afterDeletion()
            }).catch((e) => {
                console.error(e.response)
                this.stopLoader()
                if(e.response.status == 400) {
                    // this.$store.commit('setExpSession')
                }
            });
        },
    }
}