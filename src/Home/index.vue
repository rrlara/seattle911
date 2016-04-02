<script>
    import store from '../vuex/store.js'

    export default {
        name: "Home",

        // data: () => {
        //     return { 
        //         callData: store.state.calls 
        //     } 
        // },
        computed: {
            tasks: () => { 
                return store.state.calls
            }
        }
    }
</script>

<template>
    <!-- <div class="task-list" v-for="task in tasks"> -->
        <!-- <task :task="task" :store="store"></task> -->
        <div>
        <div class="demo-card-square mdl-card mdl-shadow--2dp" v-for="task in tasks">
          <div class="mdl-card__title mdl-card--expand">
            <h2 class="mdl-card__title-text">{{task.address}}</h2>
          </div>
          <div class="mdl-card__supporting-text">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            Aenan convallis.
          </div>
          <div class="mdl-card__actions mdl-card--border">
            <a class="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect">
              View Updates
            </a>
          </div>
        </div>
    

    </div>
</template>



<style lang="css">
    
</style>