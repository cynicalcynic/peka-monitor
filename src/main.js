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
    sidebarToggled : false
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
    TOGGLE_SIDEBAR(state)
    {
      state.sidebarToggled = !state.sidebarToggled;
    },
    SET_TAGS(state, bollards)
    {
      state.selectedBollards = bollards;
    }
  }
});

store.subscribe((mutation, state) => {
  localStorage.setItem('tags', JSON.stringify(state.selectedBollards));
});

window.app = new Vue({
  el: '#app',
  render: h => h(App),
  beforeCreate()
  {
    var tags = JSON.parse(localStorage.getItem("tags"));
    this.$store.commit("SET_TAGS", tags);
  },
  store
})
