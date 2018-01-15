<template>
  <div id="app">
    <router-view/>
    <loading v-show="$store.state.isLoading"></loading>
    <alert-tip></alert-tip>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
import alertTip from "@/components/alertTip"
import loading from "@/components/loading"
export default {
  name: 'app',
  components: {
    loading,
    alertTip
  }
}
</script>

<style>
@import 'style/base.scss'; 
#app {
  font-family: '微软雅黑', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #333;
}
</style>
