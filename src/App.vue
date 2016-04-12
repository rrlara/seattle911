<template>

        <div class="wrapper">

            <router-view
              transition-mode="out-in">
             </router-view>

            <div class="footer">
                <div class="toggle">
                    <!-- <div><a v-link="{ path: '/list'}">List</a></div>
                    <div><a v-link="{ path: '/map'}">Map</a></div> -->
                    <button class="mdl-button mdl-js-button">
                      <a ><i class="material-icons">home</i></a>
                    </button>
                    <button class="mdl-button mdl-js-button" >
                      <a v-link="{ path: '/list'}"><i class="material-icons">view_list</i></a>
                    </button>
                    <button class="mdl-button mdl-js-button" >
                      <a v-link="{ path: '/map'}"><i class="material-icons">map</i></a>
                    </button>
                    <button class="mdl-button mdl-js-button">
                      <a ><i class="material-icons" @click="getMyLocation()">near_me</i></a>
                       <!-- <a ><i class="material-icons">location_searching</i></a> -->
                    </button>
                    <button class="mdl-button mdl-js-button">
                      <a ><i class="material-icons">share</i></a>
                    </button>
                </div>
            </div>
        </div>

 </template>

 <script>
    import store from './vuex/store.js'

    export default {
        name: "App",

          computed: {
            currentLocation: () => { 
                return store.state.myCurrentLocation
            }
        },

        created(){
            
            this.getData();

            this.getMyLocationFromStore();

        },

        ready() {
            // this.getData();
            var self = this;
            
            setInterval(function() {
                self.getData();
            }, 60000);

            
        },
        methods: {
            // note that we need `this` here so we can clear out the value
            // once the ADDTASK mutation has been dispatched, so we need to
            // use a traditional function structure instead of an arrow function.
            getData: function() {
                store.dispatch('GETCALLDATA')
            },
            getMyLocation: function(){
                this.$broadcast('get-my-location')
            },
            getMyLocationFromStore: function(){
                store.dispatch('GETMYLOCATION')
            }
        }
    
    }
</script>

 <style lang="css">

 html, body {
    height: 100%;
    margin: 0;
    padding: 0;
}

 .wrapper {
    display: table;
    width: 100%;
    height: 100%;
}

.header, .content, .footer {
    display: table-row;
}

.header {
    height: 0px;
    background: #eee;
}
.footer {
    height: 40px;
    background: #eee;
}

.inner {
    height: 100%;
    overflow: auto;
}

.toggle{
    width: 100%;
    position: relative;
    text-align: center;
}


.details{
    height: 0px;
    background-color: #eee;
    width: 100%;
    /*transform: matrix(1,0,0,1,0,-100);*/
    /*transition: transform .3s cubic-bezier(0.165,.84,.44,1);*/

    -webkit-transition: height .4s cubic-bezier(0.25, .8, .25, 1);
    -moz-transition: height .4s cubic-bezier(0.25, .8, .25, 1);
    -o-transition: height .4s cubic-bezier(0.25, .8, .25, 1);
    transition: height .4s cubic-bezier(0.25, .8, .25, 1);
}

.details.visible{
    height: 250px;
    width: 100%;

    -webkit-transition: height .4s cubic-bezier(0.25, .8, .25, 1);
    -moz-transition: height .4s cubic-bezier(0.25, .8, .25, 1);
    -o-transition: height .4s cubic-bezier(0.25, .8, .25, 1);
    transition: height .4s cubic-bezier(0.25, .8, .25, 1);
}

button i{
    color: #fffff;
}

 



</style>