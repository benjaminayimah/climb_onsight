<template>
    <form @submit.prevent="" class="flx column gap-16" id="cal_stepper_2_form">
        <div class="form-row column">
            <div class="label">Event Category(Choose one)</div>
            <div class="input-wrapper">
                <ul class="flx gap-8 flx-wrap">
                    <category-list v-for="category in categories" :key="category.id" :category="category" :selected="form.category" @select-category="selectCategory" :color="'#fff'"/>
                </ul>
            </div>
            <span class="input-error" v-if="validation.error && validation.errors.category">
                {{ validation.errors.category[0] }}
            </span>
        </div>
        <div class="form-row column">
            <div class="label">Add event images</div>
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
                <input v-model="form.address" @focusout="checkAddressInput" class="br-16 w-100" type="search" autocomplete="off" ref="address" id="address" :class="[{'error-border': validation.errors.address }, input2 ? 'form-control2' : 'form-control']" placeholder="Enter location then pick from dropdown list" />
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
import CategoryList from './CategoryList.vue'
import { mapState } from 'vuex'
export default {
    components: { GalleryUploader, GalleryImage, CategoryList },
    name: 'CalendarStepper2',
    mixins: [inputValidationMixin, autoCompleMixin],
    props: {
        newEvent: Object,
        input2: Boolean,
        editMode: String
    },
    computed: {
        ...mapState({
            categories: (state) => state.data.categories,
        }),
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
                category: '',
                gallery: [],
                latitude: null,
                longitude: null,
                address: ''
            },
            imageStatus: { active: true, msg: ''}
        }
    },
    methods: {
        selectCategory(category) {
            if(this.form.category && this.form.category === category.name) {
                this.form.category = ''
            }else {
                this.form.category = category.name
            }
        },
        async nextPage() {
            let errors = { category: '', address: '', gallery: []}
            if(this.form.category == '' || this.form.address == '' || this.form.gallery.length < 1) {
                if(this.form.category == '') {
                    errors.category = ['The Category field is required']
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
                this.editMode === 'event_edit' ? await this.$store.commit('updateTempStorage2', this.form) : await this.$store.commit('saveEventForm2', this.form)
                this.$router.push({ name: this.$route.name, query: { stepper: '3', current: this.$route.query.current, origin: this.$route.query.origin }})
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
            this.$router.push({ name: this.$route.name, query: { current: this.$route.query.current, origin: this.$route.query.origin }})
        },
        presetForm() {
            if(this.newEvent) {
                this.newEvent.category ? this.form.category = this.newEvent.category : ''
                this.newEvent.address ? this.form.address = this.newEvent.address : ''
                this.newEvent.latitude ? this.form.latitude = this.newEvent.latitude : ''
                this.newEvent.longitude ? this.form.longitude = this.newEvent.longitude : ''
                if (this.newEvent.gallery ) {
                    if(this.editMode === 'event_edit') {
                        this.form.gallery = JSON.parse(this.newEvent.gallery)
                    }else {
                        this.form.gallery = this.newEvent.gallery
                    }
                }
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