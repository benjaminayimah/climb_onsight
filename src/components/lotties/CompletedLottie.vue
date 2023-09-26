<template>
    <Vue3Lottie :animationData="animationData" :height="180" :width="180" :loop="false" />
</template>
<script>
import { Vue3Lottie } from 'vue3-lottie'
import animationData from '@/assets/lottie/completed.json';

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
