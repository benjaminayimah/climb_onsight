<template>
    <div>
        <h1>Payout accounts</h1>
        <!-- <button @click.prevent="deleteAccount('acct_1P9kZJQ5etNBV0lQ')">Delete</button> -->
        <ul>
            <li v-if="accounts.length">
                <div></div>
                <button>Delete</button>
            </li>
        </ul>
    </div>
</template>

<script>
import axios from 'axios'
import { mapState } from 'vuex'
export default {
    name: 'PayoutAccount',
    computed: {
        ...mapState({
            token: (state) => state.token,
            hostname: (state) => state.hostname
        })
    },
    data() {
        return {
            accounts: []
        }
    },
    methods: {
        async fetchAccounts() {
            try {
                const res = await axios.get(this.hostname+'/api/fetch-connect-accounts?token='+ this.token)
                console.log(res.data)
            } catch (e) {
                console.log(e)
            }
        },
        async deleteAccount(id) {
            try {                const res = await axios.delete(this.hostname+'/api/delete-connect-account/'+id+'?token='+ this.token)

                console.log(res.data)
            } catch (e) {
                console.log(e)
            }
        }
    },
    mounted() {
        // this.fetchAccounts()
    }
}
</script>

<style lang="scss" scoped>

</style>