<template lang="html">
  <div class="bg-light">
    <h5 class="border-bottom p-2">Ostatnio wyszukiwane</h5>
    <div v-for="stopPoint in $store.state.history" v-on:click="$emit('showDetails', stopPoint)" class="px-2">
      <i class="fas fa-bus text-dark"></i><span>{{stopPoint}}</span>
    </div>
  </div>
</template>

<script>
export default {
}
</script>

<style lang="css">
</style>
