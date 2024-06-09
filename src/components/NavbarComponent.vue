<template>
    <nav class="navbar navbar-expand-lg custom-background-color">
        <RouterLink class="navbar-brand" to="/">BUN DROP</RouterLink>
        <button class="navbar-toggler" type="button" @click="toggleMenu">
            <span class="navbar-toggler-icon"></span>
        </button>

        <div :class="['collapse', 'navbar-collapse', { show: isActive }]" id="navbarNav"
            class="justify-content-between">
            <ul class="navbar-nav mr-auto ">
                <li class="nav-item">
                    <RouterLink to="/" class="text-decoration-none">
                        <a class="nav-link" href="#">Home</a>
                    </RouterLink>
                </li>
                <li class="nav-item">
                    <RouterLink to="/Menu" class="text-decoration-none">
                        <a class="nav-link" href="#">Menu</a>
                    </RouterLink>
                </li>
                <!-- <li class="nav-item">
                    <a class="nav-link" href="#">About</a>
                </li> -->
            </ul>
            <ul class="navbar-nav ml-auto">
                <li class="nav-item mr-auto d-flex justify-content-center" style="border-radius: 10px;">
                    <RouterLink to="/Basket" class="nav-link shopping-cart-container ">
                        <img src="/Media/Images/SVG/shopping-cart-svgrepo-com.svg" class="shopping-cart-icon"
                            alt="Cart">
                        <div class="shopping-cart-amount-container">
                            <p class="shopping-cart-amount">{{ totalBasketCount }}</p>
                        </div>
                        <span>Kundvagn</span>
                    </RouterLink>
                </li>
                <li v-if="!user" class="nav-item">
                    <RouterLink to="/logIn" class="nav-link">Log in</RouterLink>
                </li>
                <li v-else class="nav-item">
                    <div class="dropdown">
                        <p style="padding-right: 10px; padding-left: 10px;" data-bs-toggle="dropdown"
                            aria-expanded="false">
                            Hey there, {{ user.userName }} 👋
                        </p>
                        <ul class="dropdown-menu">
                            <li><button class="dropdown-item text-dark" @click="logOut">Log out</button></li>
                            <li><button class="dropdown-item text-dark">Placeholder1</button></li>
                            <li><button class="dropdown-item text-dark">Placeholder2</button></li>
                        </ul>
                    </div>
                </li>
            </ul>
        </div>
    </nav>
</template>

<script>

import { mapActions, mapGetters } from 'vuex'; 
export default {
    name: 'NavbarComponent',
    data() {
        return {
            isActive: false
        }
    },
    methods: {
        ...mapActions(['logOut']),
        toggleMenu() {
            this.isActive = !this.isActive;
        }
    },
    computed: {
        ...mapGetters(['basket', 'user']),
        totalBasketCount() {
            return this.basket.totalCount
        }
    }
}
</script>

<style scoped>
* {
    color: white;
}

.shopping-cart-container {
    display: flex;
    align-items: center;
    justify-content: space-around;
    background-color: #1F282C;
    color: black !important;
    border-radius: 20px;
    padding: 0.5rem;
    color: white;
    width: 200px;
}

.shopping-cart-icon {
    width: 24px;
    height: 24px;
    margin-right: 0.5rem;
}

.shopping-cart-amount-container {
    background-color: green;
    border-radius: 50%;
    width: 30px;
    height: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-size: 0.75rem;
}

.shopping-cart-amount {
    margin-bottom: 0;
}

.custom-background-color {
    background-color: #2F3C42;
}

/* when width bigger than 768px adds some margin to the nav-bar brand (BUN DROP) that is on the left side of the navbar */
@media (min-width: 768px) {
    .navbar-brand {
        margin-left: 30px;
    }
}

.navbar-toggler-icon {
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 30 30' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath stroke='rgba%28255, 255, 255, 1%29' stroke-width='2' stroke-linecap='round' stroke-miterlimit='10' d='M4 7h22M4 15h22M4 23h22'/%3E%3C/svg%3E");
}
</style>
