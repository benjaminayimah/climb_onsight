<template>
    <div class="stepper-wrapper w-100 flx column gap-32">
        <div class="stepper-title">Please list yours or your companies experience</div>
        <form>
            <div class="form-wrapper flx column gap-24">
                <div class="form-row column">
                    <label for="companyName">Company name</label>
                    <div class="input-wrapper">
                        <input type="text" name="companyName" id="companyName" class="form-control" placeholder="Company Name">
                    </div>
                </div>
                <div class="form-row column">
                    <label for="email">Email</label>
                    <div class="input-wrapper">
                        <input type="email" name="email" id="email" class="form-control" placeholder="Company Email">
                    </div>
                </div>
                <div class="form-row column">
                    <label for="phone">Phone</label>
                    <div class="input-wrapper">
                        <input type="tel" name="phone" id="phone" class="form-control" placeholder="Company Phone">
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