
<script>
    import store from '../vuex/store.js'
    import addsTask from './AddsTask.vue'
    import task from './Task.vue'

    export default {
        components:{
            addsTask,
            task
        },
        computed: {
            tasks: () => { 
                return store.state.tasks
            }
        }
    }
</script>

<template>
    <div class="task-list" v-for="task in tasks">
        <task :task="task" :store="store"></task>
    </div>
    <adds-task></add-stask>
</template>



<style lang="sass">
    div.task-list {
        border: 1px solid green;
        margin-bottom: 1px;
        padding: 20px;
    }
</style>