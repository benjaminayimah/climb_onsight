<template>
    <Vue3Lottie :animationData="animationData" :height="size" :width="size" />
</template>
<script>
import { Vue3Lottie } from 'vue3-lottie'
import animationData from '@/assets/lottie/loader-white.json';

export default {
  components: {
      Vue3Lottie,
  },
  props: {
      size: Number
  },
  data() {
      return {
          animationData
      }
  },
};
</script>