<template lang="html">
  <loadingAnimation v-if="bollards.length == 0"></loadingAnimation>
  <div v-else class="bg-light rounded" >
    <h5 v-on:click="$emit('closeDetails')" class="px-3 py-2 border-bottom">
      <a href="#" class="font-weight-light"><i class="fas fa-chevron-left text-primary"></i> Wróć</a>
    </h5>
    <div class="px-3 pb-3">
      <h5>Wybierz przystanek: {{selectedBollard.bollard.symbol}}</h5>
      <h6 class="text-muted">Przystanek {{selectedBollardIndex+1}} z {{bollards.length}}</h6>
    </div>
    <div class="d-flex mx-3 justify-content-between">
      <button  v-on:click="previousBollard()" class="btn btn-outline-primary">
        Poprzedni
      </button>
      <button v-on:click="nextBollard()" class="btn btn-outline-primary">
        Następny
      </button>
    </div>
    <div class="m-3">
      <button v-on:click="selectBollard()" class="btn btn-outline-success btn-block">Dodaj</button>
    </div>
    <div class="">
      <h6 class="text-muted mx-3">Kierunki: </h6>
      <div class="directions">
        <div v-for="direction in selectedBollard.directions" class="d-flex align-items-stretch direction-wrapper">
          <div class="border-right linenumber">{{direction.lineName}}</div>
          <div class="ml-3 direction">{{direction.direction}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import loadingAnimation from './loadingAnimation.vue'

export default {
  props: {
    stopPointName : {
      type : String,
      required : true
    }
  },
  data(){
    return {
      bollards : [],
      selectedBollardIndex : 0
    }
  },
  computed:
  {
    selectedBollard(){
      return this.bollards[this.selectedBollardIndex];
    }
  },
  methods:
  {
    nextBollard(){
      if(this.selectedBollardIndex<this.bollards.length-1)
      this.selectedBollardIndex++;
    },
    previousBollard(){
      if(this.selectedBollardIndex > 0)
        this.selectedBollardIndex--;
    },
    selectBollard(){
      this.$store.commit('ADD_TAG', this.selectedBollard.bollard.tag);
      this.$store.commit('TOGGLE_SIDEBAR');
      this.$emit('closeDetails');
    }
  },
  created()
  {
    var query = {method: "getBollardsByStopPoint", p0: `{"name":"${this.stopPointName}"}`};
    $.ajax("http://pekamonitor.cba.pl/submit.php", {
      method: "POST",
      data: query
    }).done((data)=>{
        this.bollards = data.success.bollards;
    });
  },
  components : {loadingAnimation}
}
</script>

<style lang="css">
  .test
  {
    flex-grow: 1;
  }

  .directions
  {
    max-height: 50vh;
    overflow-y: auto;
    line-height: 60px;
  }

  .direction-wrapper
  {
    border-top: 1px solid lightgray;
  }

  .linenumber
  {
    width: 60px;
    text-align: center;
    height: 60px;
    font-size: 20px;
    color: #202020;
    font-weight: bold;
  }

  .test
  {
    margin: 10px;
  }

</style>
