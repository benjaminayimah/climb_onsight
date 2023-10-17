<template>
    <a href="" class="flx jc-sb ai-c">
        <div class="flx gap-8 ai-c">
            <div class="bg-img br-50"></div>
            <div>
                <div class="fs-09">Climb off</div>
                <div class="fs-09 gray">Ice climbing</div>
            </div>
        </div>
        <div class="text-right">
            <strong class="fs-09">June 20th</strong>
            <div class="fs-09 gray">23,maryland Avenue</div>
        </div>
    </a>
</template>

<script>
export default {
    name: 'DashTodayList',
}
</script>

<style lang="scss" scoped>
.bg-img {
    height: 60px;
    width: 60px;
}
a {
    padding: 8px;
    border-radius: 16px;
    &:hover {
        background-color: var(--list-hover);
    }
}
</style>