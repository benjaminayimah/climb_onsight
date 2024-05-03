<template>
    <a :href="link " target="_blank" class="flx ai-c gap-16 btn-rounded">
        <div class="flx ai-c gap-4">
            <svg xmlns="http://www.w3.org/2000/svg" height="16" viewBox="0 0 24.75 22">
                <path d="M19.071,21.7V20.565a6.141,6.141,0,0,0,2.75-5.11c0-3.417,0-6.187-4.125-6.187s-4.125,2.77-4.125,6.188a6.141,6.141,0,0,0,2.75,5.11V21.7c-4.664.381-8.25,2.673-8.25,5.444h19.25c0-2.771-3.586-5.063-8.25-5.444ZM9.6,22.23A13.063,13.063,0,0,1,13.893,20.5a7.757,7.757,0,0,1-.87-1.268,7.873,7.873,0,0,1-1-3.779,12.208,12.208,0,0,1,.657-5.022A4.477,4.477,0,0,1,16.1,7.866c-.363-1.643-1.331-2.723-3.906-2.723-4.125,0-4.125,2.77-4.125,6.187a6.141,6.141,0,0,0,2.75,5.11v1.134c-4.664.381-8.25,2.673-8.25,5.444H8.566A8.807,8.807,0,0,1,9.6,22.23Z" transform="translate(-2.571 -5.143)"/>
            </svg>
            <span>See all Guides</span>
        </div>
        <svg xmlns="http://www.w3.org/2000/svg" width="14.5" height="14.5" viewBox="0 0 14.5 14.5">
            <path d="M-3437.481-683.708a2,2,0,0,1-2-2v-8.25a2,2,0,0,1,2-2h4.5a.5.5,0,0,1,.5.5.5.5,0,0,1-.5.5h-4.5a1,1,0,0,0-1,1v8.25a1,1,0,0,0,1,1h8.249a1,1,0,0,0,1-1v-4.5a.5.5,0,0,1,.5-.5.5.5,0,0,1,.5.5v4.5a2,2,0,0,1-2,2Zm3.4-5.4a.5.5,0,0,1,0-.707l7.4-7.4h-3.293a.5.5,0,0,1-.5-.5.5.5,0,0,1,.5-.5h4.5a.5.5,0,0,1,.243.063h0l.009.005,0,0,.006,0,.006,0,0,0,.008.005h0a.491.491,0,0,1,.074.061.5.5,0,0,1,.146.379v4.475a.5.5,0,0,1-.5.5.5.5,0,0,1-.5-.5V-696.5l-7.4,7.4a.5.5,0,0,1-.354.147A.5.5,0,0,1-3434.085-689.1Z" transform="translate(3439.481 698.208)"/>
        </svg>
    </a>
</template>

<script>
export default {
    name: 'GuidesLinkButton',
    props: {
        link: String
    }
}
</script>

<style lang="scss" scoped>
a {
    padding: 6px 14px;
    border: 1px solid rgba(0, 0, 0, 0.2);
    transition: var(--input-btn-transition);
    &:hover {
        border-color: var(--warning);
        span {
            color: var(--warning);
        }
        path {
            fill: var(--warning);
        }
    }
}
path, span {
    transition: var(--input-btn-transition);
}
</style>