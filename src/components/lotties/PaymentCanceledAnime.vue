<template>
    <Vue3Lottie :animationData="animationData" :height="220" :width="220" :loop="true" />
</template>

<script>
import { Vue3Lottie } from 'vue3-lottie'
import animationData from '../../assets/lottie/payment-canceled.json';

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
