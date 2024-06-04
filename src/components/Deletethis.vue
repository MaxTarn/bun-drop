<template>
    <div v-if="foodItem" class="food-item">
      <div class="card">
        <img :src="foodItem.img" :alt="foodItem.name" class="food-item-image">
        <p>Type: {{ foodItem.type }}</p>

        <div class="card-body">
          <h5 class="card-title">{{ foodItem.name }}</h5>
          <p class="card-text">Type: {{ foodItem.type }}</p>
          <p v-if="foodItem.price" class="card-text">Price: ${{ foodItem.price.currentPrice }}</p>
          <p v-if="foodItem.price && foodItem.price.prevPrice" class="card-text">Previous Price: ${{ foodItem.price.prevPrice }}</p>
          <p v-if="foodItem.ingredients.length" class="card-text">Ingredients:</p>
          <ul v-if="foodItem.ingredients.length" class="card-text">
            <li v-for="(ingredient, index) in foodItem.ingredients" :key="index">{{ ingredient }}</li>
          </ul>
          <p v-else class="card-text">No ingredients listed</p>
        </div>
      </div>
    </div>
    <div v-else>Loading...</div>
  </template>
  
  <script>
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
        foodItem: null
      };
    },
    async created() {
      try {
        const response = await fetch(`http://localhost:3000/menu-data?id=${this.itemId}`);
        const data = await response.json();
        // Check if data is an array and extract the first item
        this.foodItem = Array.isArray(data) ? data[0] : data;
      } catch (error) {
        console.error('Error fetching food item:', error);
      }
    }
  };
  </script>
  
  <style scoped>
  .food-item {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  
  .card {
    width: 300px; /* Adjust the width as needed */
    margin: 20px;
  }
  
  .card-img-top {
    object-fit: cover;
  }
  </style>
  