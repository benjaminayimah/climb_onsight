<template>
    <div class="flx column ai-c gap-8 fs-08 ">
        <ul class="flx flx-wrap jc-c">
            <li v-for="(list, index) in lists" :key="index">
                <a :href="list.url" target="_blank" class="a-link gray">{{ list.name }}</a>
            </li>
        </ul>
        <span class="gray text-center">© {{ new Date().getFullYear() }} Climb Onsight. All Rights Reserved</span>
    </div>
</template>

<script>
export default {
    name: 'FootNote',
    data() {
        return {
            lists: [
                { name: 'About', url: 'https://climbonsight.ca/about-us/'},
                { name: 'Terms & Conditions', url: 'https://climbonsight.ca/terms-and-conditions/'},
                { name: 'Privacy Policy', url: 'https://climbonsight.ca/privacy-policy/'},
                { name: 'Blog', url: 'https://climbonsight.ca/blog/'},
                { name: 'FAQ\'s', url: 'https://climbonsight.ca/f-a-q/'}
            ]
        }
    }
}
</script>
<style lang="css" scoped>
li:hover a {
    color: black;
}
li:not(li:last-child)::after {
    content: '\00B7';
    margin: 0 .3em 0 .3em;
    color: var(--gray);
}
div {
    padding-bottom: 32px;
}
</style>