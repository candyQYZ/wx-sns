<template>
  <div v-show="$store.state.isShowAlert" class="tips" style="display: block;">
    <div>{{$store.state.alertTxt}}</div>
  </div>
</template>

<script>
export default {
}
</script>

<style>

</style>
