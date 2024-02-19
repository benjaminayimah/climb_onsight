<template>
    <div class="stepper-wrapper w-100 flx column gap-32">
        <div class="stepper-title">Please list all your experiences in the following</div>
        <form id="guide_exp_form" @submit.prevent="">
            <div class="form-wrapper flx column gap-24">
                <ul class="flx gap-8 flx-wrap">
                    <category-list v-for="category in computedCateries" :key="category.id" :category="category" :selected="form.category" @select-category="selectCategory" :color="'#F1F1F1'"/>
                </ul>
                <div v-if="form.category" class="form-row column">
                    <label for="years">Years of expirience</label>
                    <div class="input-wrapper">
                        <input v-model="form.input" @input="enterCategoryValue(form.category, form.input)" type="number" min="0" name="years" id="years" class="form-control" :placeholder="'Number of years of experience in '+ form.category">
                    </div>
                </div>
                <button @click.prevent="updateNewGuide" class="button-primary gap-8 w-100 btn-lg ai-c">
                    <span>Continue</span>
                </button>
                <router-link :to="{ name: 'GuideReviews'}" class="w-100 a-button">Back</router-link>
            </div>
        </form>
    </div>
</template>

<script>
import CategoryList from '@/components/includes/CategoryList.vue'
import { mapState } from 'vuex'
export default {
    components: { CategoryList },
    name: 'GuideExperience',
    computed: {
        ...mapState({
            categories: (state) => state.data.categories,
            newGUide: (state) => state.data.newGuide
        }),
        computedCateries() {
            return this.newGUide.guide_experience ? this.newGUide.guide_experience : this.categories
        }
    },
    data() {
        return {
            form: {
                category: '',
                input: ''
            },
        }
    },
    methods: {
        selectCategory(category) {
            if(this.form.category && this.form.category === category) {
                this.form.category = ''
                this.form.input = ''
            }else {
                if(category.value > 0) {
                    this.form.input = category.value
                }else {
                    this.form.input = ''
                }
                this.form.category = category.name
            }
        },
        enterCategoryValue(category, input) {
            let payload = { name: category, value: input}
            this.$store.commit('updateCategoryValue', payload)
        },
        async updateNewGuide() {
            await this.$store.commit('updateGuideExperience', this.categories)
            this.$router.push({ name: 'GuideReference' })
        },
    }
}
</script>

<style lang="scss" scoped>

</style>