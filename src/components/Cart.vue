<template>
<div class="cartPage">
    <div class="totalPrice">TOTAL PRICE: ${{cartTotal}}</div>
    <div class="cartItems">
        <div class="cartItem" v-for="(c, index) in Cart" :key="c+index">
            <div class="pImage" :style="{ backgroundImage: 'url(' + c.IMAGE + ')' }"></div>
            <div class="Namef">
                {{c.GUN}} | {{c.SKIN}} ({{c.CONDITION}}) ${{c.PRICE}}
                <button class="btnRemove" @click="removeItem(c)">REMOVE</button>
            </div>
        </div>
    </div>
    <div class="Checkout" @click="checkout">CHECKOUT</div>
</div>
</template>

<script>
import Vue from 'vue'
import { mapGetters } from 'vuex'
export default {
  name: 'shopItems',
  data () {
    return {}
  },
  computed: {
    ...mapGetters([
      'Cart',
      'Inventory',
      'Products'
    ]),
    cartTotal () {
      var result = this.Cart.reduce((a, b) => a + b.PRICE, 0)
      return result
    }
  },
  methods: {
    removeItem (c) {
      this.$store.commit('removeItem', c)
      Vue.notify({
        group: 'foo',
        title: `DELETED ${c.GUN} | ${c.SKIN} (${c.CONDITION}) FROM THE CART!`,
        type: 'error'
      })
    },
    checkout () {
      if (this.Cart.length <= 0) {
        Vue.notify({
          group: 'foo',
          title: `NO ITEMS IN THE CART.`,
          type: 'error'
        })
      } else {
        for (let item of this.Cart) {
          this.Inventory.push(item)
          this.Products.map(x => {
            if (x.ID === item.ID) this.Products.splice(this.Products.indexOf(x), 1)
          })
        }
        this.$store.commit('resetCart')
        this.$router.push('profile')
      }
    }
  }
}
</script>
