<template>

    <div class="basket-container  p-3 d-flex flex-row align-content-center m-1">
        <div class="img-name-container d-flex flex-grow-1">
            <img :src="foodItem.data.img" class="img-fluid" alt="Food Item Image">
            <h5 class="">{{ foodItem.data.name }}</h5>
        </div>
        <div class="price-container d-flex justify-content-around flex-grow-1">
            <div v-if="!readonly" class="item-count-container d-flex align-items-center">
                <button class="btn btn-secondary btn-sm" @click="decrementItemCount()" >-</button>
                <input type="number" v-model="itemCount" class="form-control form-control-sm text-center"
                    :style="[removeTheArrowUpAndDownFromMozillaBrowsers]" style="width: 60px;" placeholder="666"
                    disabled />
                <button class="btn btn-secondary btn-sm" @click="incrementItemCount()" >+</button>
            </div>
            <div v-if="readonly" class="item-count-container d-flex align-items-center">
                <input type="number" v-model="itemCount" class="form-control form-control-sm text-center"
                    :style="[removeTheArrowUpAndDownFromMozillaBrowsers]" style="width: 60px;" placeholder="666"
                    disabled />
            </div>

            <div v-if="foodItem.data.price.priceIsLowered" class="left-price-lowered d-flex m-2">
                <p class="text-decoration-line-through m-0 prev-price">{{ foodItem.data.price.prevPrice }}</p>
                <p class="m-0 current-price lowered">{{ foodItem.data.price.currentPrice }}</p>
            </div>
            <div v-else class="left-price d-flex m-2">
                <p class="m-0 current-price">{{ foodItem.data.price.currentPrice }}</p>
            </div>

            <div>
                <p style="font-size: 0.7rem;"> Total : {{ foodItem.count * foodItem.data.price.currentPrice }} </p>
            </div>
        </div>
    </div>

    <HorizontalLineComponent style="margin-bottom: 1rem;margin-top: 1rem; opacity: 0.5;"></HorizontalLineComponent>

</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import HorizontalLineComponent from '@/components/HorizontalLineComponent.vue'
export default {
    name: 'BasketFoodItemComponent',
    props: {
        foodItem: {
            type: Object,
            required: true
        },
        readonly: {
            type: Boolean,
            default: false
        }
    },
    components: {
        HorizontalLineComponent
    },
    data() {
        return {
            removeTheArrowUpAndDownFromMozillaBrowsers: "-moz-appearance: textfield;" // style is done this way to remove the warning that vs code gives, since that is hella annoying
        }
    },
    async created() {

    },
    async mounted() {

    },
    methods: {
        ...mapActions(['addToBasket', 'removeFromBasket']),
        incrementItemCount() {
            this.addToBasket(this.foodItem.data)
        },
        decrementItemCount() {
            this.removeFromBasket(this.foodItem.data)
        }
    },
    computed: {
        ...mapGetters(["alreadyInBasket", "basket"]),
        itemCount() {
            const item = this.basket.items.find(item => item.data.id === this.foodItem.data.id);
            return item ? item.count : 666;
        }
    }
}

</script>

<style scoped>
.basket-container {
    flex-wrap: nowrap;

    max-width: 800px;

    margin: 0 auto;

    background-color: #252E33;
}

.img-name-container {
    flex-basis: 40%;

}

.price-container {
    flex-basis: 60%;

    justify-content: space-between;

}

.item-count-container {
    flex-basis: 50%;

    margin-bottom: 0;

}

.img-fluid {
    max-width: 50px;
    height: auto;
    margin: 10px;

    object-fit: contain;

}

@media (max-width: 480px) {
    .basket-container {
        font-size: 14px;
    }

    .img-name-container {
        flex-basis: 100%;
        flex-direction: column;
    }

    .img-name-container h5 {
        margin-top: 0;
        font-size: 16px;

    }

    .img-fluid {
        max-width: 30px;
        object-fit: contain;
    }

    .price-container {
        flex-basis: 100%;
        margin-top: 10px;
        flex-flow: column;
        text-align: center;
    }
}

.prev-price {
    font-size: 0.75em;
}

.current-price {
    font-size: 1.5em;
}

.lowered {
    color: red;
}
</style>
