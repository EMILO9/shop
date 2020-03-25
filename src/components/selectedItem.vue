<template>
  <div class="selectedItem">
      <div class="productImage" :style="{ backgroundImage: 'url(' + selectedProduct.IMAGE + ')' }"></div>
      <div class="Name">{{selectedProduct.GUN}} | {{selectedProduct.SKIN}} ({{selectedProduct.CONDITION}}) ${{selectedProduct.PRICE}}</div>
      <div class="Desc">{{selectedProduct.DESCRIPTION}}</div>
      <div class="addToCart" @click="addToCart(selectedProduct)">ADD TO CART</div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Vue from 'vue'
export default {
  name: 'selectedItem',
  data () {
    return {}
  },
  computed: {
    ...mapGetters([
      'selectedProduct'
    ])
  },
  methods: {
    addToCart (item) {
      this.$store.commit('addToCart', item)
      Vue.notify({
        group: 'foo',
        title: `ADDED ${item.GUN} | ${item.SKIN} (${item.CONDITION}) TO THE CART!`,
        type: 'success'
      })
    }
  }
}
</script>
