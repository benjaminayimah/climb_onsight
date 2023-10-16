import { mapGetters } from "vuex"
export default {
    computed: {
        ...mapGetters(['is_super', 'is_admin', 'is_guide', 'is_climber']),
    },

}