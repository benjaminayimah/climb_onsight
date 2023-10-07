<template>
    <li>
        <a href="#" class="flx gap-8 br-16">
            <profile-avatar :avatar="user.image"/>
            <div class="flx flx-1 column">
                <div class="flx jc-sb ai-c">
                    <div class="wrap-text wrap-line-1 fw-600 fs-09 capitalize">{{ user.name }}</div>
                    <span class="gray fs-08 wrap-text wrap-line-1">June, 10</span>
                </div>
                <div class="flx jc-sb">
                    <span class="fs-09 wrap-text wrap-line-1 gray highlight">Tell you the craziest stuff happened to me at the market today...</span>
                    <span class="count flx-shrink-0 br-50 centered fs-08">3</span>
                </div>
            </div>
        </a>
    </li>
</template>

<script>
import ProfileAvatar from './ProfileAvatar.vue'
export default {
    components: { ProfileAvatar },
    name: 'ChatList',
    props: {
        user: Object
    }

}
</script>
<style lang="scss" scoped>
img {
    height: 48px;
    width: 48px;
}
a {
    padding: 10px;
    border: 1px solid rgba(217, 217, 217, 0.49);
    transition: var(--input-btn-transition);
    &:hover {
        border: 1px solid rgba(0, 0, 0, 0.5);
    }
}
</style>