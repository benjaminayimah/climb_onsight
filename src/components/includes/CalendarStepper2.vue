<template>
    <form @submit.prevent="" class="flx column gap-16">
        <div class="form-row column">
            <label for="event_name">Event name</label>
            <div class="input-wrapper">
                <input v-model="form.event_name" class="br-16 w-100 bd-trans" type="text" id="event_name" name="event_name"  :class="{ 'error-border': validation.errors.event_name }" placeholder="Enter your event name" />
            </div>
            <span class="input-error" v-if="validation.error && validation.errors.event_name">
                {{ validation.errors.event_name[0] }}
            </span>
        </div>
        <div class="form-row column">
            <label for="gallery">Add event images</label>
            <div class="gallery">
                <div class="gallery-wrapper grid grid-col-3 gap-8 mb-8">
                    <gallery-image v-for="(image, index) in form.gallery" :key="index" :index="index" :image="image" @delete-image="deleteImage" />
                    <gallery-uploader v-for="(image, index) in computeEmptyGal" :key="index" :index="index" :id="'gallery_img_'+index" @add-to-gallery="addToGallery" @show-error="showError"/>
                </div>
                <span class="flx gap-4 ai-c fs-09"><i class="br-50"></i>First image would be used as trip cover</span>
            </div>
            <span class="input-error" v-if="imageStatus.active">{{ imageStatus.msg }}</span>
            <span class="input-error" v-if="validation.error && validation.errors.gallery">
                {{ validation.errors.gallery[0] }}
            </span>
        </div>
        <div class="form-row column">
            <label for="address">Event location</label>
            <div class="input-wrapper">
                <input @focusout="checkAddressInput" class="br-16 w-100 bd-trans" type="search" autocomplete="off" ref="address" id="address" :class="{ 'error-border': validation.errors.address }" placeholder="Enter location then pick from dropdown list" />
            </div>
            <span class="input-error" v-if="validation.error && validation.errors.address">
                {{ validation.errors.address[0] }}
            </span>
        </div>
        <div class="flx column gap-8">
            <button @click="nextPage" class="button-primary btn-md w-100">Next</button>
            <button @click="previousPage" class="bg-transparent btn-sm w-100">Back</button>
        </div>
    </form>
</template>

<script>
import autoCompleMixin from '@/mixins/autoCompleMixin'
import inputValidationMixin from '@/mixins/inputValidation'
import GalleryUploader from './GalleryUploader.vue'
import GalleryImage from './GalleryImage.vue'
export default {
    components: { GalleryUploader, GalleryImage },
    name: 'CalendarStepper2',
    mixins: [inputValidationMixin, autoCompleMixin],
    props: {
        newEvent: Object
    },
    computed: {
        computeEmptyGal() {
            return 6 - this.form.gallery.length
        }
    },
    watch: {
        inputAddress(newInput) {
            this.checkAddressInput(newInput)
        }
    },
    data() {
        return {
            form: {
                event_name: '',
                gallery: [],
                latitude: null,
                longitude: null,
                address: ''
            },
            imageStatus: { active: true, msg: ''}
        }
    },
    methods: {
        async nextPage() {
            let errors = { event_name: '', price: '', address: '', gallery: []}
            if(this.form.event_name == '' || this.form.price == '' || this.form.address == '' || this.form.gallery.length < 1) {
                if(this.form.event_name == '') {
                    errors.event_name = ['The Event name field is required']
                }
                if(this.form.price == '') {
                    errors.price = ['The Price field is required']
                }
                if(this.form.address == '') {
                    errors.address = ['Type and then select the location from the dropdown']
                }
                if(this.form.gallery.length < 1) {
                    errors.gallery = ['Upload at least one image of the location']
                }
                this.showErr(errors)
            }else {
                this.validation.error ? this.clearErrs() : ''
                await this.$store.commit('saveEventForm2', this.form)
                this.$router.push({ name: 'Calendar', query: { stepper: '3'}})
            }
        },
        addToGallery(file) {
            if(file) {
                this.form.gallery.push(file)
            }
        },
        deleteImage(file) {
            this.form.gallery = this.form.gallery.filter(image => image !== file)
            this.$store.commit('updateEventGallery', this.form.gallery)
        },
        previousPage() {
            this.$router.push({ name: 'Calendar'})
        },
        presetForm() {
            if(this.newEvent) {
                this.newEvent.event_name ? this.form.event_name = this.newEvent.event_name : ''
                this.newEvent.price ? this.form.price = this.newEvent.price : ''
                this.newEvent.address ? this.form.address = this.newEvent.address : ''
                this.newEvent.latitude ? this.form.latitude = this.newEvent.latitude : ''
                this.newEvent.longitude ? this.form.longitude = this.newEvent.longitude : ''
                this.newEvent.gallery ? this.form.gallery = this.newEvent.gallery : ''
            }
        },
        showError(message, status) {
            if(status) {
                this.imageStatus.msg = message
                this.imageStatus.active = true
            }else {
                this.imageStatus.msg = ''
                this.imageStatus.active = false
            }
        },
        checkAddressInput() {
            if(document.querySelector('#address').value == '') {
                this.form.address = ''
            }
        },
        checkNumberInput() {
            if (this.form.price < 1) {
                this.form.price = 1;
            }
        }
    },
    mounted() {
        this.presetForm()
    }
}
</script>

<style lang="scss" scoped>
.input-wrapper {
    select, input, textarea {
        padding: 10px 20px;
        border: 1px solid transparent;
        background-color: #fff;
    }
}
.gallery i {
    height: 10px;
    width: 10px;
    background-color: #7AFC96;
}
.grid-item {
    height: 80px;
}
</style>