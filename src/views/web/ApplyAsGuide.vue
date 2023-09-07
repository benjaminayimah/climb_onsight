<template>
    <div class="logon-column-wrapper flx column ai-c jc-c br-16 bg-white flx-grow-1">
        <div class="flx column column-inner ai-c gap-60">
            <logo />
            <div class="w-100 flx column gap-60 text-center">
                <div class="fw-700 fs-5rem">Welcome</div>
                <div>Apply to be listed on climb onsight by filling out the following information</div>
                <router-link :to="{ name: 'GuideCompanyInfo'}" class="button-primary a-button gap-8 w-100 btn-lg ai-c">
                    <span>Apply</span>
                </router-link>
                <a href="#" class="a-link" @click.prevent="$router.go(-1)">Back</a>
            </div>
        </div>
    </div>
</template>

<script>
import Logo from '@/components/includes/Logo.vue'
export default {
  components: { Logo },
    name: 'ApplyAsGuide'
}
</script>

<style lang="scss" scoped>

</style>