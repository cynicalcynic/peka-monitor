<template>
  <div id="app">
    <!-- Header -->
    <pageHeader></pageHeader>
      <aside id="sidebar-wrapper" v-bind:class="{toggled: sidebarToggled}">
        <stopSearch></stopSearch>
        <pageFooter></pageFooter>
      </aside>
      <!--  Page content  -->
      <div id="page-content" v-bind:class="{toggled: sidebarToggled}">
          <div class="container-fluid">
            <h1 v-show="tags.length < 1" class="text-muted">Nie masz jeszcze dodanych przystanków!</h1>
                <draggable v-model="tags" class="row" :options="{handle : '.handle'}">
                  <!-- <transition-group name="list-complete"> -->
                    <timeInfo v-for="tag in tags" :key="tag" v-bind:tag="tag"></timeInfo>
                  <!-- </transition-group> -->
                </draggable>
          </div>
      </div>
    </div>

  </div>
</template>

<script>
import stopSearch from './components/stopSearch.vue'
import timeInfo from './components/timeInfo.vue'
import pageHeader from './components/pageHeader.vue'
import pageFooter from './components/pageFooter.vue'
import draggable from 'vuedraggable'
export default {
  name: 'app',
  data () {
    return {
    }
  },
  computed : {
    tags:
    {
      get(){
        return this.$store.state.selectedBollards;
      },
      set(value)
      {
        this.$store.commit("SET_TAGS", value);
      }
    },
    sidebarToggled()
    {
      return this.$store.state.sidebarToggled;
    }
  },
  components:
  {
    stopSearch,
    timeInfo,
    pageHeader,
    pageFooter,
    draggable
  }
}
</script>

<style lang="css">
  /* Sidebar */
#sidebar-wrapper
{
  position: fixed;
  /* display: flex;
  flex-direction: column;
  justify-content: space-between; */
  z-index: 1;
  left: -350px;
  top: 60px;
  padding: 20px;
  width: 350px;
  height: calc(100% - 60px);
  background-color: #202020;
  transition: left 0.5s;
}

#page-content
{
  position: absolute;
  width: 100%;
  top: 60px;
  margin-top: 10px;
}

#sidebar-wrapper.toggled
{
  left: 0;
}

#page-content.toggled
{
  filter: brightness(60%);
}

@media only screen and (max-width: 480px) {
    #sidebar-wrapper.toggled {
        width: 100%;
    }

    #page-content.toggled
    {
      margin-left: 0px;
    }
}

/* .list-complete-item {
  transition: all 0.5s;
}

.list-complete-enter, .list-complete-leave-active {
  opacity: 0;
} */

</style>
