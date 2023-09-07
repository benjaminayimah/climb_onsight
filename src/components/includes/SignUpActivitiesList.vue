<template>
    <li>
        <div>
            {{ activity.name }}
        </div>
        <div>
            <div class="flx jc-sb">
                <span>Grade level</span>
                <strong>{{ activity.limit }}</strong>
            </div>
            <div>
                <input v-model="value" @change="$emit('change-val', { name: activity.name, limit: value })" type="range" min="0" max="100" step="1" class="w-100" />
                <div class="flx jc-sb">
                    <span>0%</span>
                    <span>100%</span>
                </div>
            </div>
        </div>
    </li>
</template>

<script>
export default {
    props: ['activity'],
    data() {
        return {
            value: 0
        }
    }
}
</script>

<style lang="scss" scoped>
li {
    padding: 12px 20px;
    border-bottom: 1px solid #D9D9D9;
    cursor: pointer;
    &:hover {
        background-color: #f2f2f7;
    }
    &:last-child {
        border-bottom: unset;
    }
    span {
        font-size: 0.9rem;
    }
    input {
        background-color: #D9D9D9;
        border-radius: 20px;
        height: 6px;
    }
}
</style>