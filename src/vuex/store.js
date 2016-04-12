import Vue from 'vue'
import Vuex from 'vuex'

import Http from '../services/http'

Vue.use(Vuex)

import VueResource from 'vue-resource'
Vue.use(VueResource)

import GeoJSON from '../lib/geojson'


const state = {
    calls: [],
    showDetails: false,
    detailsData: null,
    myCurrentLocation: null

}

const mutations = {
    TOGGLECOMPLETE: (state, task) => {
        task.complete = !task.complete
    },
    ADDTASK: (state, task) => {
        let newTask = { description: task, complete: false}
        state.tasks.push(newTask)
    },
    ADDTASK: (state, task) => {
        let newTask = { description: task, complete: false}
        state.tasks.push(newTask)
    },
    PUSHTODETAILS: (state, item) => {
        state.detailsData = item;
        state.showDetails = true;
    },
    GETCALLDATA: (limit) => {
        // GET request
            var self = this;
            // var url = "https://data.seattle.gov/resource/kzjm-xkqj.json?$order=datetime DESC&$limit=20"
            var url = "http://gs-public911.appspot.com/calls"
          Vue.http({url: url, method: 'GET'}).then(function (response) {
              // success callback
              console.log(response.data);

              var realData = GeoJSON.parse(response.data, {Point: ['Latitude', 'Longitude'],
                  extra: {
                      'marker-size': "small",
                      'marker-color':"#3bb2d0",
                      'active': false,
                      'visible': true
                  }
              });

              console.log(realData);

              state.calls = realData

          }, function (response) {
              // error callback
          });
    },
    GETMYLOCATION: () => {
        // GET request
          // var self = this;

          function geo_success(position) {

            var self = this;

                    var loc = {
                        latitude: null,
                        longitude: null
                    }

                    loc.latitude = position.coords.latitude
                    loc.longitude = position.coords.longitude

                    console.log("log: ", loc);

                    state.myCurrentLocation = loc
                  
                }

                function geo_error() {
                  alert("Sorry, no position available.");
                }

                var geo_options = {
                  enableHighAccuracy: true, 
                  maximumAge        : 30000, 
                  timeout           : 27000
                };

                var wpid = navigator.geolocation.watchPosition(geo_success, geo_error, geo_options);
                // var wpid = navigator.geolocation.getCurrentPosition(geo_success, geo_error, geo_options);            
    }

}

const store = new Vuex.Store({
    state,
    mutations
})

module.exports = store