<template>
    <div class="payment-swish container py-3 border shadow-lg bg-dark rounded">
        <h2 class="mb-3 text-white">Enter Swish Details</h2>
        <form @submit.prevent="handlePayment" class="row g-3">
            <div class="col-md-6">
                <label for="firstName" class="form-label">First Name:</label>
                <input type="text" class="form-control" id="firstName" v-model="firstName" placeholder="First Name"
                    @input="validateFirstName">
            </div>
            <div class="col-md-6">
                <label for="lastName" class="form-label">Last Name:</label>
                <input type="text" class="form-control" id="lastName" v-model="lastName" placeholder="Last Name"
                    @input="validateLastName">
            </div>
            <div class="col-12">
                <label for="swishNumber" class="form-label">Swish Number:</label>
                <input type="text" class="form-control" id="swishNumber" v-model="swishNumber" placeholder="1234567890"
                    @input="validateSwishNumber">
            </div>
            <button type="submit" class="btn btn-success">Submit</button>
            <p class="error-message text-white">{{ errorMessage }}</p>
        </form>
    </div>
</template>

<script>
//removes all letters from string
String.prototype.removeAllLetters = function () { return this.replace(/[a-zA-Z]/g, ''); };
//removes all numbers from string
String.prototype.removeAllNumbers = function () { return this.replace(/\d/g, ''); };
//adds a space after each group of 4 numbers (not including if the group of 4 numbers does not have a following number)
String.prototype.addSpaceAfterFourDigits = function () { return this.replace(/(\d{4})(?=\d)/g, '$1 '); };

export default {
    data() {
        return {
            firstName: '',
            lastName: '',
            swishNumber: '',
            errorMessage: ''
        }
    },
    methods: {
        handlePayment() {
            if(!this.validInputs()){
                return;
            }
            this.$emit('payment-submitted', {
                firstName: this.firstName,
                lastName: this.lastName,
                swishNumber: this.swishNumber
            });
        },
        validateSwishNumber() {
            //remove all non numbers
            //keeps the +
            //for the country code
            this.swishNumber = this.swishNumber.replace(/[^0-9+]/g, '');

            //no more than 20 numbers
            if (this.swishNumber.length > 20) {
                this.swishNumber = this.swishNumber.slice(0, 20);
            }
            //ensure this.swishnumber is numbers and of right length
            const isValidSwishNumber = /^(\+)?\d{6,20}$/.test(this.swishNumber);
            if (!isValidSwishNumber) {
                this.errorMessage = 'Invalid Swish number.';
                return
            }
            this.errorMessage = '';
        },
        validInputs() {
            this.errorMessage = '';
            if (!this.firstName) {
                this.errorMessage = 'First name is required.';
                return false;
            }
            if (!this.lastName) {
                this.errorMessage = 'Last name is required.';
                return false;
            }
            const isValidSwishNumber = /^(\+)?\d{6,20}$/.test(this.swishNumber);
            if (!isValidSwishNumber) {
                this.errorMessage = 'Invalid Swish number.';
                return false;
            }
            // if we made it here, all inputs are valid
            return true;
        }
    }
}
</script>

<style scoped>
.payment-swish {
    padding: 20px;
    border: 1px solid #ddd;
    min-width: 100%;
    opacity: 0.9;
    transition: all 0.3s ease-in-out;
}

.payment-swish:hover {
    transform: scale(1.02);
    opacity: 1;
}

label {
    display: block;
    margin-bottom: 10px;
}

input[type="text"] {
    width: 100%;
    padding: 10px;
    margin-bottom: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.15);
}

button[type="submit"] {
    background-color: #4CAF50;
    color: #fff;
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.15);
}

button[type="submit"]:hover {
    background-color: #3e8e41;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.25);
}
</style>