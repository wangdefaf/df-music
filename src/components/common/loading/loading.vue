<template>
  <div id="loading" v-if="$store.state.isLoadingShow" :style="$store.state.isLogShow?'display:none':''">
    <div class="sides">
      <span class="side1"></span>
      <span class="side2"></span>
      <span class="mid"></span>
      <span class="side2"></span>
      <span class="side1"></span>
    </div>
  </div>
</template>

<script>
export default {
name: "loading",
}
</script>

<style scoped lang="scss">
#loading {
  width: 100%;
  height: 100%;
  background: #fff;
  position: fixed;
  top: 0;
  z-index: 20;
  line-height: 22px;
    .sides {
      position: absolute;
      top: 48%;
      left: 48%;
      width: 70px;
      margin: 0 auto;
      span {
        display: inline-block;
        vertical-align:middle;
        width: 4px;
        margin: 5px;
        border-radius: 3px;
        background: #ffe443;
      }
      .side1 {
        animation: 1.5s rainbow1 infinite;
        height: 6px
      }
      .side2 {
        animation: 1.5s rainbow2 infinite;
        height: 14px;
      }
      .mid {
        animation: 1.5s rainbow3 infinite;
        height: 22px;
      }
    }
}
@keyframes rainbow1 {
  0% { height: 6px  }
  56% { height: 22px }
  100% { height: 6px  }
}
@keyframes rainbow2 {
  0% {height: 14px;}
  28% {height: 22px;}
  80% {height: 6px;}
  100% {height: 14px;}
}
@keyframes rainbow3 {
  0% { height: 22px  }
  56% { height: 6px }
  100% { height: 22px  }
}
</style>