<template>
    <h1>Dashboard</h1>
    <button @click="delUser">Delete</button>
    <button @click="$store.dispatch('logOut', user.id)">Logout</button>
    {{ user.id }}
</template>
<script>
import axios from "axios";
import { mapState } from 'vuex';
export default {
    name: 'AdminDashboard',
    computed: {
        ...mapState({
            user: (state) => state.user,
            hostname: (state) => state.hostname,
            token: (state) => state.token
        })
    },
    
    methods: {
        delUser() {
            const url = this.hostname + '/api/users/137'
            const headers = {
                'Content-Type' : 'application/json',
                'Authorization' : `Bearer ${this.token}`
            };
            axios.delete(url, { headers })
            .then(res => {
                console.log(res)
            })
            .catch(e => {
                console.error(e.response)
            })
        }
    }
    
}
</script>