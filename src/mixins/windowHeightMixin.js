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
  