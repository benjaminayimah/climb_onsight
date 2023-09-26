export default {
    methods: {
        formatPhoneNumber() {
            // Remove all non-numeric characters from the input
            const numericPhoneNumber = this.form.phone_number.replace(/\D/g, "");
            if (numericPhoneNumber.length > 3) {
              // Introduce the first dash after the first three digits
              const firstPart = numericPhoneNumber.slice(0, 3);
              const restPart = numericPhoneNumber.slice(3);
      
              // Check if the restPart has a length greater than 3 to introduce the second dash
              if (restPart.length > 3) {
                const secondPart = restPart.slice(0, 3);
                const thirdPart = restPart.slice(3);
                this.form.phone_number = `${firstPart} ${secondPart} ${thirdPart}`;
              } else {
                this.form.phone_number = `${firstPart} ${restPart}`;
              }
            } else {
              // If the length is less than or equal to 3, don't introduce dashes
              this.form.phone_number = numericPhoneNumber;
            }
          }
    },
}