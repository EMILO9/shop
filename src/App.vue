<template>
  <div id="app">
    <div class="Wrapper">
    <div class="Header">
      <div class="Logo"></div>
        <div class="Menu">
          <button class="btnMenu hover" @click="goToShop"><i class="fas fa-store"></i> SHOP</button>
          <button class="btnMenu hover" @click="goToCart"><i class="fas fa-shopping-cart"></i> CART</button>
          <button @click="filterOn = true" class="btnMenu hover"><i class="fas fa-cog"></i> FILTERS</button>
        </div>
    </div>
    <div class="Content">
      <router-view/>
    </div>
    <div class="Footer"></div>
    </div>
    <notifications group="foo" position="bottom right" style="font-family: 'Source Sans Pro', sans-serif;" />
    <div class="Filters" v-if="filterOn">
      <div class="filterSet main" @click="filterOn = false">FILTERS <button class="filterSet" style="height: 100%; cursor: pointer;">CLOSE</button></div>
      <select class="filterSet" @change="setFilter('WEAPONS', $event)" name="WEAPON">
        <option value="">ALL WEAPONS</option>
        <option value="AWP">AWP</option>
        <option value="KARAMBIT">KARAMBIT</option>
        <option value="M9">M9</option>
        <option value="AK-47">AK-47</option>
      </select>
      <select class="filterSet" @change="setFilter('SKINS', $event)" name="SKIN">
        <option value="">ALL SKINS</option>
        <option :value="c.SKIN" v-for="(c, index) in skinsForWeapon" :key="c+index">{{c.SKIN}}</option>
      </select>
      <select class="filterSet" @change="setFilter('CONDITION', $event)" name="CONDITION">
        <option value="">ALL CONDITIONS</option>
        <option value="FACTORY NEW">FACTORY NEW</option>
        <option value="MINIMAL WEAR">MINIMAL WEAR</option>
        <option value="FIELD-TESTED">FIELD-TESTED</option>
        <option value="WELL-WORN">WELL-WORN</option>
        <option value="BATTLE-SCARRED">BATTLE-SCARRED</option>
      </select>
      <input class="filterSet" type="text" placeholder="MIN PRICE" v-model="Filters.MinPrice">
      <input class="filterSet" type="text" placeholder="MAX PRICE" v-model="Filters.MaxPrice">
      <button class="filterSet redd">FILTER</button>
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
      'Filters'
    ])
  },
  methods: {
    goToCart () {
      this.$router.push('cart')
    },
    goToShop () { this.$router.push('/') },

    setFilter (type, event) {
      this.$store.commit('setFilter', {type: type, value: event.target.value})
    }
  }
}
</script>
