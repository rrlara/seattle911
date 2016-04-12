<template>
    
    <div class="header">
        <div class="details" :class="{'visible': showDetails }">
          <details v-if="showDetails"></details>
        </div>
    </div>

    <div class="content">
        <div class="inner">
            
          <div class="mobile-list-item" v-for="item in list.features" @click="pushToDetails(item), showDetails = true" :class="item.properties.IncidentNumber == activeDetail ? 'active': ''">
          {{item.properties.Address}}<br>
          {{ item.properties.DateTime | moment "from" "now"}}<br>
          {{ item.properties.CallStatus}}<br>
          {{ item.properties.Type}}<br>
          <span v-if="currentLocation">&nbsp;{{updateDistances(item)}}</span>
          </div>
        </div>
    </div>
</template>
<script>
    import store from '../vuex/store.js'
    import details from './details.vue'
    import Distance from '../utils/Distance'

    var map;

    export default {
        name: "List",

        components:{
          details
        },

        data () {
          return {
            showDetails: false,
            myLocation: null
          }
        },


        computed: {
            list: () => { 
                return store.state.calls
            },
            currentLocation: () => { 
                return store.state.myCurrentLocation
            },
            activeDetail: () => { 
                if(store.state.detailsData){
                    return store.state.detailsData.properties.IncidentNumber
                }
                
            }
        },
        ready() {

            
       
        },
        methods: {
            pushToDetails: (item) => {
                store.dispatch('PUSHTODETAILS', item)
            },
            updateDistances: function(call){
                var self = this;
                var callLocation = {
                    latitude: call.geometry.coordinates[1],
                    longitude: call.geometry.coordinates[0]
                }

                return Distance.getDistances(callLocation, this.currentLocation) + ' mi'
                // var orale = Distance.getDistances(callLocation, myLocationLoc);
                // console.log(orale);
            }
        },
        
        events: {

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

.active{
    border-left: 4px solid rgb(255,110,64);
}
    
</style>