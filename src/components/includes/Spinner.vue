<template>
    <span class="loader"></span>
</template>

<script>
export default {
    name: 'SpinnerLoader',
    props: {
        size: Number
    },
    computed: {
        dimension() {
            return this.size+'px'
        }
    }
}
</script>

<style scoped>
.loader {
    --dimension: v-bind(dimension);
    width: var(--dimension);
    height: var(--dimension);
    border: 2px solid #FFF;
    border-radius: 50%;
    display: inline-block;
    position: relative;
    box-sizing: border-box;
    animation: rotation 1s linear infinite;
} 
.loader::after {
    content: '';  
    box-sizing: border-box;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: calc(var(--dimension) + 8px);
    height: calc(var(--dimension) + 8px);
    border-radius: 50%;
    border: 2px solid transparent;
    border-bottom-color: #ffffff;
}

@keyframes rotation {
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
    }
} 
</style>