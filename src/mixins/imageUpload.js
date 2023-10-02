import axios from 'axios'
import { mapState } from 'vuex';
export default {
    computed: {
        ...mapState({
            hostname: (state) => state.hostname
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
        showError(msg, id) {
            this.imageStatus.active = true;
            this.imageStatus.msg = msg;
            this.status.spin = false
            this.clrOldfile(id)
        },
        clrOldfile(id) {
            document.querySelector(`#${id}`).value = null
        },
        clrError() {
            this.imageStatus.active = false;
            this.imageStatus.msg = '';
        },
        uploadTemp(id) {
            this.startLoader()
            if (this.imageStatus.active) {
                this.clrError();
            }
            let file = this.$refs.img.files[0];
            if(file) {
                if (!(file.type == "image/png" || file.type == "image/jpg" || file.type == "image/jpeg")) {
                    return this.showError("Unsupported file. The file type must be \"png, jpg or jpeg\"", id);
                }else {
                    if (this.checksize(file.size)) {
                        let formData = new FormData()
                        formData.append('file', file)
                        axios.post(this.hostname + '/api/temp-image-upload?token='+this.token, formData, {
                            headers: {
                                'Content-Type': 'multipart/form-data'
                            }
                        }).then((res) => {
                            this.stopLoader()
                            this.afterTempUpload(res.data)
                            this.clrOldfile(id)
                        }).catch((e) => {
                            this.stopLoader()
                            if(e.response.status == 400) {
                                // this.$store.commit('setExpSession')
                            }
                        })
                    }else {
                        return this.showError('This file is too large. The file size must be less than 300KB', id);
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
        },
        afterDeletion() {
            this.stopLoader()
            this.form.tempImage = null
            this.status.tempImage = null
            let stored = JSON.parse(localStorage.getItem('newUser'))
            stored.form.tempImage = ''
            localStorage.setItem('newUser', JSON.stringify(stored))
        },
        deltmp() {
            this.startLoader()
            axios.delete(this.hostname + '/api/delete-temp-image?token='+ this.token)
            .then(() => {
                this.afterDeletion()
            }).catch((e) => {
                this.stopLoader()
                if(e.response.status == 400) {
                    // this.$store.commit('setExpSession')
                }
            });
        },
        uploadPDF(id) {
            if(this.validation.error || this.systemErr.error) {
                this.clearErrs()
            }
            this.startLoader()
            document.querySelector(`#${id}`).click()
            const file = document.querySelector(`#${id}`).files[0]
            if(file) {
                let formData = new FormData()
                formData.append('file', file)
                axios.post(this.hostname + '/api/temp-pdf-upload', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                }).then((res) => {
                    const data = {
                        key: id,
                        name: file.name,
                        url: res.data
                    }
                    this.$emit('add-to-formArr', data)
                    this.stopLoader()
                    this.clrOldfile(id)
                }).catch((e) => {
                    this.stopLoader()
                    this.errorResponse(e)
                    this.clrOldfile(id)
                    if(e.response.status == 400) {
                        // this.$store.commit('setExpSession')
                    }
                })

            }

        }
    }
}