import { mapState } from "vuex"
export default {
    computed: {
        ...mapState({
            signedUp: (state) => state.data.signedUp
        }) 
    },
    data() {
        return {
            signedIn: false,
            progressFill: 1,
        }
    },
    methods: {
        async signinSuccess(res) {
            await this.$store.commit('signInSuccess', res)
            await this.$store.dispatch('getAuthUser', this.token)
            this.signedIn = true
        },
        startProgress() {
            var interval = setInterval(() => {
                if(!this.signedIn && this.progressFill < 180 ) {
                    this.progressFill++
                }
                if(this.signedIn) {
                    this.progressFill = 200
                    setTimeout(()=> {
                        clearInterval(interval);
                        this.$router.push({ name: 'Home' })
                    }, 200)
                }
            }, 20)
        },
        stopProgress() {
            this.$store.commit('stopProgress')
        }
    }
}