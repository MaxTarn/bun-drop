<template>
  <div class="search-box">
    
    <div class="button-group">
      <button @click="filterByType(-1)" class="sort-button">Everything</button>
      <button class="sort-button" v-for="(type, index) in types" :key="index" @click="filterByType(index)">
        {{ type.data.type }}
      </button>
    </div>
  </div>
</template>

<script>

export default {

  name: 'SearchBoxComponent',
  props: {
    menuFoodItems: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      localMenuFoodItems: [], // unsorted array of data from db
      types: [], // data to show in the dropdown
    };
  },
  methods: {
    searchQueryChanged() {
      this.updateDataFromDb().then(this.filterItems())
    },
    emitAllItems() {
      this.$emit('allItems', this.localMenuFoodItems);
    },
    async updateDataFromDb() {
      try {
        const response = await fetch("http://localhost:3000/menu-data");
        if (!response.ok) {
          throw new Error('Failed to fetch menu data');
        }
        const data = await response.json();
        this.localMenuFoodItems = data;
      } catch (error) {
        console.error('Error fetching menu data:', error);
      }
    },
    async updateMenuDataTypesFromDb() {
      try {
        const response = await fetch("http://localhost:3000/menu-data-types")
        if (!response.ok) {
          throw new Error('Failed to fetch menu data types');
        }
        const data = await response.json()

        data.forEach(type => {
          let obj = {
            data: type,
            prevState: "indeterminate",
            state: "unchecked"
          }
          this.types.push(obj)
        });
      } catch (err) {
        console.log("ERROR: failed to get data from db regarding menu data types")
      }
    },
    filterByType(index) {
      if(index === -1) return this.$emit('filteredItems', this.localMenuFoodItems);
      let selectedType = this.types[index].data.type;
      let filteredItems = this.localMenuFoodItems.filter(item => item.type === selectedType);
      this.$emit('filteredItems', filteredItems);
    },
  },
  async created() {
    await this.updateMenuDataTypesFromDb();
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

.sort-button {
  background-color: #4CAF50;
  /* Green */
  border: none;
  color: white;
  padding: 15px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 4px 2px;
  transition-duration: 0.4s;
  cursor: pointer;
}

.sort-button:hover {
  background-color: white;
  color: black;
  border: 2px solid #4CAF50;
}
</style>
