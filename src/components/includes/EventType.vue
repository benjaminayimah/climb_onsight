<template>
    <span class="capitalize evt-status br-16" :class="eventType">{{ eventType }}</span>
</template>

<script>
export default {
    name: 'EventType',
    props: {
        eventType: String
    }

}
</script>