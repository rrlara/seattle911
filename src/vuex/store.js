import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

import VueResource from 'vue-resource'
Vue.use(VueResource)

import GeoJSON from '../lib/geojson'


const state = {
    calls: [],
    showDetails: false,
    detailsData: null

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
    }

}

const store = new Vuex.Store({
    state,
    mutations
})

module.exports = store