export default {
    methods: {
        computedFirstName(name) {
            if(name)
            return name.split(' ')[0] 
            else
            return null
        }
    }
}