<template>
  <div class="menu-view container" :style="{ minHeight: windowHeightMinusNavbarAndFooter + 'px' }">
    <SearchBoxComponent :menu-food-items="menuFoodItems"  @filtered-items="updateMenuData"></SearchBoxComponent>
    <div class="row justify-content-center">
      <div class="col-12 col-sm-6 col-md-4 col-lg-3 mb-4" v-for="item in menuData" :key="item.id">
        <FoodItemComponent :itemId="Number(item.id)" />
      </div>
    </div>
  </div>
</template>

<script>
import FoodItemComponent from "@/components/FoodItemComponent.vue";
import SearchBoxComponent from "@/components/SearchBoxComponent.vue";
import windowHeightMixin from "@/mixins/windowHeightMixin";

export default {
  name: 'MenuView',
  mixins: [windowHeightMixin],
  data() {
    return {
      menuData: [],
      menuFoodItems: [],
    };
  },
  components: {
    FoodItemComponent,
    SearchBoxComponent
  },
  async created() {
    try {
      const menuDataResponse = await fetch("http://localhost:3000/menu-data");

      if (!menuDataResponse.ok) {
        throw new Error('Failed to fetch menu or menu ingredients data');
      }
      this.menuFoodItems = await menuDataResponse.json();
      this.menuData = this.menuFoodItems;
    } catch (error) {
      console.error('Error fetching menu data:', error);
    }
  },
  methods: {
    updateMenuData(filteredItems) {
      // Update menuData with the filtered items received from SearchBoxComponent
      this.menuData = filteredItems;
    }
  }
}
</script>

<style scoped>
.menu-view {
  margin-top: 20px;
}

.menu-view .row {
  margin: 0;
}

.menu-view .col {
  display: flex;
  justify-content: center;
}
</style>
