<template>
    <div class="flx jc-sb br-16 ai-c bg-white custom-price">
        <span>{{ index +1 }} person{{ index +1 > 1 ? 's' : '' }}</span>
        <input v-model="thisForm.price" @input="handleInput" type="number" class="form-control2 br-24 h-100" min="1" :id="'price_'+index" placeholder="Enter price">
    </div>
</template>

<script>
export default {
    name: 'PriceInput',
    props: {
        index: Number,
        prices: Array
    },
    computed: {
        computedPrice() {
            if(this.prices && this.prices.length) {
                const priceObj = this.prices.find(data => data.id === this.index)
                if(priceObj)
                return priceObj.price
                else
                return ''
            }
            else
            return ''
        },
    },
    data() {
        return {
            thisForm: {
                id: this.index,
                label: this.index+1 +' person',
                price: ''
            }
        }
    },
    methods: {
        handleInput() {
            this.$emit('add-price-input', this.thisForm)
            
        }
    },
    mounted() {
        this.thisForm.price = this.computedPrice
    }
}
</script>

<style lang="scss" scoped>
.custom-price {
    padding: 11px;
    height: 55px;
    input {
        background-color: #ECECEC;
        max-width: 102px;
        border: 1px solid transparent !important;
        padding: 4px 8px;
        &::placeholder {
            font-size: 0.9rem;
        }
        &:hover {
            border-color: #000000 !important;
        }
    }
}
</style>