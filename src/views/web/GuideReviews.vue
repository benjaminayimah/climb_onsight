<template>
    <div class="stepper-wrapper w-100 flx column gap-32">
        <div class="stepper-title">Link to reviews</div>
        <form>
            <div class="form-wrapper flx column gap-24">
                <div class="form-row column">
                    <label for="companyName">Reviews</label>
                    <div class="input-wrapper">
                        <input type="text" name="companyName" id="companyName" class="form-control" placeholder="Add link to customer reviews">
                    </div>
                </div>
                <router-link :to="{ name: 'GuideExperience'}" class="button-primary a-button gap-8 w-100 btn-lg ai-c">
                    <span>Continue</span>
                </router-link>
            </div>
        </form>
    </div>
</template>

<script>
export default {
    name: 'GuideReviews'
}
</script>

<style lang="scss" scoped>

</style>