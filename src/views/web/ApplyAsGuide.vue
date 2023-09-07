<template>
    <div class="logon-column-wrapper flx column ai-c jc-c br-16 bg-white flx-grow-1">
        <div class="flx column column-inner ai-c gap-60">
            <div class="ff-2">CLIMB ONSIGHT</div>
            <div class="w-100 flx column gap-60 text-center">
                <div class="fw-700 fs-5rem">Welcome</div>
                <div>Apply to be listed on climb onsight by filling out the following information</div>
                <router-link :to="{ name: 'GuideCompanyInfo'}" class="button-primary a-button gap-8 w-100 btn-lg ai-c">
                    <spinner v-if="submiting" />
                    <span>{{ submiting ? 'Please wait...' : 'Apply'}}</span>
                </router-link>
                <a href="#" class="a-link" @click.prevent="$router.go(-1)">Back</a>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'ApplyAsGuide'
}
</script>

<style lang="scss" scoped>

</style>