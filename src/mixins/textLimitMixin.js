export default {
    data() {
        return {
            limit: 200,
            showMore: false
        }
    },
    methods: {
        toggleShow() {
            this.showMore = !this.showMore;
        }
    }
}