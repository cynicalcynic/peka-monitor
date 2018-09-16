

<template>
  <div class="col-lg-4 col-md-6 col-sm-12">
    <div class="shadow-lg">
      <div class="bg-dark text-light d-flex justify-content-between align-items-center p-2">
        <span><i class="fa fa-bus handle"></i> {{bollard.name}}</span>
        <a v-on:click="removeBollard()" href="#"><i class="fas fa-trash text-white"></i></a>
      </div>
      <table class="table table-sm table-dark">
        <thead>
        <tr>
          <th scope="col">Linia</th>
          <th scope="col">Kierunek</th>
          <th scope="col">Czas</th>
        </tr>
      </thead>
      <tbody>
        <tr v-show="!loadingFinished">
          <td colspan="3"><loadingAnimation></loadingAnimation></td>
        </tr>
        <tr v-for="time in times" v-bind:class="{blink : time.minutes < 1}">
          <td>{{time.line}}</td>
          <td>{{time.direction}}</td>
          <td>{{time.onStopPoint?'Odjeżdża!':time.minutes < 1 ? '<1min' : time.minutes + 'min'}}</td>
        </tr>
        <tr v-show="times.length === 0 && loadingFinished">
          <td class="text-center" colspan="3">Brak odjazdów</td>
        </tr>
        <tr v-show="message.length > 0">
          <td colspan="3" v-html="message"></td>
        </tr>
      </tbody>
      </table>
    </div>
  </div>
</template>

<script type="text/javascript">
  import loadingAnimation from './loadingAnimation.vue'
  export default {
    props : {
      tag : {
        type: String,
        required: true
      }
    },
    data()
    {
      return {
        times : [],
        bollard : {},
        message : "",
        updateInterval : null,
        loadingFinished : false
      };
    },
    methods:
    {
      updateTimes()
      {
        let query = {method: "getTimes", p0: `{"symbol":${this.tag}}`};
        $.ajax("http://pekamonitor.cba.pl/submit.php", {
          method: "POST",
          data: query
          //beforeSend: function(xhr){xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');}
        }).then((data)=>{
            this.times = data.success.times.slice(0,5);
            this.bollard = data.success.bollard;
            this.loadingFinished = true;
        });
      },
      findMessages(){
        let query = {
          method: "findMessagesForBollard",
          p0: `{"symbol":${this.tag}}`
        };
        $.ajax("http://pekamonitor.cba.pl/submit.php", {
          method: "POST",
          data: query
          //beforeSend: function(xhr){xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');}
        }).then((data)=>{
              this.message = data.success[0].content;

        });
      },
      removeBollard()
      {
        this.$store.commit('REMOVE_TAG', this.tag);
      }
    },
    created()
    {
      this.updateTimes();
      this.findMessages();
      this.updateInterval = setInterval(this.updateTimes, 5000);
    },
    beforeDestroyed()
    {
      clearInterval(this.updateInterval);
    },
    components : {loadingAnimation}
  }
</script>

<style>

  .fas.fa-trash:hover
  {
    transform: scale(1.2);
  }


  .blink
  {
      animation: blink 2s infinite;
  }

  @keyframes blink {
      0% {opacity : 1}
      50% {opacity: 0}
      100% {opacity : 1}
  }
</style>