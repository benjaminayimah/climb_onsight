<template>
    <button @click="$store.commit('showGallery', {event: event, index: 0})" class="flx gap-4">
        <svg xmlns="http://www.w3.org/2000/svg" height="18" viewBox="0 0 22 22">
            <path d="M25,18.4V5.2A2.206,2.206,0,0,0,22.8,3H9.6A2.206,2.206,0,0,0,7.4,5.2V18.4a2.206,2.206,0,0,0,2.2,2.2H22.8A2.206,2.206,0,0,0,25,18.4ZM12.9,14l2.233,2.981L18.4,12.9l4.4,5.5H9.6ZM3,7.4V22.8A2.206,2.206,0,0,0,5.2,25H20.6V22.8H5.2V7.4Z" transform="translate(-3 -3)" fill="#fff"/>
        </svg>
        <span>Gallery({{ JSON.parse(event.gallery).length }})</span>
    </button>
</template>

<script>
export default {
    name: 'GalleryButton',
    props: {
        event: Object
    }
}
</script>

<style lang="scss" scoped>
button {
    position: absolute;
    background-color: rgba(0, 0, 0, 0.8);
    inset: auto 12px 12px auto;
    padding: 8px 10px;
    &:hover {
        background-color: rgba(0, 0, 0, .9);
    }
}
span {
    color: #fff;
}
</style>