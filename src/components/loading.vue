<template>
  <div class="loading"></div>
</template>

<script>
export default {

}
</script>

<style lang="scss">
  .loading {
    width: 3rem;
    height: 2.8rem;
    background: url(~@/images/loading.gif) center no-repeat rgba(0,0,0,0.6);
    background-size: 1.5rem;
    position: fixed;
    left: 0;
    top: 40%;
    right: 0;
    margin: auto;
    z-index: 200;
    border-radius: 0.3rem;
}
</style>
