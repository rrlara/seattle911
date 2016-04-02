<template>
    
    <div class="header">
        <div class="details" :class="{'visible': showDetails }">
          <details v-if="showDetails"></details>
        </div>
    </div>

    <div class="content">
        <div class="inner">
            
          <div class="mobile-list-item" v-for="item in list.features" @click="pushToDetails(item), showDetails = true">
          {{item.properties.Address}}<br>
          {{ item.properties.DateTime | moment "from" "now"}}<br>
          {{ item.properties.CallStatus}}<br>
          {{ item.properties.Type}}
          </div>
        </div>
    </div>
</template>
<script>
    import store from '../vuex/store.js'
    import GeoJSON from '../lib/geojson'
    import details from './details.vue'

    var map;

    export default {
        name: "List",

        components:{
          details
        },

        data () {
          return {
            showDetails: false
          }
        },


        computed: {
            list: () => { 
                return store.state.calls
            }
        },
        ready() {

            
       
        },
        methods: {
            pushToDetails: (item) => {
                store.dispatch('PUSHTODETAILS', item)
            }
        }

        
    }
</script>



<style lang="css">

.mobile-list {
    overflow:auto;
    position: relative;
    max-height: 614px;
    
  }
.mobile-list-item {
    display: -webkit-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-orient: horizontal;
    -webkit-box-direction: normal;
    -webkit-flex-direction: row;
    -ms-flex-direction: row;
    flex-direction: row;
    padding: 10px;
    border-top: 1px solid #e3e3e3;
}
    
</style>