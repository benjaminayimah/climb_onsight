<template>
    <div class="stepper-wrapper w-100 flx column gap-32">
        <div class="stepper-title">Link to reviews</div>
        <form @submit.prevent="">
            <div class="form-wrapper flx column gap-24">
                <div class="form-row column">
                    <label for="reviews">Reviews</label>
                    <div class="input-wrapper">
                        <input v-model="form.customer_reviews" type="url" name="reviews" id="reviews" class="form-control" :class="{ 'error-border': validation.errors.customer_reviews }" placeholder="Add link to customer reviews">
                    </div>
                    <span class="input-error" v-if="validation.error && validation.errors.customer_reviews">
                        {{ validation.errors.customer_reviews[0] }}
                    </span>
                </div>
                <button @click.prevent="updateNewGuide" class="button-primary gap-8 w-100 btn-lg ai-c">
                    <span>Continue</span>
                </button>
            </div>
        </form>
    </div>
</template>

<script>
import inputValidation from '@/mixins/inputValidation'
import { mapState } from 'vuex'
export default {
    name: 'GuideReviews',
    mixins: [inputValidation],
    computed: {
        ...mapState({
            newGUide: (state) => state.data.newGuide
        })
    },
    data () {
        return {
            form: {
                customer_reviews: ''
            }
        }
    },
    methods: {
        async updateNewGuide() {
            let errors = { customer_reviews: ''}
            if(this.form.customer_reviews == '') {
                if(this.form.customer_reviews == '') {
                    errors.customer_reviews = ['The reviews field is required']
                }
                this.showErr(errors)
            }else {
                await this.$store.commit('updateGuideReviews', this.form)
                this.$router.push({ name: 'GuideExperience' })
            }  
        },
        presetForm() {
            this.newGUide.customer_reviews ? this.form.customer_reviews = this.newGUide.customer_reviews : ''
        }
    },
    mounted() {
        this.presetForm()
    }
}
</script>

<style lang="scss" scoped>

</style>