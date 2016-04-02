<script>

    import store from '../vuex/store.js'

    module.exports = {
        data: () => {
            return { 
                newTask: '' 
            } 
        },
        methods:{
            // note that we need `this` here so we can clear out the value
            // once the ADDTASK mutation has been dispatched, so we need to
            // use a traditional function structure instead of an arrow function.
            addTask: function(newTask) {
                store.dispatch('ADDTASK', this.newTask)
                this.newTask = ''
            }
        }
    }    
</script>
<template>
    <input @keyup.enter="addTask" v-model="newTask">
</template>

<style>
</style>