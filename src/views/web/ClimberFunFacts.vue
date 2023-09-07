<template>
    <div class="stepper-wrapper w-100 flx column gap-32">
        <div class="stepper-title">Fun facts</div>
        <div>
            <div class="mb-8">Tell us fun facts about your climbing experience</div>
            <div class="input-wrapper mb-16">
                <textarea v-model="form.bio" class="w-100 form-control" name="funfact" rows="4" placeholder="Type here..."></textarea>
            </div>
            <button @click="updateNewUser" class="button-primary gap-8 w-100 btn-lg ai-c">
                <span>Continue</span>
            </button>
        </div>
    </div>
</template>

<script>
export default {
    name: 'ClimberFunFacts',
    data() {
        return {
            form: {
                bio: JSON.parse(localStorage.getItem('newUser')).form.bio || '',
            }
        }
    },
    methods: {
        updateNewUser() {
            let stored = JSON.parse(localStorage.getItem('newUser'))
            stored.form.bio = this.form.bio
            localStorage.setItem('newUser', JSON.stringify(stored))
            this.$router.push({ name: 'ClimberInterestedSkills' })
        }
    }
}
</script>

<style lang="scss" scoped>

</style>