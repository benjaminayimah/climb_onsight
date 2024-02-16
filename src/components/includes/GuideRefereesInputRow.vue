<template>
    <div class="flx column gap-16 ref-column">
        <div class="form-row column">
            <label :for="'referenceName'+index">Referee's name</label>
            <div class="input-wrapper">
                <input @input="formData" v-model="thisForm.name" type="text" :name="'referenceName'+index" :id="'referenceName'+index" class="form-control" :class="{ 'error-border': validation.errors.name }" placeholder="Referees name">
            </div>
            <span class="input-error" v-if="validation.error && validation.errors.name">
                {{ validation.errors.name[0] }}
            </span>
        </div>
        <div class="form-row column">
            <label :for="'email'+index">Email</label>
            <div class="input-wrapper">
                <input @input="formData" v-model="thisForm.email" type="email" :name="'email'+index" :id="'email'+index" class="form-control" :class="{ 'error-border': validation.errors.email }" placeholder="Email">
            </div>
            <span class="input-error" v-if="validation.error && validation.errors.email">
                {{ validation.errors.email[0] }}
            </span>
        </div>
        <div class="form-row column">
            <label :for="'phone'+index">Phone number</label>
            <div class="input-wrapper">
                <input @input="formData" v-model="thisForm.phone" type="tel" :name="'phone'+index" :id="'phone'+index" class="form-control" placeholder="+1 (123) 456 7890" :class="{ 'error-border': validation.errors.phone }">
            </div>
            <span class="input-error" v-if="validation.error && validation.errors.phone">
                {{ validation.errors.phone[0] }}
            </span>
        </div>
        <a v-if="length > 1" href="#" @click="$emit('remove-row', index)" class="a-link flx gap-4 ai-c">
            <svg xmlns="http://www.w3.org/2000/svg" height="18" viewBox="0 0 18 18">
                <path  d="M-1981,18a9.01,9.01,0,0,1-9-9,9.01,9.01,0,0,1,9-9,9.01,9.01,0,0,1,9,9A9.01,9.01,0,0,1-1981,18Zm-4.325-9.7a.7.7,0,0,0-.7.7.7.7,0,0,0,.7.7h8.331a.7.7,0,0,0,.7-.7.7.7,0,0,0-.7-.7Z" transform="translate(1990)" fill="#d81d1d"/>
            </svg>
            Remove
        </a>
    </div>
</template>

<script>
export default {
    name: 'GuideReviewRow',
    props: {
        form: Object,
        index: Number,
        length: Number,
        validation: Object
    },
    data() {
        return {
            thisForm: {
                id: this.form.id,
                name: this.form.name,
                email: this.form.email,
                phone: this.form.phone
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

</style>