<template>
    <div class="payment-card container py-3 border shadow-lg bg-white rounded">
        <h2 class="mb-3 text-black">Enter Card Details</h2>
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
                <label for="cardNumber" class="form-label">Card Number:</label>
                <input type="text" class="form-control" id="cardNumber" v-model="cardNumber"
                    placeholder="1234 5678 9012 3456" @input="validateCardNumber">
            </div>
            <div class="col-md-6">
                <label for="expirationDate" class="form-label">Expiration Date:</label>
                <div class="row">
                    <div class="col">
                        <input type="text" class="form-control" id="expirationMonth" v-model="expirationMonth"
                            placeholder="Month" @input="validateExpirationMonth">
                    </div>
                    <div class="col-auto">
                        <div class="input-group-text">/</div>
                    </div>
                    <div class="col">
                        <input type="text" class="form-control" id="expirationYear" v-model="expirationYear"
                            placeholder="Year" @input="validateExpirationYear">
                    </div>
                </div>
            </div>
            <div class="col-md-6">
                <label for="securityCode" class="form-label">Security Code:</label>
                <input type="text" class="form-control" id="securityCode" v-model="securityCode" placeholder="123"
                    @input="validateSecurityCode">
            </div>
            <div class="col-12">
                <button type="submit" class="btn btn-success">Pay {{ basket.totalPrice }} kr</button>
            </div>
            <div v-if="submitted && !validInputs()">{{ errorMessage }}</div>
        </form>
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

//removes all letters from string
String.prototype.removeAllLetters = function () { return this.replace(/[a-zA-Z]/g, ''); };
//removes all numbers from string
String.prototype.removeAllNumbers = function () { return this.replace(/\d/g, ''); };
//adds a space after each group of 4 numbers (not including if the group of 4 numbers does not have a following number)
String.prototype.addSpaceAfterFourDigits = function () { return this.replace(/(\d{4})(?=\d)/g, '$1 '); };


export default {
    name: 'PaymentCardComponent',
    data() {
        return {
            cardNumber: '',
            expirationMonth: '',
            expirationYear: '',
            securityCode: '',
            firstName: "",
            lastName: "",
            submitted: false,
            errorMessage: ''
        }
    },
    methods: {
        ...mapActions(['addToBasket', 'removeFromBasket']),
        handlePayment() {
            this.submitted = true;
            if (!this.validInputs()) {
                console.log(this.errorMessage);
                return;
            }
            console.log('Payment submitted:', {
                cardNumber: this.cardNumber,
                expirationDate: this.expirationMonth + "/" + this.expirationYear,
                securityCode: this.securityCode
            });
            // You can also emit an event to the parent component
            this.$emit('payment-submitted', {
                cardNumber: this.cardNumber,
                expirationDate: this.expirationMonth + "/" + this.expirationYear,
                securityCode: this.securityCode
            });
        },
        isValidCardNumber() {
            return /^\d{16}$/.test(this.cardNumber);
        },
        isValidExpirationDate() {
            const currentYear = new Date().getFullYear() % 100; // Get the last two digits of the current year
            const currentMonth = new Date().getMonth() + 1; // JavaScript months are 0-11(why???), so we add 1
            const expMonth = parseInt(this.expirationMonth);
            const expYear = parseInt(this.expirationYear);

            // Check if the month is between 1 and 12
            const isValidMonth = expMonth >= 1 && expMonth <= 12;

            // Check if the year is valid with the given month
            const isValidYear = expYear > currentYear || (expYear === currentYear && expMonth >= currentMonth);

            return isValidMonth && isValidYear;
        },
        isValidSecurityCode() {
            return /^\d{3}$/.test(this.securityCode);
        },
        validInputs() {
            this.errorMessage = '';

            if (!this.cardNumber) {
                this.errorMessage = 'Card number is required.';
                return false;
            }

            if (!this.isValidExpirationDate()) {
                this.errorMessage = 'Invalid expiration date.';
                return false;
            }

            if (!this.securityCode) {
                this.errorMessage = 'Security code is required.';
                return false;
            }

            // if we made it here, all inputs are valid
            return true;
        },
        validateCardNumber() {
            this.cardNumber = this.cardNumber.removeAllLetters();
            this.cardNumber = this.cardNumber.addSpaceAfterFourDigits();
            if (this.cardNumber.length > 19) { // 16 digits + 3 spaces
                this.cardNumber = this.cardNumber.slice(0, 19);
            }
        },
        validateExpirationMonth() {

            this.expirationMonth = this.expirationMonth.removeAllLetters();
            if (this.expirationMonth.length > 2) {
                this.expirationMonth = this.expirationMonth.slice(0, 2);
            }
        },
        validateExpirationYear() {
            this.expirationYear = this.expirationYear.removeAllLetters();
            if (this.expirationYear.length > 2) {
                this.expirationYear = this.expirationYear.slice(0, 2);
            }
        },
        validateSecurityCode() {
            this.securityCode = this.securityCode.removeAllLetters();
            if (this.securityCode.length > 3) {
                this.securityCode = this.securityCode.slice(0, 3);
            }
        },
    },
    computed: {
        ...mapGetters(['basket', 'alreadyInBasket'])
    },
}
</script>


<style scoped>
.payment-card {
    padding: 20px;
    border: 1px solid #ddd;
    min-width: 100%;
    opacity: 0.9;
    transition: all 0.3s ease-in-out;
}

.payment-card:hover {
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
    box-shadow: 0 2px 5px rgba(0,0,0,0.15);
}

button[type="submit"] {
    background-color: #4CAF50;
    color: #fff;
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    box-shadow: 0 2px 5px rgba(0,0,0,0.15);
}

button[type="submit"]:hover {
    background-color: #3e8e41;
    box-shadow: 0 2px 10px rgba(0,0,0,0.25);
}
</style>