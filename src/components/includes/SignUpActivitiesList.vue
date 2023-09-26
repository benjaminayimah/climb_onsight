<template>
    <li>
        <div class="name">
            {{ activity.name }}
        </div>
        <div class="slider">
            <div class="flx gap-8 ai-c">
                <span>Grade level</span>
                <strong>{{ level }}</strong>
            </div>
            <div>
                <input v-model="level" @change="$emit('change-val', { name: activity.name, level: level })" type="range" min="0" max="100" step="1" class="w-100" />
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
    props: {
        activity: Object
    },
    data() {
        return {
            level: 0
        }
    },
    methods: {
        presetForm() {
            if(this.activity) {
                this.level = this.activity.level
            }
        }
    },
    mounted() {
        this.presetForm()
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
    &:hover {
        .slider {
            display: block;
        }
    }
}
.slider {
    display: none;
}
</style>