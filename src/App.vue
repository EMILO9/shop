<template>
  <div id="app">
    <div class="Wrapper">
    <div class="Header">
      <div class="Logo">IDUNNO</div>
        <div class="Menu">
          <button :class="{red: $route.path === '/'}" class="btnMenu hover"  @click="goToShop"><i class="fas fa-store"></i> SHOP</button>
          <button :disabled="$route.path !== '/'" :class="{red: filterOn}" @click="filterOn = !filterOn" class="btnMenu hover"><i class="fas fa-cog"></i> FILTERS</button>
          <button :class="{red: $route.path === '/cart'}" class="btnMenu hover" @click="goToCart"><i class="fas fa-shopping-cart"></i> CART ({{cartAmount()}})</button>
          <button :class="{red: $route.path === '/profile'}" class="btnMenu hover" @click="goToProfile"><i class="fas fa-user"></i> THELEGEND27</button>
        </div>
    </div>
    <div class="Content">
       <transition name="fade" mode="out-in">
      <router-view/>
       </transition>
    </div>
    <div class="Footer">Copyright © 2020 by idunno</div>
    </div>
    <notifications group="foo" position="bottom right" style="font-family: 'Source Sans Pro', sans-serif;" />
    <div class="Filters" v-if="filterOn">
      <select ref="Weapon" class="filterSet" @change="setFilter('WEAPONS', $event)" name="WEAPON">
        <option value="">ALL WEAPONS</option>
        <option v-for="(w, index) in Weapons" :key="w+index" :value="w">{{w}} ({{weaponCount(w)}})</option>
      </select>
      <select ref="Skin" class="filterSet" @change="setFilter('SKINS', $event)" name="SKIN">
        <option value="">ALL SKINS</option>
        <option :value="c.SKIN" v-for="(c, index) in skinsForWeapon" :key="c+index">{{c.SKIN}} ({{skinCount(c.SKIN)}})</option>
      </select>
      <select ref="Condition" class="filterSet" @change="setFilter('CONDITION', $event)" name="CONDITION">
        <option value="">ALL CONDITIONS</option>
        <option value="FACTORY NEW">FACTORY NEW</option>
        <option value="MINIMAL WEAR">MINIMAL WEAR</option>
        <option value="FIELD-TESTED">FIELD-TESTED</option>
        <option value="WELL-WORN">WELL-WORN</option>
        <option value="BATTLE-SCARRED">BATTLE-SCARRED</option>
      </select>
      <input class="filterSet" type="text" placeholder="MIN PRICE" v-model="Filters.MinPrice">
      <input class="filterSet" type="text" placeholder="MAX PRICE" v-model="Filters.MaxPrice">
      <button class="filterSet" style="cursor:pointer" @click="Reset">RESET</button>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'App',
  data () {
    return {
      filterOn: false
    }
  },
  computed: {
    ...mapGetters([
      'Cart',
      'skinsForWeapon',
      'Filters',
      'Weapons',
      'Products'
    ])
  },
  methods: {
    goToCart () {
      this.filterOn = false
      this.$router.push('cart')
    },
    goToShop () { this.$router.push('/') },

    goToProfile () { this.$router.push('profile') },

    setFilter (type, event) {
      this.$store.commit('setFilter', {type: type, value: event.target.value})
    },
    Reset () {
      let filter = this.Filters
      filter.Weapon = ''
      filter.Skin = ''
      filter.Condition = ''
      filter.MinPrice = 0
      filter.MaxPrice = 99999
      this.$refs.Weapon.value = ''
      this.$refs.Skin.value = ''
      this.$refs.Condition.value = ''
    },
    cartAmount () {
      let result = this.Cart.length <= 99 ? this.Cart.length : '99+'
      return result
    },
    weaponCount (myGun) {
      let count = this.Products.filter(item => item.GUN.includes(myGun)).length
      return count
    },
    skinCount (skin) {
      let count = this.Products.filter(item => item.SKIN.includes(skin)).length
      return count
    }
  }
}
</script>
