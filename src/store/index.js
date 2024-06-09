import { createStore } from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import Cookies from 'js-cookie'


//god i fuckin hate vuex 
//why so goddammed complicated???
//why TWO fuckin functions for one function???
//should have gone with Pinia and not vuex
export default createStore({
    state: {
        basket: {
            totalCount: 0,
            totalPrice: 0,
            totalSaving: 0,
            items: []
        },
        user: null
    },
    getters: {
        alreadyInBasket: (state) => (foodItem) => {
            return state.basket.items.some((item) => item.data.id === foodItem.id);
        },
        basket: (state) => state.basket,
        user: (state) => state.user
    },
    mutations: {
        ADD_TO_BASKET(state, foodItem) {
            const existingItemIndex = state.basket.items.findIndex(item => item.data.id === foodItem.id)

            if (existingItemIndex === -1) {
                console.log("added new");
                state.basket.items.push({ data: foodItem, count: 1 })
            } else {
                console.log("increased count");
                state.basket.items[existingItemIndex].count++
            }
            state.basket.totalCount++
            state.basket.totalPrice += Number(foodItem.price.currentPrice)
            if (foodItem.price.priceIsLowered) {
                state.basket.totalSaving += (foodItem.price.prevPrice - foodItem.price.currentPrice)
            }

            console.log(state.basket);
        },
        REMOVE_FROM_BASKET(state, foodItem) {
            const existingItemIndex = state.basket.items.findIndex(item => item.data.id === foodItem.id)

            if (existingItemIndex === -1) return

            const item = state.basket.items[existingItemIndex]

            if (item.count > 1) {
                item.count--
                state.basket.totalCount--
                state.basket.totalPrice -= Number(foodItem.price.currentPrice)
                if (foodItem.price.priceIsLowered) {
                    state.basket.totalSaving -= (foodItem.price.prevPrice - foodItem.price.currentPrice)
                }
            } else {
                state.basket.items.splice(existingItemIndex, 1)
                state.basket.totalCount -= item.count
                state.basket.totalPrice -= Number(foodItem.price.currentPrice) * item.count
                if (foodItem.price.priceIsLowered) {
                    state.basket.totalSaving -= (foodItem.price.prevPrice - foodItem.price.currentPrice) * item.count
                }
            }
        },
        CLEAR_BASKET(state) {
            state.basket.items = []
            state.basket.totalCount = 0
            state.basket.totalPrice = 0
            state.basket.totalSaving = 0
        },
        SET_USER(state, user) {
            state.user = user
        }
    },
    actions: {
        async addToBasket({ commit }, givenFoodItem) {
            try {

                console.log(givenFoodItem);
                commit('ADD_TO_BASKET', givenFoodItem)

            } catch (error) {
                console.error('Error adding to basket:', error)
            }
        },
        removeFromBasket({ commit }, foodItemId) {
            commit('REMOVE_FROM_BASKET', foodItemId)
        },
        clearBasket({ commit }) {
            commit('CLEAR_BASKET')
        },
        async logIn({ commit }, { username, password }) {
            try {
                const response = await fetch('http://localhost:3000/users');
                if (!response.ok) {
                    throw new Error(`ERROR: response from db was invalid: ${response.status}`);
                }
                const users = await response.json();
                const user = users.find(user => user.userName === username && user.password === password);
                commit('SET_USER', user || null);
            } catch (error) {
                console.error('Error logging in:', error);
                commit('SET_USER', null);
            }
        }, 
        async addToFavorites({ state, commit }, foodItemId) {
            try {
                const updatedUser = { ...state.user, favorites: [...state.user.favorites, foodItemId] };
                const response = await fetch(`http://localhost:3000/users/${state.user.id}`, {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(updatedUser)
                });
        
                if (!response.ok) {
                    throw new Error(`ERROR: response from db was invalid: ${response.status}`);
                }
        
                const returnedUser = await response.json();
                commit('SET_USER', returnedUser);
            } catch (error) {
                console.error('Error adding to favorites:', error);
            }
        },
        
        async removeFromFavorites({ state, commit }, foodItemId) {
            try {
                const updatedUser = { ...state.user, favorites: state.user.favorites.filter(id => id !== foodItemId) };
                const response = await fetch(`http://localhost:3000/users/${state.user.id}`, {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(updatedUser)
                });
                if (!response.ok) {
                    throw new Error(`ERROR: response from db was invalid: ${response.status}`);
                }
        
                const returnedUser = await response.json();
                commit('SET_USER', returnedUser);
            } catch (error) {
                console.error('Error removing from favorites:', error);
            }
        },
        logOut({ commit }) {
            commit('SET_USER', null);
          }
    },
    plugins: [createPersistedState({
        storage: {
            getItem: (key) => Cookies.get(key),
            setItem: (key, value) => Cookies.set(key, value, { expires: 3, sameSite: 'None', secure: true }), // expires in 3 days
            removeItem: (key) => Cookies.remove(key)
        },
        paths: ['basket', 'user'] // only store the basket state
    })]
})