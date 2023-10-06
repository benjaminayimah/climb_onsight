<template>
    <router-link :to="{ name: 'Payout' }" class="grid-item grid-col-payout">
        <div class="table-cell gap-8">
            <profile-avatar :avatar="user.image"/>
            <span class="wrap-text wrap-line-1">{{ user.name }}</span>
        </div>
        <div class="table-cell"><strong>$243</strong></div>
        <div class="table-cell"><span class="wrap-text wrap-line-1">Climb one climb all</span></div>
        <div class="table-cell">
            <span class="wrap-text wrap-line-1">June, 19</span>
        </div>
    </router-link>
</template>

<script>
import ProfileAvatar from './ProfileAvatar.vue'
export default {
    components: { ProfileAvatar },
    name: 'PayoutTableRow',
    props: {
        user: Object
    }
}
</script>

<style lang="scss" scoped>
img{
    height: 42px;
    width: 42px;
}
// a{
//     container-type: inline-size
// }
// @container( inline-size <= 720px) {
//     .see-details{
//         display: none
//     }

// }
</style>