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
          {{ item.properties.Type}}<br>
          <span v-if="myLocation">&nbsp;{{updateDistances(item)}}</span>
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
                console.log(call);
                var callLocation = {
                    latitude: call.geometry.coordinates[1],
                    longitude: call.geometry.coordinates[0]
                }

                var myLocationLoc = self.myLocation

                return Distance.getDistances(callLocation, this.myLocation) + ' km'
                // var orale = Distance.getDistances(callLocation, myLocationLoc);
                // console.log(orale);
            }
        },
        
        events: {
        'get-my-location': function () {
          
                
                
                var self = this;

                function geo_success(position) {

                    var loc = {
                        latitude: null,
                        longitude: null
                    }

                    loc.latitude = position.coords.latitude
                    loc.longitude = position.coords.longitude

                    self.myLocation = loc
                  
                }

                function geo_error() {
                  alert("Sorry, no position available.");
                }

                var geo_options = {
                  enableHighAccuracy: true, 
                  maximumAge        : 30000, 
                  timeout           : 27000
                };

                // var wpid = navigator.geolocation.watchPosition(geo_success, geo_error, geo_options);
                var wpid = navigator.geolocation.getCurrentPosition(geo_success, geo_error, geo_options);
                
                

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