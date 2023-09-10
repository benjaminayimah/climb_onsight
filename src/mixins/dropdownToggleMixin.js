export default {
    data() {
        return {
            toggleMenu: false,
        }
    },
    methods: {
        openDropdown(id) {
            let elem = document.getElementById(id)
            if(this.toggleMenu === false) {
                this.toggleMenu = true
                document.body.classList.add('fixed-body')
                this.$store.commit('setDynamicFloatingDiv', elem)
            }
        },
        closeDropdown(id) {
            let elem = document.getElementById(id)
            this.toggleMenu = false
            this.$store.commit('reSetDynamicFloatingDiv', elem)
            document.body.classList.remove('fixed-body')
        }
    }
}
