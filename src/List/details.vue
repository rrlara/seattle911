<template>
    <!-- <div class="task-list" v-for="task in tasks"> -->
        <!-- <task :task="task" :store="store"></task> -->
        <div class="mobile-map">
        
        <div id='map'></div>

        </div>
</template>
<script>
    import store from '../vuex/store.js'
    import GeoJSON from '../lib/geojson'

    var map;
    var source

    export default {
        name: "Details",

        watch:{

          'detailToMap': function(){


            source.setData(this.detailToMap);

            map.flyTo({
                center: [this.detailToMap.geometry.coordinates[0],this.detailToMap.geometry.coordinates[1]],
                zoom: 14
            });

          }

        },

        computed: {
            detailToMap: () => { 
                return store.state.detailsData
            }
        },
        ready() {

            var self = this; 
                        
            mapboxgl.accessToken = 'pk.eyJ1IjoicnJsYXJhIiwiYSI6IjNjSlJmUkkifQ.PlJc5PGK-7-EDMmsfqYKfg';
            
            map = new mapboxgl.Map({
                container: 'map',
                style: 'mapbox://styles/mapbox/streets-v8',
                center: [self.detailToMap.geometry.coordinates[0],self.detailToMap.geometry.coordinates[1]],
                zoom: 15
            });

                map.on('style.load', function () {

                    source = new mapboxgl.GeoJSONSource({
                        data: self.detailToMap
                    });

                    map.addSource('single-point', source);

                

                    map.addLayer({
                        "id": "point",
                        "source": "single-point",
                        "type": "circle",
                        "paint": {
                          "circle-radius": 6,
                          "circle-color": "#607d8b"
                        }
                      });

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
            
        }

        
    }
</script>



<style lang="css">

.mobile-map {
    
}

#map { 
  position:relative; 
  width:100%;
  height: 250px;
  }

  .mapboxgl-ctrl-attrib{
    display: none !important;
}

    
</style>