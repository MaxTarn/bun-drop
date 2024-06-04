<template>
  <div class="home-view" :style="{ minHeight: windowHeightMinusNavbarAndFooter + 'px' }">
    <div class="btn-and-splash-container">
      <h1 class="splash-title" style="margin-bottom: 20px;">BUN DROP</h1>
      <RouterLink to="/Menu" class="">
        <button type="button" class="btn btn-custom">Go To Store</button>
      </RouterLink>
    </div>
  </div>
</template>

<script>
import windowHeightMixin from '@/mixins/windowHeightMixin';
export default {
  name: 'homeView',
  mixins :[windowHeightMixin]
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
.btn-custom{
  background-color: #93DC5C;
  color: white;
  font-weight: bold
}


</style>
