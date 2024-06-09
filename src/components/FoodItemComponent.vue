<template>
  <div v-if="foodItem" class="food-item card">
    <h3 class="title">{{ foodItem.name }}</h3>
    <img :src="foodItem.img" alt="">

    <div class="ingredients d-flex align-content-center m-0">
      <p>{{ type }}</p>
    </div>
    <div class="price-and-add-container d-flex justify-content-between">
      <div class="left-column d-flex justify-content-center align-items-center" style="width: 50%;">
        <div v-if="foodItem.price.priceIsLowered" class="left-price-lowered d-flex">
          <p class="text-decoration-line-through m-0 prev-price">{{ foodItem.price.prevPrice }}</p>
          <p class="m-0 current-price lowered">{{ foodItem.price.currentPrice }}</p>
        </div>
        <div v-else class="left-price d-flex">
          <p class="m-0 current-price">{{ foodItem.price.currentPrice }}</p>
        </div>
      </div>
      <div v-if="!this.isInBasket" class="right-column d-flex justify-content-center align-items-center"
        style="width: 50%;">
        <button class="btn btn-success" @click="addToBasket(foodItem)">Add</button>
      </div>
      <div v-else class="right-ropw d-flex align-items-center" style="width: 50%;">
        <div class="item-count-container d-flex">
          <button class="btn btn-secondary" @click="decrementItemCount(foodItem)">-</button>
          <input type="number" v-model="itemCount" class="form-control"
            :style="[removeTheArrowUpAndDownFromMozillaBrowsers]" style="width: 60px; text-align: center;"
            placeholder="666" disabled />
          <button class="btn btn-secondary" @click="incrementItemCount(foodItem)">+</button>
        </div>
      </div>
    </div>
    <div v-if="user">
  <button type="button" class="btn " @click="toggleFavorite">
    <i :class="isFavorite ? 'fas fa-star text-warning' : 'far fa-star text-warning'"></i>
  </button>
</div>

  </div>
  <div v-else>Loading...</div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';


export default {
  name: 'FoodItemComponent',
  props: {
    itemId: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      foodItem: null,
      type: null,
      removeTheArrowUpAndDownFromMozillaBrowsers: "-moz-appearance: textfield;"  // style is done this way to remove the warning that vs code gives, since that is hella annoying
    };
  },
  async created() {
    try {
      const response = await fetch(`http://localhost:3000/menu-data?id=${this.itemId}`);
      const data = await response.json();
      this.foodItem = Array.isArray(data) ? data[0] : data;
      this.type = this.foodItem.type;
    } catch (error) {
      console.error('Error fetching food item:', error);
    }
  },
  methods: {
    ...mapActions(['addToBasket', 'removeFromBasket', 'addToFavorites', 'removeFromFavorites', 'logOut']),
    toggleFavorite() {
      if (this.isFavorite) {
        this.removeFromFavorites(this.itemId);
      } else {
        this.addToFavorites(this.itemId);
      }
    },
    incrementItemCount() {
      this.addToBasket(this.foodItem)
    },
    decrementItemCount() {
      this.removeFromBasket(this.foodItem)
    }
  },
  computed: {
    ...mapGetters(['alreadyInBasket', 'basket', 'user']),
    isInBasket() {
      return this.alreadyInBasket(this.foodItem)
    },
    isFavorite() {
      return this.user.favorites.includes(this.itemId);
    },
    itemCount() {
      const item = this.basket.items.find(item => item.data.id === this.foodItem.id);
      return item ? item.count : 0;
    }
  },
};
</script>



<style scoped>
.food-item {
  background-color: #252E33;
  color: white;
  padding: 5%;
  margin: 2%;
}

.price-and-add-container {
  margin-top: 5%;
  margin-bottom: 5%;
}

.title {
  padding-left: 5%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: 1.1em;
}

.ingredients {
  margin: 0;
  padding: 0;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: auto;
  width: 80%;
  justify-content: center;
  font-size: 0.9em;
  background-color: #1F282C;
  padding: 8% 5% 10% 5%;
  transform: translate(10%, 0);
  text-align: center;
  position: relative;
}

.more-indicators {
  grid-column: 2 / span 1;
  justify-self: end;
  align-self: end;
  font-size: 1.2em;
  padding-right: 5%;
  transform: translate(0%, -20%);
  opacity: 0.6;
  position: absolute;
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
