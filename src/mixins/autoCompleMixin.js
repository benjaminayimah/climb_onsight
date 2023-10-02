export default {
    mounted() {
        const google = window.google
        const autocomplete = new google.maps.places.Autocomplete(
            this.$refs['address'],
            {
                bounds: new google.maps.LatLngBounds(
                    new google.maps.LatLng(5.564836107372255, -0.3288140182577681)
                )
            }
        );
        autocomplete.addListener('place_changed', () => {
            let address = autocomplete.getPlace();
            this.form.address = address.name
            this.form.latitude = address.geometry.location.lat()
            this.form.longitude = address.geometry.location.lng()
        })
    }
}