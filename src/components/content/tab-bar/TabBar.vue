<template>
  <div id="TabBar">
    <div class="left">
      <slot name="left"></slot>
    </div>
    <div class="center">
      <slot name="center"></slot>
    </div>
    <div class="right">
      <slot name="right"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "TabBar"
}
</script>

<style scoped lang="scss">
$tab-height :60px;
  #TabBar {
    display: flex;
    position: relative;
    z-index: 15;
    margin: 0 auto;
    width: 1400px;
    height: $tab-height;
    background: #fff;
    >.left {
      line-height: $tab-height;
      flex: 0.8;
      text-align: left;
    }
    >.center {
      flex: 3;
    }
    >.right {
      flex: 2.2;
    }
  }
</style>