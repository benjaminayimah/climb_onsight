<template>
      <Vue3Lottie :animationData="animationData" :height="50" :width="50" />
</template>
  
<script>
import { Vue3Lottie } from 'vue3-lottie'
import animationData from '@/assets/lottie/loader.json';
  
export default {
components: {
    Vue3Lottie,
},
data() {
    return {
        animationData
    };
},
};
</script>