import Vue from 'vue'
import Vuex from 'vuex'
import Data from './src/assets/Data'

Vue.use(Vuex)

export const store = new Vuex.Store({
    state: {
        Products: Data.Products,
        selectedProduct: null,
        Cart: [],
        Filters: {
            Weapon: '',
            Skin: '',
            Condition: '',
            MinPrice: 0,
            MaxPrice: 99999
        },
        skinsForWeapon: []
    },
    getters: {
        Products: state => state.Products,
        selectedProduct: state => state.selectedProduct,
        Cart: state => state.Cart,
        Filters: state => state.Filters,
        skinsForWeapon: state => state.skinsForWeapon
    },
    mutations: {
        setSelected (state, payload) {
            state.selectedProduct = payload
        },
        addToCart (state, payload) {
            state.Cart.push(payload)
        },
        removeItem (state, payload) {
            state.Cart.splice(state.Cart.indexOf(payload), 1)
        },
        setFilter (state, payload) {
            if (payload.type === 'WEAPONS') {
                state.Filters.Weapon = payload.value
                let findSkinsForWeapon = state.Products.filter(p => p.GUN.includes(state.Filters.Weapon))
                state.skinsForWeapon = findSkinsForWeapon
            }
            if (payload.type === 'SKINS') state.Filters.Skin = payload.value
            if (payload.type === 'CONDITION') state.Filters.Condition = payload.value
        }
    }
  })