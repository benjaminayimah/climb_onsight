<template>
    <div class="stepper-wrapper w-100 flx column gap-32">
        <div class="stepper-title">Link to reviews</div>
        <form @submit.prevent="">
            <div class="form-wrapper flx column gap-24">
                <div class="form-row column">
                    <label for="reviews">Reviews</label>
                    <div class="input-wrapper">
                        <input v-model="form.customer_reviews" type="url" name="reviews" id="reviews" class="form-control" placeholder="Add link to customer reviews">
                    </div>
                </div>
                <button @click="updateNewGuide" class="button-primary gap-8 w-100 btn-lg ai-c">
                    <span>Continue</span>
                </button>
            </div>
        </form>
    </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
    name: 'GuideReviews',
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
            await this.$store.commit('updateGuideReviews', this.form)
            this.$router.push({ name: 'GuideExperience' })
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