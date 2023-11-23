<template>
    <div class="input-wrapper search">
        <i>
            <svg xmlns="http://www.w3.org/2000/svg" height="16" viewBox="0 0 19.658 19.661">
                <path d="M10.248,19.051a9.373,9.373,0,1,1,9.373-9.373A9.386,9.386,0,0,1,10.248,19.051Zm0-17.374a8,8,0,1,0,8,8A8.01,8.01,0,0,0,10.248,1.676Zm9.6,18.29a.678.678,0,0,1-.485-.2l-1.829-1.829a.685.685,0,0,1,.969-.969L20.334,18.8a.69.69,0,0,1,0,.969A.678.678,0,0,1,19.85,19.966Z" transform="translate(-0.875 -0.305)"/>
            </svg>
        </i>
        <input name="search_input" @input="$emit('perform-search', input)" v-model="input" class="form-control rounded br-32" type="search" placeholder="Search...">
    </div>
</template>

<script>
export default {
    name: 'SearchInput',
    data() {
        return {
            input: ''
        }
    }
}
</script>

<style lang="scss" scoped>

</style>