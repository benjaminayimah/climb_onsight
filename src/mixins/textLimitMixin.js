export default {
    data() {
        return {
            limit: 600,
            showMore: false
        }
    },
    methods: {
        toggleShow() {
            this.showMore = !this.showMore;
        }
    }
}