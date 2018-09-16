<template lang="html">
  <div id="history" class="bg-light">
    <h5 class="border-bottom p-2 m-0">Ostatnio wyszukiwane</h5>
    <div v-for="stopPoint in history" :key="stopPoint.name" v-on:click="$emit('showDetails', stopPoint)" class="history-item">
      <i class="fas fa-bus text-dark"></i><span>{{stopPoint.name}}</span>
    </div>
    <div>
      <a v-on:click="clearHistory()" href="#" class="text-danger">Usuń historię</a>
    </div>
  </div>
</template>

<script>
export default {
  computed:{
    history(){
      return this.$store.state.history.slice().reverse();
    }
  },
  methods:{
    clearHistory()
    {
      this.$store.commit('CLEAR_HISTORY');
    }
  }
}
</script>

<style lang="css">

  #history
  {
    border-radius: 0.25rem;
  }

  #history>div
  {
    border-bottom: 1px solid lightgray;
    padding: 7px;
    cursor: pointer;
    display: flex;
  }

  #history>.history-item:hover
  {
    background-color: #EEE;
  }

  #history>div>*{
    margin-left: 10px;
  }
</style>
