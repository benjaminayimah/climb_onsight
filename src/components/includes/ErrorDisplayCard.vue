<template>
    <ul class="error-wrapper">
        <li class="input-error" v-for="(error, index) in errors" :key="index">
            {{ error[0] }}
        </li>
    </ul>
</template>

<script>
export default {
    name: 'ErrorDisplayCard',
    props: {
        errors: Object
    }
}
</script>