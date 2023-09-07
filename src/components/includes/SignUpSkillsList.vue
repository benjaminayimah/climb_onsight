<template>
    <li @click="$emit('select-skill', skill)" :class="{'active' : compputedSelected}">
        {{ skill }}
    </li>
</template>

<script>
export default {
    props: ['skill', 'selectedSkills'],
    computed: {
        compputedSelected() {
            if(this.selectedSkills.find(data => data === this.skill)) 
            return true
            else
            return false
        }
    }
}
</script>

<style lang="scss" scoped>
.active {
    background-color: var(--black) !important;
    border-color: var(--black) !important;
    color: var(--white);
}
</style>