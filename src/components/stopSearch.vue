<template lang="html">
  <div>
    <template v-if="!selectedStopPoint">
      <form class="form-group" v-on:submit.prevent>
        <label class="text-light">Wyszukaj przystanek:</label>
        <div class="input-group">
          <div class="input-group-prepend">
            <span class="input-group-text"><i class="fa fa-search text-dark"></i></span>
          </div>
          <input v-model="input" type="text" class="form-control" placeholder="Nazwa przystanku">
        </div>
      </form>
      <stopPointHistory v-show="input.length == 0 && $store.state.history.length"  v-on:showDetails="showStopPointDetails($event)"></stopPointHistory>
      <loadingAnimation v-show="showAnimation && stopPoints.length == 0"></loadingAnimation>
      <ul class="list-group">
        <li v-for="stopPoint in stopPoints" v-on:click="showStopPointDetails(stopPoint)" :key="stopPoint.symbol" class="list-group-item stop-point">
          <i class="fas fa-bus text-dark"></i><small>{{stopPoint.symbol}}</small> {{stopPoint.name}}
        </li>
      </ul>
    </template>
    <template v-else>
      <bollardSelect v-on:closeDetails="selectedStopPoint=null" v-bind:stopPoint="selectedStopPoint"></bollardSelect>
    </template>
  </div>
</template>

<script>
import bollardSelect from './bollardSelect.vue'
import loadingAnimation from './loadingAnimation.vue'
import stopPointHistory from './stopPointHistory.vue'
export default {
  data(){
    return {
      input : "",
      stopPoints : [],
      selectedStopPoint : null,
      showAnimation : false
    };
  },
  methods:
  {
    showStopPointDetails(stopPoint){
        this.selectedStopPoint = stopPoint;
        this.showDetails = true;
        this.input = "";
        this.$store.commit("PUSH_TO_HISTORY", stopPoint);
    },
    hideStopPointDetails(){
      selectedStopPoint = null;
    }
  },
  watch:{
    input(){
      if(this.input === "")
      {
        this.stopPoints = [];
        this.showAnimation = false;
        return;
      }
      this.showAnimation = true;
      let query = {method: "getStopPoints", p0: `{"pattern":${this.input}}`};
      $.ajax("http://pekamonitor.cba.pl/submit.php", {
        method: "POST",
        data: query,
        beforeSend: function(xhr){xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');}
      }).done((data)=>{
          if(this.input.length > 0)
            this.stopPoints = data.success;
          this.showAnimation = false;
      });
    }
  },
  components : {bollardSelect, loadingAnimation, stopPointHistory}

}
</script>

<style lang="css">



.stop-point
{
  cursor: pointer;
  display: flex;
  align-items: baseline;
}

.stop-point > *
{
  margin-right: 5px;
}


.stop-point:hover
{
  border-left: 5px solid #202020;
  transition: border 0.2s;
}
</style>
