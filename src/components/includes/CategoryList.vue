<template>
    <li class="scale-in2">
        <a href="#" class="flx gap-8 ai-c br-32" @click="$emit('select-category', category)" :class="{'selected' : computedSelected}">
            <span class="fs-09">{{ category.name }}</span>
            <img class="br-50" :src="category.image" :alt="category.name">
        </a>
    </li>
</template>

<script>
export default {
    name: 'CategoryList',
    props: {
        category: Object,
        selected: String,
        color: String
    },
    computed: {
        computedSelected() {
            if(this.selected === this.category.name)
            return true
            else
            return false
        },
        computedColor() {
            return this.color
        }
    }
}
</script>

<style lang="scss" scoped>
a {
    padding: 4px 4px 4px 12px;
    border: 1px solid transparent;
    background-color: v-bind(color);
}
img {
    height: 35px;
    width: 35px;
}
span {
    white-space: nowrap;
}
.selected {
    border: 1px solid #000;
}
.scale-in2 {
    transition: var(--input-btn-transition);
    &:active {
        transform: scale(0.97);
    }
}
</style>