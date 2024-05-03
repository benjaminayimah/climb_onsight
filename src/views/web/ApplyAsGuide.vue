<template>
    <div class="logon-column-wrapper flx column ai-c jc-c br-16 bg-white flx-grow-1">
        <div class="flx column column-inner ai-c gap-60 h-100">
            <div>
                <logo />
            </div>
            <div class="flx ai-c flx-1">
                <div class="flx-1 flx column gap-60 text-center">
                    <div class="fw-700 fs-5rem">Welcome</div>
                    <div>Apply to be listed on Climb Onsight by filling out the following information</div>
                    <div>
                        <button @click="goToApply" class="button-primary gap-8 w-100 btn-lg ai-c mb-8">
                            <span>Get started</span>
                        </button>
                        <a href="#" class="a-button button-outline btn-lg" @click.prevent="$router.go(-1)">Back</a>
                    </div>
                </div>
            </div>
            <foot-note />
        </div>
    </div>
</template>

<script>
import Logo from '@/components/includes/Logo.vue'
import FootNote from '@/components/includes/FootNote.vue'
export default {
    components: { Logo, FootNote },
    name: 'ApplyAsGuide',
    methods: {
        async goToApply() {
            if(localStorage.getItem('newGuide')) {
                this.$store.commit('removeNewUsers')
                this.$store.commit('removeNewGuide')
            }
            this.$router.push({ name: 'GuideCompanyInfo' })
        }
    }
  
}
</script>
