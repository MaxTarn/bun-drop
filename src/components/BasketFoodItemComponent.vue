<template>
    <div class="basket-container">
        <div>
            <!-- food item name and description -->
            <h5>{{ foodItem.name }}</h5>
            <p>{{ foodItem.description }}</p>
        </div>
        <div>
            <div class="item-count-container d-flex">
                <button class="btn btn-secondary" @click="decrementItemCount(foodItem)">-</button>
                <input type="number" v-model="itemCount" class="form-control"
                    :style="[removeTheArrowUpAndDownFromMozillaBrowsers]" style="width: 60px; text-align: center;"
                    placeholder="666" disabled />
                <button class="btn btn-secondary" @click="incrementItemCount(foodItem)">+</button>
            </div>
            <div class="price-container">
                <span>Price: {{ foodItem.data.currentPrice  }}</span>
            </div>
        </div>
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
export default {
    name: 'MyComponent',
    props: {
        foodItem: {
            type: Object,
            required: true
        }
    },
    data() {
        return {
            removeTheArrowUpAndDownFromMozillaBrowsers: "-moz-appearance: textfield;" // style is done this way to remove the warning that vs code gives, since that is hella annoying
        }
    },
    async created() {

    },
    methods: {
        ...mapActions(['addToBasket', 'removeFromBasket']),
        incrementCounter() {
            this.counter++
        },
        incrementItemCount() {
            this.addToBasket(this.foodItem)
        },
        decrementItemCount() {
            this.removeFromBasket(this.foodItem)
        }
    },
    computed: {
        ...mapGetters(["alreadyInBasket", "basket"]),
        itemCount() {
            const item = this.basket.items.find(item => item.data.id === this.foodItem.id);
            return item ? item.count : 0;
        }
    }
}

</script>

<style scoped>
.basket-container {
    max-height: 3rem;
    width: 50%;
}
</style>
