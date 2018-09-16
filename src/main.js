import Vue from 'vue'
import App from './App.vue'
import Vuex from 'vuex'
import VueResource from 'vue-resource'
import 'bootstrap/dist/css/bootstrap.min.css'
import $ from 'jquery'

Vue.use(Vuex);
Vue.use(VueResource);
window.$ = $;

if(document.body.style.zoom !== undefined)
  document.body.style.zoom = 1.0;

const store = new Vuex.Store({
  state: {
    selectedBollards : [],
    sidebarToggled : false,
    history : []
  },
  mutations: {
    ADD_TAG(state, bollard)
    {
      if(state.selectedBollards.indexOf(bollard) == -1)
      {
        state.selectedBollards.push(bollard);
        //localStorage.setItem('tags', JSON.stringify(state.selectedBollards));
      }
    },
    REMOVE_TAG(state, tag){
      var index = state.selectedBollards.indexOf(tag);
      if(index > -1)
        state.selectedBollards.splice(index, 1);
      //localStorage.setItem('tags', JSON.stringify(state.selectedBollards));
    },
    TOGGLE_SIDEBAR(state){
      state.sidebarToggled = !state.sidebarToggled;
    },
    SET_TAGS(state, bollards){
      state.selectedBollards = bollards;
    },
    PUSH_TO_HISTORY(state, stopPoint){
      // if(state.history.indexOf(stopPoint) == -1)
        state.history.push(stopPoint);
    },
    SET_HISTORY(state, history){
      state.history = history;
    },
    CLEAR_HISTORY(state){
      state.history = []
    }

  }
});

store.subscribe((mutation, state) => {
    localStorage.setItem('tags', JSON.stringify(state.selectedBollards));
    localStorage.setItem('history', JSON.stringify(state.history));
    console.log(mutation);
});

window.app = new Vue({
  el: '#app',
  render: h => h(App),
  beforeCreate()
  {
    let tags = JSON.parse(localStorage.getItem("tags"));
    if(tags !== null)
      this.$store.commit("SET_TAGS", tags);
    let history = JSON.parse(localStorage.getItem("history"));
    if(history !== null)
      this.$store.commit('SET_HISTORY', history);
  },
  store
})
