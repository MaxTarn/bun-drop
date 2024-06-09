<template>
    <div :style="{ minHeight: windowHeightMinusNavbarAndFooter + 'px' }">
        <h1>Thanky you for the order!</h1>
        <h4>Estimated time of arrival : {{ this.randomTimeInterval() }}</h4>
        <div class="item-count-container d-flex align-items-center flex-column">
            <BasketFoodItemComponent class="basket-food-item" :food-item="foodItem"
                v-for="(foodItem, index) in basket.items" v-bind:key="index" :readonly="true"></BasketFoodItemComponent>
        </div>
    </div>
</template>

<script>
import windowHeightMixin from '@/mixins/windowHeightMixin';
import BasketFoodItemComponent from '@/components/BasketFoodItemComponent.vue';
import { mapActions, mapGetters } from 'vuex';

export default {
    name: 'conformationView',
    mixins: [windowHeightMixin],
    data() {
        return {
        }
    },
    components: {
        BasketFoodItemComponent
    },
    methods: {
        ...mapActions(['addToBasket', 'removeFromBasket', 'clearBasket']),
        randomTimeInterval() {
            //just because it is funny to order food and 
            const oneDay = 1440;        //1 day (1440 minutes) 
            const sevenDays = 10080;    // 7 days (10080 minutes)
            const randomMinutes = Math.floor(Math.random() * (sevenDays - oneDay + 1)) + 1440;

            //math
            const days = Math.floor(randomMinutes / 1440);
            const hours = Math.floor((randomMinutes % 1440) / 60);
            const minutes = randomMinutes % 60;

            
            return `${days} days ${hours} hours ${minutes} min`;
        }
    },
    computed: {
        ...mapGetters(['basket', 'alreadyInBasket'])
    },
    created() {
        console.log("Created:", this.basket);
    },
    mounted() {
        console.log("Mounted: ", this.basket);
    },
    beforeRouteLeave(to, from, next) {
        this.$store.dispatch('clearBasket');
        next();
    }

}
</script>

<style scoped>
.item-count-container {
    display: flex;
    flex-direction: column;
    align-items: stretch;
}

.basket-food-item {
    flex: 1;
}
</style>
