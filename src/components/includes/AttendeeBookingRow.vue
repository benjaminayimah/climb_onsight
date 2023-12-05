<template>
    <div class="flx gap-8">
        <div class="form-row column">
            <label :for="'name_'+ index">Name</label>
            <div class="input-wrapper">
                <input @input="handleInput" v-model="thisForm.name" :disabled="limit < 1" class="form-control" type="text" :name="'name_'+ index" :id="'name_'+ index" placeholder="Enter name">
            </div>
        </div>
        <div class="form-row column">
            <label :for="'email_'+ index">Email</label>
            <div class="input-wrapper">
                <input @input="handleInput" v-model="thisForm.email" :disabled="limit < 1" class="form-control" type="email" :name="'email_'+ index" :id="'email_'+ index" placeholder="Enter email">
            </div>
        </div>
        <div class="form-row column">
            <label :for="'dob_'+ index">DoB</label>
            <div class="input-wrapper">
                <input @input="handleInput" v-model="thisForm.dob" :disabled="limit < 1" type="date" :name="'dob_'+ index" :id="'dob_'+ index" class="form-control">
            </div>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
    name: 'AttendeeBookingRow',
    props: {
        index: Number,
        attendees: Array,
        limit: Number
    },
    computed: {
        ...mapState({
            user: (state) => state.user
        })
    },
    data() {
        return {
            thisForm: {
                id: this.index,
                name: null,
                email: null,
                dob: null
            }
        }
    },
    methods: {
        handleInput() {
            this.$emit('add-attendee-input', this.thisForm)
        },
        preLoadUser() {
            if(this.index === 0) {
                this.thisForm.name = this.user.name
                this.thisForm.email = this.user.email
                this.thisForm.dob = this.user.dob
                this.handleInput()
            }else {
                if(this.attendees.length > 1) {
                    const attendee = this.attendees.find(item => item.id === this.index)
                    if(attendee) {
                        this.thisForm.name = attendee.name
                        this.thisForm.email = attendee.email
                        this.thisForm.dob = attendee.dob
                    }
                }
            }
        }
    },
    mounted() {
        this.preLoadUser()

    }
}
</script>

<style lang="scss" scoped>

</style>