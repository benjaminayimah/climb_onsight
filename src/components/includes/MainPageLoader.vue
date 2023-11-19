<template>
  <teleport to="body">
        <div class="spinner-wrapper bg-white br-32 pd-4">
            <lottie-loader :size="35" />
        </div>
    </teleport>
</template>
<script>
import LottieLoader from '../lotties/LottieLoader.vue'
export default {
    name: 'MainPageLoader',
    components: { LottieLoader },
}
</script>

<style lang="scss" scoped>
.spinner-wrapper {
    position: fixed;
    left: 50%;
    top: 30px;
    transform: translateX(-50%);
    z-index: 999999;
    box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
}
</style>