<template>
    <section v-if="$route.query.status === 'success'" class="centered guide-completed-container">
        <div class="bg-white br-16 pd-50 flx column ai-c text-center">
            <logo />
            <svg class="mt-32" xmlns="http://www.w3.org/2000/svg" height="120" viewBox="0 0 151.049 136.885">
                <g transform="translate(-0.992 -0.153)">
                    <path d="M-2787.381-207.569a6.611,6.611,0,0,1,6.607-6.607,6.61,6.61,0,0,1,6.606,6.607,6.609,6.609,0,0,1-6.606,6.606A6.61,6.61,0,0,1-2787.381-207.569Zm-114.254-15.846a4.285,4.285,0,0,1,4.282-4.282,4.286,4.286,0,0,1,4.283,4.282,4.285,4.285,0,0,1-4.283,4.282A4.285,4.285,0,0,1-2901.635-223.415Zm-7.324-70.941a6.8,6.8,0,0,1,6.8-6.8,6.8,6.8,0,0,1,6.8,6.8,6.8,6.8,0,0,1-6.8,6.8A6.8,6.8,0,0,1-2908.959-294.356Zm135.824-3.867a7.617,7.617,0,0,1,7.613-7.613,7.616,7.616,0,0,1,7.611,7.613,7.616,7.616,0,0,1-7.611,7.612A7.617,7.617,0,0,1-2773.135-298.223Zm-60.488-36.306a3.32,3.32,0,0,1,3.318-3.318,3.321,3.321,0,0,1,3.319,3.318,3.321,3.321,0,0,1-3.319,3.318A3.32,3.32,0,0,1-2833.623-334.529Z" transform="translate(2909.951 338)" fill="#e9b38b"/>
                    <path d="M124.458,67.284c-.063,25.486-20.422,46.483-45.915,46.483h-.577A46.912,46.912,0,0,1,40.914,95.628a46.293,46.293,0,0,1,36.8-74.561h.577A46.31,46.31,0,0,1,124.458,67.284Z" fill="#b58563"/>
                    <path d="M61.639,68.968,73.865,82.287,98.429,56.2" transform="translate(-0.387 -1.825)" fill="none" stroke="#fff" stroke-linecap="round" stroke-linejoin="round" stroke-width="6.924"/>
                </g>
            </svg>
            <div>
                <p>
                    Thank you for your submission. We will review your documents and reach out to you shortly through email to set up a phone call.
                </p>
                <p>
                    After the phone call we will let you know if we accept your application. If approved, we will send you a link to fill out your own profile and add events.
                </p>
                <p>
                    If you have any questions in the meantime, please contact us at:
                </p>
                <a href="mailto:support@climbonsight.ca" class="ft-secondary a-link">support@climbonsight.ca</a>
                <p class="flx jc-c">
                    <button @click="goBack" class="button-primary w-80 btn-lg">Back to homepage</button>
                </p>
            </div>
        </div>
    </section>
</template>

<script>
import Logo from '@/components/includes/Logo.vue'
export default {
    components: { Logo },
    name: 'GuideRegistrationComplete',
    methods: {
        goBack() {
            localStorage.removeItem('newGuide')
            this.$store.commit('removeNewUsers')
            window.location = '/'
        }
    }
}
</script>

<style lang="scss" scoped>
section {
    height: 100dvh;
    background-color: #FFF1E7;
}
.bg-white  {
    width: 515px;
}
</style>