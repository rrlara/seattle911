<template>

    <!-- <div class="header">
            <div class="details" :class="{'visible': routeData }">
              <ul class="fruits">
                <li>Distance: {{routeData.routes[0].distance}}</li>
                <li>Duration: {{routeData.routes[0].duration}}</li>
              </ul>
            </div>
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

    import MapboxClient from 'mapbox'

    var map;

    var currentLocationPoint;

    export default {
        name: "Map",

        data (){
          return {
            routeData: null
          }
        },

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

            var mapboxClient = new MapboxClient('pk.eyJ1Ijoic3BhdGlhbGRldiIsImEiOiJKRGYyYUlRIn0.PuYcbpuC38WO6D1r7xdMdA');

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






                      map.addSource('route', {
                        "type": "geojson",
                        "data": {
                        "type": "Feature",
                        "properties": {},
                        "geometry": {
                            "type": "LineString",
                            "coordinates": [
                                [-122.48369693756104, 47.83381888486939]
                             ]
                        }
                    }
                    });

                    map.addLayer({
                        "id": "route",
                        "source": "route",
                        "type": "line",
                        "layout": {
                            "line-join": "round",
                            "line-cap": "round"
                        },
                        "paint": {
                            "line-color": "#ff6e40",
                            "line-width": 4
                        }
                      });


                    map.getSource('route').setData(self.tasks);          

            }); 

            // Listen for clicks on features & pass data to templates
                map.on('click', function (e) {
                  var selfagain = self;
                    // Use queryRenderedFeatures to get features at a click event's point
                    // Use layer option to avoid getting results from other layers
                    var features = map.queryRenderedFeatures(e.point, { layers: ['point'] });
                    // if there are features within the given radius of the click event,
                    // fly to the location of the click event
                    if (features.length) {
                        // Get coordinates from the symbol and center the map on those coordinates
                        map.flyTo({center: features[0].geometry.coordinates});
                        console.log("location of point: ", features[0].geometry.coordinates);
                    }


                    // With options
                    mapboxClient.getDirections([
                      { latitude: selfagain.currentLocation.latitude, longitude: selfagain.currentLocation.longitude },
                      { latitude: features[0].geometry.coordinates[1], longitude: features[0].geometry.coordinates[0] }
                    ], {
                      profile: 'mapbox.walking',
                      instructions: 'html',
                      alternatives: false,
                      geometry: 'geojson'
                    }, function(err, results) {
                      console.log("results: ", results);

                      selfagain.routeData = results;

                      map.getSource('route').setData(results.routes[0].geometry);

                    });


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