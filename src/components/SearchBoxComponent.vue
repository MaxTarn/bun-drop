<template>
  <div class="search-box">
    <input v-model="searchQuery" type="text" placeholder="Search..." @input="searchQueryChanged">
    <button @click="updateDataFromDb">Search</button>

    <div class="dropdown">
      <button class="btn btn-primary dropdown-toggle" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown"
        aria-expanded="false">
        Ingredients
      </button>
      <ul class="dropdown-menu">
        <li v-for="(ingredient, index) in ingredients" :key="index">
          <div class="dropdown-item d-flex text-center align-content-center">
            <input type="checkbox" class="d-flex p-0" @click="ingredientToggleChange($event, index)">
            <p>{{ ingredient.data.name }}</p>
          </div>
        </li>
      </ul>
    </div>
    <p> {{ countOfItems }}</p>
  </div>
</template>

<script>

export default {

  name: 'SearchBoxComponent',
  props: {
    menuFoodItems: {
      type: Array,
      required: true
    },
    menuIngredients: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      countOfItems: 0,
      searchQuery: '',
      localMenuFoodItems: [], // unsorted array of data from db
      ingredients: [], // data to show in the dropdown
    };
  },
  methods: {
    searchQueryChanged() {
      this.updateDataFromDb().then(this.filterItems())
    },
    ingredientToggleChange(event, index) {
      //handles logic for having a three state checkbox    checked, not checked , indeterminate

      let target = event.target
      let currentState = this.ingredients[index].state;



      if (currentState === 'unchecked') {
        //from unchecked to checked
        this.ingredients[index].state = 'checked';
        this.ingredients[index].prevState = 'unchecked';
        target.checked = true
        target.indeterminate = undefined

      } else if (currentState === 'checked') {
        //from checked to inderterminate
        this.ingredients[index].state = 'indeterminate';
        this.ingredients[index].prevState = 'checked';

        target.checked = undefined
        target.indeterminate = true

      } else if (currentState === 'indeterminate') {
        // from inderterminate to unchecked
        this.ingredients[index].state = 'unchecked';
        this.ingredients[index].prevState = 'indeterminate';

        target.checked = false
        target.indeterminate = undefined
      }

      currentState = this.ingredients[index].state;

      //console.log(this.getIngredientSelections());
      this.filterItems()

    },
    getIngredientSelections() {
      //generates a object that contains parameters to filter the search results by excluding/including certain entries
      let selection = {
        mustHave: [],
        mustNotHave: []
      };

      this.ingredients.forEach(ingredient => {
        if (ingredient.state === 'checked') {
          selection.mustHave.push(ingredient);
        } else if (ingredient.state === 'indeterminate') {
          selection.mustNotHave.push(ingredient);
        }
      });

      return selection;
    },

    filterItems() {
      const query = this.searchQuery.trim().toLowerCase();
      const selectedIngredients = this.getIngredientSelections();

      const filteredItems = this.localMenuFoodItems.filter(item =>
        item.name.toLowerCase().trim().includes(query) &&
        this.checkItemIngredients(item.ingredients, selectedIngredients)
      );

      this.countOfItems = filteredItems.length;
      this.$emit('filtered-items', filteredItems);
    },
    checkItemIngredients(itemIngredients, selectedIngredients) {
      // Log selected ingredients for debugging
      

      // Extract names of must-have and must-not-have ingredients
      const mustHaveIngredientNames = selectedIngredients.mustHave.map(ingredient => ingredient.data.name);
      const mustNotHaveIngredientNames = selectedIngredients.mustNotHave.map(ingredient => ingredient.data.name);

      // If there are no must-have and must-not-have ingredients, return true
      if (mustHaveIngredientNames.length === 0 && mustNotHaveIngredientNames.length === 0) return true;

      // Check if all must-have ingredients are included in the itemIngredients
      const allMustHaveIncluded = mustHaveIngredientNames.every(ingredientName =>
        itemIngredients.includes(ingredientName)
      );

      // Check if no must-not-have ingredients are included in the itemIngredients
      const noMustNotHaveIncluded = !mustNotHaveIngredientNames.some(ingredientName =>
        itemIngredients.includes(ingredientName)
      );

      // Return true if all must-have ingredients are included and no must-not-have ingredients are included
      return allMustHaveIncluded && noMustNotHaveIncluded;
    },



    async updateDataFromDb() {
      try {
        const response = await fetch("http://localhost:3000/menu-data");
        if (!response.ok) {
          throw new Error('Failed to fetch menu data');
        }
        const data = await response.json();
        this.localMenuFoodItems = data;
        this.filterItems();
      } catch (error) {
        console.error('Error fetching menu data:', error);
      }
    },
    async updateMenuingredientsFromDb() {
      try {
        const response = await fetch("http://localhost:3000/menu-ingredients")
        if (!response.ok) {
          throw new Error('Failed to fetch menu data');
        }
        const data = await response.json()

        data.forEach(ingredient => {
          let obj = {
            data: ingredient,
            prevState: "indeterminate",
            state: "unchecked"
          }
          this.ingredients.push(obj)
        });
      } catch (err) {
        console.log("ERROR: failed to get data from db regarding menu ingredients")
      }
    }
  },
  async created() {
    await this.updateMenuingredientsFromDb();
    await this.updateDataFromDb()
  }
};
</script>

<style scoped>
.search-box {
  margin-bottom: 20px;
}

.search-box input {
  padding: 5px;
  margin-right: 10px;
}
</style>
