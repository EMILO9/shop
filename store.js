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
           let check = state.Cart.some(item => item.ID === payload.ID)
           if (!check) {
               state.Cart.push(payload)
               Vue.notify({
                group: 'foo',
                title: `ADDED ${payload.GUN} | ${payload.SKIN} (${payload.CONDITION}) TO THE CART!`,
                type: 'success'
              })
           }
           else {
            Vue.notify({
                group: 'foo',
                title: `ITEM IS ALREADY ADDED TO THE CART!`,
                type: 'error'
              }) 
           }
        },
        removeItem (state, payload) {
            state.Cart.splice(state.Cart.indexOf(payload), 1)
        },
        setFilter (state, payload) {
            if (payload.type === 'WEAPONS') {
                let result = []
                state.Filters.Weapon = payload.value
                let findSkinsForWeapon = state.Products.filter(p => p.GUN.includes(state.Filters.Weapon))
                findSkinsForWeapon.map(item => {
                    let check = result.some(x => x.SKIN === item.SKIN)
                    if (!check) result.push(item)
                })
                state.skinsForWeapon = result
            }
            if (payload.type === 'SKINS') state.Filters.Skin = payload.value
            if (payload.type === 'CONDITION') state.Filters.Condition = payload.value
        }
    }
  })