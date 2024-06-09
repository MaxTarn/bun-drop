<template>
  <div class="basket-payment bg-dark text-light rounded shadow-lg p-3 mb-5">
    <h5>Choose Payment Method</h5>
    <form @submit.prevent="handlePaymentMethod">
      <label>
        <input type="radio" id="swish" value="swish" v-model="paymentMethod">
        Swish
      </label>
      <label>
        <input type="radio" id="card" value="payment-card-visa" v-model="paymentMethod">
        Visa
      </label>
      <label>
        <input type="radio" id="card" value="payment-card-mastercard" v-model="paymentMethod">
        MasterCard
      </label>
      <button type="submit" class="btn btn-light">Continue to Payment</button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      paymentMethod: ''
    }
  },
  methods: {
    handlePaymentMethod() {
      this.$emit('payment-method-chosen', this.paymentMethod);
    }
  }
}
</script>

<style scoped>
.basket-payment {
    opacity: 0.9;
    transition: all 0.3s ease-in-out;
    box-shadow: 0 4px 8px 0 rgba(255, 255, 255, 0.2), 0 6px 20px 0 rgba(255, 255, 255, 0.19);
}

.basket-payment:hover {
    transform: scale(1.02);
    opacity: 1;
}

label {
  display: block;
  margin-bottom: 10px;
  color: #fff;
}

input[type="radio"] {
  margin-right: 10px;
}
</style>