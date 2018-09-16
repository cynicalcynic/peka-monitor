<template lang="html">
  <header class="bg-dark text-light p-3 d-flex align-items-center">
      <a v-on:click="toggleSidebar()" v-bind:class="{pulse : $store.state.selectedBollards.length < 1 && !$store.state.sidebarToggled}" href="#" class="mr-3">
        <i class="fas fa-bars"></i>
      </a>
      <h3>Peka Monitor <small class="text-muted font-weight-light">Poznań</small> </h3>
  </header>
</template>

<script>
export default {
  methods:{
    toggleSidebar(){
      this.$store.commit('TOGGLE_SIDEBAR');
    }
  }
}
</script>

<style lang="css">

  header{
    position: fixed;
    z-index: 1;
    top: 0;
    width: 100%;
    height: 60px;
  }

  i
  {
    color: white;
    font-size: 20px;
  }

  .pulse
  {
    animation: pulse 1s infinite;
  }

  @keyframes pulse {
    0% {
      transform: scale(1);
    }
    50% {
      transform: scale(1.3);
    }
    100%{
      transform: scale(1);
    }
  }
</style>
