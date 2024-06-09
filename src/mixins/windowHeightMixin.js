//dynamically calculates the height that a View needs to be to fill in the entire screen
//and also subtracts the height of the navbar and footer
export default {
    data() {
      return {
        windowHeight: window.innerHeight,
        navbarHeight: 0,
        footerHeight: 0
      };
    },
    computed: {
      windowHeightMinusNavbarAndFooter() {
        return this.windowHeight - (this.navbarHeight + this.footerHeight);
      }
    },
    mounted() {
      this.initNavbarFooter();
    },
    methods: {
      updateWindowHeight() {
        this.windowHeight = window.innerHeight;
      },
      initNavbarFooter() {
        this.navbarHeight = document.querySelector('.navbar').offsetHeight;
        this.footerHeight = document.querySelector('.footer').offsetHeight;
        window.addEventListener('resize', this.updateWindowHeight);
      }
    }
  };
  