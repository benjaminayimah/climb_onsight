<template>
    <div class="flx column gap-8">
        <div class="input-wrapper">
            <input @input="formData" v-model="thisForm.question" class="br-16 w-100" type="text" :name="'question'+index" placeholder="Enter question" :class="input2 ? 'form-control2' : 'form-control'" />
        </div>
        <div class="input-wrapper">
            <input @input="formData" v-model="thisForm.answer" class="br-16 w-100" type="text" :name="'answer'+index" placeholder="Enter answer" :class="input2 ? 'form-control2' : 'form-control'" />
        </div>
        <div class="flx jc-fe">
            <a v-if="length > 1" href="#" @click="$emit('remove-row', index)" class="a-link flx gap-4 ai-c">
                <svg xmlns="http://www.w3.org/2000/svg" height="18" viewBox="0 0 18 18">
                    <path  d="M-1981,18a9.01,9.01,0,0,1-9-9,9.01,9.01,0,0,1,9-9,9.01,9.01,0,0,1,9,9A9.01,9.01,0,0,1-1981,18Zm-4.325-9.7a.7.7,0,0,0-.7.7.7.7,0,0,0,.7.7h8.331a.7.7,0,0,0,.7-.7.7.7,0,0,0-.7-.7Z" transform="translate(1990)" fill="#d81d1d"/>
                </svg>
                Remove
            </a>
        </div>
    </div>
</template>

<script>
export default {
    name: 'FaqInputRow',
    props: {
        form: Object,
        index: Number,
        length: Number,
        input2: Boolean
    },
    data() {
        return {
            thisForm: {
                id: this.form.id,
                question: this.form.question,
                answer: this.form.answer
            }
        }
    },
    methods: {
        formData() {
            this.$emit('add-form-input', this.thisForm)
        }
    }
}
</script>

<style lang="scss" scoped>
.input-wrapper {
    select, input, textarea {
        padding: 10px 20px;
    }
}
</style>