<template>
<div>
  <div class="shopItems">
    <div class="shopItem" @click="setSelected(item)" v-for="(item, index) in filteredProducts" :key="item+index" :style="{ backgroundImage: 'url(' + item.IMAGE + ')' }">
      {{item.GUN}} | {{item.SKIN}}
      <br>
      ({{item.CONDITION}})
      <br>
      ${{item.PRICE}}
    </div>
  </div>
  <div class="noFound" v-if="filteredProducts.length === 0">
    NO ITEMS FOUND.
  </div>
</div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'shopItems',
  data () {
    return {}
  },
  computed: {
    ...mapGetters([
      'Products',
      'Filters'
    ]),
    filteredProducts () {
      return this.Products.filter(item => item.GUN.includes(this.Filters.Weapon) && item.SKIN.includes(this.Filters.Skin) && item.CONDITION.includes(this.Filters.Condition) && item.PRICE <= this.Filters.MaxPrice && item.PRICE >= this.Filters.MinPrice)
    }
  },
  methods: {
    setSelected (item) {
      let getID = this.Products.indexOf(item) + 1
      this.$store.commit('setSelected', item)
      this.$router.push({ path: 'item', query: { id: getID } })
    }
  }
}
</script>
