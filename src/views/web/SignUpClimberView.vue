<template>
    <div class="logon-column-wrapper flx column ai-c br-16 bg-white">
        <div class="flx column column-inner ai-c gap-24">
            <div class="ff-2">CLIMB ONSIGHT</div>
            <div class="w-100 flx column gap-24">
                <router-view></router-view>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'SignUpClimberView'
}
</script>

<style lang="scss" scoped>
.logon-column-wrapper {
    padding-top: 60px;
    padding-bottom: 60px;
}
</style>