<template>
    <div class="stepper-wrapper w-100 flx column gap-32">
        <div class="stepper-title">Please list yours or your companies experience</div>
        <form>
            <div class="form-wrapper flx column gap-24">
                dfd
                <div class="form-row column">
                    <label for="years">Years of expirience</label>
                    <div class="input-wrapper">
                        <input type="text" name="years" id="years" class="form-control" placeholder="Number of years of experience">
                    </div>
                </div>
                <router-link :to="{ name: 'GuideReference'}" class="button-primary a-button gap-8 w-100 btn-lg ai-c">
                    <span>Continue</span>
                </router-link>
            </div>
        </form>
    </div>
</template>

<script>
export default {
    name: 'GuideExperience'
}
</script>

<style lang="scss" scoped>

</style>