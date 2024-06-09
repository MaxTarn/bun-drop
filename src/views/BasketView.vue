<template>
    <div class="basket-view" :style="{ minHeight: windowHeightMinusNavbarAndFooter + 'px' }">
        <div class="home-view" >

            <BasketFoodItemComponent :food-item="foodItem" v-for="(foodItem, index) in basket.items" v-bind:key="index">
            </BasketFoodItemComponent>

        </div>
        <BasketSummaryComponent ></BasketSummaryComponent>
    </div>

</template>

<script>
import windowHeightMixin from '@/mixins/windowHeightMixin';
import { mapActions, mapGetters } from 'vuex';
import BasketFoodItemComponent from '@/components/BasketFoodItemComponent.vue';
import BasketSummaryComponent from "@/components/BasketSummaryComponent.vue"


export default {
    name: 'basketView',
    mixins: [windowHeightMixin],
    data() {
        return {
            menuData: {},
        }
    },
    components: {
        BasketFoodItemComponent,
        BasketSummaryComponent
    },
    methods: {
        ...mapActions(['addToBasket', 'removeFromBasket']),
    },
    computed: {
        ...mapGetters(['basket', 'alreadyInBasket'])
    },
    async created() {

        console.log("BasketView: ", this.basket);
    }
};
</script>

<style scoped>
.splash-title {
    font-size: 5rem;
    color: white;
}
.basket-view{
    display: flex;
    align-items: center;
    width: 100%;
    flex-flow: column nowrap;
    background-color: #35434a;
}

.home-view {
    background-color: #35434A;
    display: flex;
    flex-flow: column nowrap;
    justify-content: center;
    align-content: center;
}

.btn-custom {
    background-color: #93DC5C;
    color: white;
    font-weight: bold
}
@media (max-width: 480px) {
    .basket-view{
        flex-flow: column nowrap;
    }
}
</style>