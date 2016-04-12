<template>
    <!-- <div class="task-list" v-for="task in tasks"> -->
        <!-- <task :task="task" :store="store"></task> -->
        <!-- <div class="mobile-map">
        
        <div id='map'></div>

        </div> -->
        <div class="content">
        <div class="inner">
            
            <div id='map-large'></div>
          
        </div>
    </div>
</template>
<script>
    import store from '../vuex/store.js'
    import GeoJSON from '../lib/geojson'

    var map;

    var currentLocationPoint;

    export default {
        name: "Map",

        watch:{

            "currentLocation": function(){

              var self = this;

              var point = {
                "type": "Point",
                "coordinates": [self.currentLocation.longitude, self.currentLocation.latitude]
              };

              map.getSource('point').setData(point);


            }

        },

        computed: {
            tasks: () => { 
                return store.state.calls
            },
            currentLocation: () => { 
                return store.state.myCurrentLocation
            }
        },
        ready() {

            var self = this; 
                        
            mapboxgl.accessToken = 'pk.eyJ1IjoicnJsYXJhIiwiYSI6IjNjSlJmUkkifQ.PlJc5PGK-7-EDMmsfqYKfg';
            
            map = new mapboxgl.Map({
                container: 'map-large',
                style: 'mapbox://styles/mapbox/streets-v8',
                center: [-122.3037767,47.6010821],
                zoom: 10
            });


                map.on('style.load', function () {

                map.addSource('single-point', {
                    "type": "geojson",
                    "data": {
                      "type": "FeatureCollection",
                      "features": []
                    }
                  });

                map.addLayer({
                    "id": "point",
                    "source": "single-point",
                    "type": "circle",
                    "paint": {
                      "circle-radius": 7,
                      "circle-color": "#575757"
                    }
                  });


                map.getSource('single-point').setData(self.tasks);

                
                // create a GeoJSON point to serve as a starting point
              var point = {
                "type": "Point",
                "coordinates": [-122.3037767,47.6010821]
              };

              

                    map.addSource('point', {
                    "type": "geojson",
                    "data": {
                      "type": "FeatureCollection",
                      "features": []
                    }
                  });

                

                    map.addLayer({
                        "id": "myLocation",
                        "source": "point",
                        "type": "circle",
                        "paint": {
                          "circle-radius": 4,
                          "circle-color": "#f00a0a"
                        }
                      }); 

                      map.getSource('point').setData(point);           

            }); 

            // Listen for clicks on features & pass data to templates
                map.on('click', function (e) {
                    // Use queryRenderedFeatures to get features at a click event's point
                    // Use layer option to avoid getting results from other layers
                    var features = map.queryRenderedFeatures(e.point, { layers: ['point'] });
                    // if there are features within the given radius of the click event,
                    // fly to the location of the click event
                    if (features.length) {
                        // Get coordinates from the symbol and center the map on those coordinates
                        map.flyTo({center: features[0].geometry.coordinates});
                    }
                });
       
        },
        methods: {
            getMoreCalls: function(){

                var self = this;

                setInterval(function() {
                    var url = "https://data.seattle.gov/resource/kzjm-xkqj.json?$order=datetime DESC&$limit=20"
                      self.$http({url: url, method: 'GET'}).then(function (response) {
                          // success callback
                          console.log(response.data);

                          var realData = GeoJSON.parse(response.data, {Point: ['latitude', 'longitude'],
                              extra: {
                                  'marker-size': "small",
                                  'marker-color':"#3bb2d0",
                                  'active': false,
                                  'visible': true
                              }
                          });

                          store.state.calls = realData

                          map.getSource('single-point').setData(self.tasks);

                      }, function (response) {
                          // error callback
                      });
                }, 5000);
            }
        }

        
    }
</script>



<style lang="css">

.mobile-map {
    
}

#map-large { 
  position:relative; 
  width:100%;
  height: 100%;
  
  }


    
</style>