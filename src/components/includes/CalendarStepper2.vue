<template>
    <form @submit.prevent="" class="flx column gap-24" id="cal_stepper_2_form">
        <div class="form-row column">
            <div class="label">Event Category(Choose one)</div>
            <div class="input-wrapper">
                <ul class="flx gap-8 flx-wrap">
                    <category-list v-for="category in categories" :key="category.id" :category="category" :selected="form.category" @select-category="selectCategory" :color="color"/>
                </ul>
                <input v-if="form.category.toLowerCase() === 'other'" v-model="otherCategory" type="text" maxlength="18" class="br-16 w-100 mt-8" name="other_category" id="other_category" placeholder="Type a category" :class="[{'error-border': validation.errors.category }, input2 ? 'form-control2' : 'form-control']">
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
        <error-display-card v-if="validation.error" :errors="validation.errors"/>
        <div class="flx column gap-8 calendar-btn-wrapper">
            <button @click.prevent="nextPage" class="button-primary btn-lg w-100">Next</button>
            <button v-if="editMode === ''" @click.prevent="previousPage" class="btn-md bg-transparent w-100">Back</button>
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
import ErrorDisplayCard from './ErrorDisplayCard.vue'
export default {
    components: { GalleryUploader, GalleryImage, CategoryList, ErrorDisplayCard },
    name: 'CalendarStepper2',
    mixins: [inputValidationMixin, autoCompleMixin],
    props: {
        newEvent: Object,
        input2: Boolean,
        editMode: String,
        color: String
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
                address: '',
            },
            otherCategory: '',
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
            this.validation.error ? this.clearErrs() : ''
            let errors = {}
            if(this.form.category == '' || this.form.address == '' || this.form.gallery.length < 1 || (this.form.category.toLowerCase() === 'other' && this.otherCategory == '')) {
                if(this.form.category == '' || (this.form.category.toLowerCase() === 'other' && this.otherCategory == '')) {
                    errors.category = ['The Category field is required.']
                }
                if(this.form.address == '') {
                    errors.address = ['Type and then select the location from the dropdown.']
                }
                if(this.form.gallery.length < 1) {
                    errors.gallery = ['Upload at least one image of the location.']
                }
                this.showErr(errors)
            }else {
                if (this.form.category.toLowerCase() === 'other') {
                    let input = this.otherCategory
                    if (input.length > 18) {
                        input = input.slice(0, 18);
                    }
                    this.form.category = input
                }
                this.editMode === 'event_edit' ? await this.$store.commit('updateTempStorage2', this.form) : await this.$store.commit('saveEventForm2', this.form)
                this.$router.push({ query: { stepper: '3', current: this.$route.query.current, origin: this.$route.query.origin }})
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
            this.$router.push({ query: { current: this.$route.query.current, origin: this.$route.query.origin }})
        },
        presetForm() {
            if(this.newEvent) {
                this.newEvent.address ? this.form.address = this.newEvent.address : ''
                this.newEvent.latitude ? this.form.latitude = this.newEvent.latitude : ''
                this.newEvent.longitude ? this.form.longitude = this.newEvent.longitude : ''
                if (this.newEvent.gallery ) {
                    if(this.editMode === 'event_edit') {
                        this.form.gallery = JSON.parse(this.newEvent.gallery)
                    }else {
                        this.form.gallery = this.newEvent.gallery
                    }
                }if(this.newEvent.category) {
                    const category = this.categories.find(data => data.name === this.newEvent.category)
                    if(category) {
                        this.form.category = this.newEvent.category
                    }else {
                        this.form.category = 'Other'
                        this.otherCategory = this.newEvent.category
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
// .sticky {
//     bottom: -32px;
//     padding: 20px 0;   
//     background: linear-gradient(179deg, rgb(255 255 255 / 34%) 0%, #fbf7f4 15%);
// }
</style>