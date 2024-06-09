<template>
    <div class="basket-summary  rounded shadow p-3 mb-5 rounded">
        <h1>Order Summary</h1>
        <p>{{basket.totalCount}} items in the basket</p>
        <p>{{ basket.totalPrice }} monies total</p>
        <BasketPaymentComponent @payment-method-chosen="onPaymentMethodChosen" :style="basketPaymentComponentStyle"></BasketPaymentComponent>
        <HorizontalLineComponent v-if="paymentMethodSet" style="margin-bottom: 2rem;"></HorizontalLineComponent>
        <PaymentCardComponent v-if="paymentMethodSet && (paymentMethod=== 'payment-card-visa' || paymentMethod === 'payment-card-mastercard')" @payment-submitted="onPaymentSubmitted"></PaymentCardComponent>
        <PaymentSwishComponent v-if="paymentMethodSet && paymentMethod === 'swish'" @payment-submitted="onPaymentSubmitted"></PaymentSwishComponent>
        
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import BasketPaymentComponent from "@/components/BasketPaymentComponent.vue"
import  PaymentCardComponent from "@/components/PaymentCardComponent.vue"
import HorizontalLineComponent from '@/components/HorizontalLineComponent.vue'
import PaymentSwishComponent from '@/components/PaymentSwishComponent.vue';
import { useRouter } from 'vue-router';

export default {

    name: 'BasketSummaryComponent',
    
    data() {
        return {
            paymentMethodSet : false,
            basketPaymentComponentStyle : "",
            paymentMethod : ""
            
        }
    },
    setup() {
        const router = useRouter();
        return { router };
    },
    components :{
        BasketPaymentComponent,
        PaymentCardComponent,
        HorizontalLineComponent,
        PaymentSwishComponent
        
    },
    methods: {
        ...mapActions(['addToBasket', 'removeFromBasket']),
        onPaymentMethodChosen(paymentMethod){
            this.paymentMethodSet = true
            this.paymentMethod = paymentMethod
            this.basketPaymentComponentStyle = "cursor:not-allowed; pointer-events:none;opacity:0.5;"
        },
        onPaymentSubmitted(paymentDetails){
            console.log("from basketSummaryComponent:", paymentDetails);
            this.router.push('/conformation');
        }
    },
    
    computed: {
        ...mapGetters(["alreadyInBasket", "basket"]),
        
    },
    mounted() {
        console.log(this.basket.totalPrice);
    }
}
</script>

<style scoped>
.basket-summary {
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
    opacity: 0.9;
}
@media (max-width: 768px) {
    .basket-summary {
        padding: 1rem;
    }
}

@media (min-width: 769px) {
    .basket-summary {
        padding: 3rem;
    }
}

</style>