<script>
    import store from '../vuex/store.js'

    module.exports = {
        props:['task', 'store'],
        data: () => {
            return {
                store: store
            }
        },
        methods: {
            toggleComplete: (task) => {
                store.dispatch('TOGGLECOMPLETE', task)
            }
        }
    }    
</script>
<template>
    <div class="task-row">
        <span @click="toggleComplete(task)" :class="{'complete': task.complete}">{{ task.description }}</span>
    </div>
</template>

<style lang="sass">
    .task-row{

        span{
            color: red;
        }

        .complete{
            color: grey;
            text-decoration: line-through;
        }
    }
</style>