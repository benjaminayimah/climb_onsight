<template>
    <div class="custom-tooltip fs-08" id="tooltip"></div>
</template>

<script>
export default {
    name: 'ToolTip',
    mounted() {
        const tooltipTrigger = document.querySelector('.tooltip');
        const tooltip = document.getElementById('tooltip');

        tooltipTrigger.addEventListener('mouseover', function() {
            const tooltipText = this.getAttribute('data-tooltip');
            tooltip.textContent = tooltipText;
            tooltip.style.display = 'block';
            tooltip.style.top = `${this.offsetTop + this.offsetHeight + 4}px`;
            tooltip.style.left = `${this.offsetLeft - 8}px`;
        });
        tooltipTrigger.addEventListener('mouseout', function() {
            tooltip.style.display = 'none';
        });
    }
}
</script>

<style lang="css" scoped>
.custom-tooltip {
  display: none;
  position: absolute;
  background-color: rgba(0, 0, 0, 0.8);
  color: #fff;
  padding: 8px;
  border-radius: 8px;
  z-index: 1;
}
</style>