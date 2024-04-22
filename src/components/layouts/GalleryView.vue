<template>
    <backdrop :index="600" :opacity=".8" @click="$store.commit('closeGallery')"/>
    <div class="gallery-main relative">
        <div class="gallery-wrapper flx column h-100">
            <div class="gallery-preview">
                <img class="br-16" :src="s3bucket+'/'+ JSON.parse(gallery.event.gallery)[gallery.index]" :alt="gallery.event.event_name">
            </div>
            <div class="gallery-footer flx jc-c">
                <div class="flx gap-8">
                    <img @click="$store.commit('selectedGallery', index)" v-for="(image, index) in JSON.parse(gallery.event.gallery)" :key="index" :src="s3bucket+'/'+ image" :alt="'Gallary image '+index" class="br-16" :class="{ 'isActive' : index === gallery.index}" />
                </div>
            </div>
        </div>
        <div class="gallery-controls absolute control-left">
            <button @click="$store.commit('prevGallery')">
                <svg viewBox="0 0 24 24" width="24px" height="24px">
                    <path d="M10.736 20.792l-8.58-8.581 8.58-8.58 1.06 1.06-6.77 6.77h16.08v1.5H5.026l6.77 6.77-1.06 1.06z" fill="#fff"></path>
                </svg>
            </button>
        </div>
        <div class="gallery-controls absolute control-right">
            <button @click="$store.commit('nextGallery')">
                <svg viewBox="0 0 24 24" width="24px" height="24px">
                    <path d="M12.631 3.632l8.578 8.577-8.58 8.58-1.062-1.06 6.77-6.77-16.075.004v-1.5l16.076-.004-6.767-6.767 1.06-1.06z" fill="#fff"></path>
                </svg>
            </button>
        </div>
    </div>
    <button class="absolute btn-close scale-in bg-transparent" @click="$store.commit('closeGallery')">
        <svg xmlns="http://www.w3.org/2000/svg" height="10" viewBox="0 0 13.587 13.587">
            <path d="M7.163,19.188,5.8,17.83,11.239,12.4,5.8,6.96,7.163,5.6,12.6,11.036,18.033,5.6,19.392,6.96,13.957,12.4l5.435,5.435-1.359,1.359L12.6,13.754Z" transform="translate(-5.805 -5.602)" fill="#fff"/>
        </svg>
    </button>
</template>

<script>
import Backdrop from '../includes/Backdrop.vue'
import { mapState } from 'vuex';
export default {
    name: 'GalleryView',
    components: { Backdrop },
    props: ['gallery'],
    computed: {
        ...mapState({
            s3bucket: (state) => state.s3bucket
        })
    }
}
</script>

<style lang="scss" scoped>
.gallery-main {
    position: fixed;
    z-index: 601;
    height: 80dvh;
    width: calc(50vw + 200px);
    top: 15%;
    left: 50%;
    translate: -50%;
    color: #fff;
}
.gallery-wrapper {
    width: 100%;
}
.gallery-preview {
    height: 85%;
    background-color: #000;
    border-radius: 20px;
    img {
        width: 100%;
        display: block;
        aspect-ratio: 1 / 1;
        -o-object-fit: contain;
        object-fit: contain;
        object-position: center;
        height: 100%;
        background-color: inherit;
    }
}
.gallery-footer {
    flex: 1 1;
    padding: 8px;
    img {
        max-height: 70px;
        border-radius: 10px;
        cursor: pointer;
    }
}
.gallery-controls {
    top: 40%;
    button {
        height: 45px;
        width: 45px;
        background-color: rgba(32, 32, 32, 0.7);
        &:hover {
            background-color: rgba(32, 32, 32, 0.9);
        }
    }
}
.control-left {
    left: 12px;
}
.control-right {
    right: 12px;
}
.btn-close {
    inset: 50px 50px auto auto;
    z-index: 601;
}
.isActive {
    border: 2px solid #fff;

}
@media screen and (max-width: 570px){
    .gallery-main {
        width: 100%;
    }
    .gallery-preview{
        height: 70%;
        border-radius: 0;

    }
    .gallery-footer {
        .gap-8 {
            gap: 4px;
        }       
        img {
            max-height: 50px;
        }
    }
}
</style>