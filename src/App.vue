<template>
  <div id="app">
    <NavbarComponent></NavbarComponent>
    <router-view></router-view>
    <FooterComponent></FooterComponent>
  </div>
</template>

<script>
import NavbarComponent from './components/NavbarComponent.vue';
import FooterComponent from "./components/FooterComponent.vue"
import { mapState, mapActions } from 'vuex'

export default {
  name: 'App',
  components: {
    NavbarComponent,
    FooterComponent
  },
  data() {
    return {
      // basket: {
      //   totalCount: 0,
      //   totalPrice: 0,
      //   totalSaving: 0,
      //   items: []
      // }
    };
  },
  computed: {
    ...mapState(['basket'])
  },
  methods: {
    ...mapActions(['addToBasket', 'removeFromBasket'])
  }

}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: white;
  background-color: #2A353B;
}
</style>
