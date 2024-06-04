import { createStore } from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import Cookies from 'js-cookie'

export default createStore({
    state: {
        basket: {
            totalCount: 0,
            totalPrice: 0,
            totalSaving: 0,
            items: []
        }
    },
    getters: {
        alreadyInBasket: (state) => (foodItem) => {
            return state.basket.items.some((item) => item.data.id === foodItem.id);
        },
        basket: (state) => state.basket
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
        }
    },
    plugins: [createPersistedState({
        storage: {
            getItem: (key) => Cookies.get(key),
            setItem: (key, value) => Cookies.set(key, value, { expires: 3 }), // expires in 3 days
            removeItem: (key) => Cookies.remove(key)
        },
        paths: ['basket'] // only store the basket state
    })]
})