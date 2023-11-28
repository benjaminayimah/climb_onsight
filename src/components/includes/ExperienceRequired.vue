<template>
    <li class="flx">
        <a class="br-24" href="#" @click.prevent="$emit('select-experience', experience)" :class="{'selected' : computedSelected}">
            {{ experience }}
        </a>
    </li>
</template>

<script>
export default {
    name: 'ExperienceRequired',
    props: {
        experience: String,
        selections: Array
    },
    computed: {
        computedSelected() {
            if(this.selections.length) {
                const item = this.selections.find(data => data === this.experience)
                return item ? true : false
            }
            else
            return false
        }
    }
}
</script>

<style lang="scss" scoped>
a {
    transition: var(--input-btn-transition);
    padding: 10px 14px;
    background-color: #fff;
}
li {
    &:hover {
        a {
            background-color: #eee;
        }
    }
}
.selected.selected {
    background-color: #000;
    color: #fff;
}

</style>