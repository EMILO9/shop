<template>
<div class="profilePage">
    <div class="profileOne">
        <div class="Avatar"></div>
        <div class="Info">
            <span class="Username">THELEGEND27</span>
            <input ref="tradeURL" type="url" class="tradeURL" placeholder="https://steamcommunity.com/tradeoffer/new/?partner=3669110&token=S4KiwskI">
            <button @click="withDraw" class="tradeURL hover" style="cursor: pointer">WITHDRAW</button>
        </div>
    </div>
    <div class="profileTwo">
            <div class="shopItem" v-for="(inv, index) in Inventory" :key="inv+index" :style="{ backgroundImage: 'url(' + inv.IMAGE + ')' }">
      {{inv.GUN}} | {{inv.SKIN}}
      <br>
      ({{inv.CONDITION}})
      <br>
      ${{inv.PRICE}}
    </div>
    </div>
</div>
</template>

<script>
import Vue from 'vue'
import { mapGetters } from 'vuex'
export default {
  name: 'Profile',
  data () {
    return {}
  },
  computed: {
    ...mapGetters([
      'Inventory'
    ])
  },
  methods: {
    withDraw () {
      if (this.Inventory.length > 0 && this.$refs.tradeURL.value.length > 0) {
        Vue.notify({
          group: 'foo',
          title: `ITEMS WILL ARRIVE SOON!`,
          type: 'success'
        })
        this.$store.commit('removeItemsFromInventory')
      } if (this.Inventory.length <= 0) {
        Vue.notify({
          group: 'foo',
          title: `NO ITEMS IN INVENTORY!`,
          type: 'error'
        })
      } else {
        Vue.notify({
          group: 'foo',
          title: `YOU NEED TO SET YOUR TRADEURL!`,
          type: 'error'
        })
      }
    }
  }
}
</script>
