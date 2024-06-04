<template>
    <div class="home-view" :style="{ minHeight: windowHeightMinusNavbarAndFooter + 'px' }">
        <div v-for="(foodItem, index) in basket.items" v-bind:key="index">
            
            <BasketFoodItemComponent :food-item="foodItem"></BasketFoodItemComponent>
        </div>
    </div>
</template>

<script>
import windowHeightMixin from '@/mixins/windowHeightMixin';
import { mapActions, mapGetters } from 'vuex';
import BasketFoodItemComponent from '@/components/BasketFoodItemComponent.vue';


export default {
    name: 'basketView',
    mixins: [windowHeightMixin],
    data(){
        return{
            menuData : [],
        }
    },
    components : {
        BasketFoodItemComponent
    },
    methods : {
        ...mapActions(['addToBasket', 'removeFromBasket']),
    }, 
    computed :{
        ...mapGetters(['basket', 'alreadyInBasket'])
    },
    async created(){

    }
};
</script>

<style scoped>
.splash-title {
    font-size: 5rem;
    color: white;
}

.home-view {
    background-color: #35434A;
    display: flex;
    flex-flow: column nowrap;
    justify-content: space-evenly;
}

.btn-custom {
    background-color: #93DC5C;
    color: white;
    font-weight: bold
}
</style>