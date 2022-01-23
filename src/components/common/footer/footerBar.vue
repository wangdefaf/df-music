<template>
  <div id="footer">
    <div class="text">
      <a href="https://github.com/wangdefaf/df-music">
        <github theme="outline" size="48" fill="#ffffff"/>
      </a>
      <a href="http://wpa.qq.com/msgrd?v=3&uin=3246086747&site=qq&menu=yes">
        <tencent-qq theme="outline" size="48" fill="#ffffff"/>
      </a>
    </div>
  </div>
</template>

<script>
import {Github,TencentQq} from '@icon-park/vue'
export default {
  name: "footerBar",
  components: {
    Github,
    TencentQq
  }
}
</script>

<style scoped lang="scss">
#footer {
  width: 100%;
  height: 160px;
  padding:0 30px;
  margin-top: 30px;
  background: #282828;
  line-height: 180px;
  .text {
    width: 1400px;
    margin: 0 auto;
    a:nth-child(2) {
      margin-left: 20px;
    }
  }
}
</style>