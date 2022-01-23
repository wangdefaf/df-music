<template>
  <div class="footerCounter" v-if="isShow">
    <div class="iconLeft" @click="leftClick">
      <left theme="outline" size="34" fill="#b1b1b1"/>
    </div>
    <div v-for="index in pageTable"  @click="itemClick(index)" :class="{'active':index===pageIndex}">
      {{index}}
    </div>
    <div class="iconRight" @click="rightClick">
      <right theme="outline" size="34" fill="#b1b1b1"/>
    </div>
  </div>
</template>

<script>
import {Left,Right} from '@icon-park/vue'
export default {
  name: "paging",
  data() {
    return {
      pageIndex: 1,
      isShow: true
    }
  },
  components: {
    Left,
    Right
  },
  props: {
    pageTable: {

    }
  },
  methods: {
    itemClick(index) {
      this.pageIndex = index
      this.$emit('pageClick',this.pageIndex)
    },
    leftClick() {
      if (this.pageIndex === 1) return
      else {
        this.pageIndex -= 1
        this.$emit('pageClick',this.pageIndex)
      }
    },
    rightClick() {
      if (this.pageIndex === 4) return
      else {
        this.pageIndex += 1
        this.$emit('pageClick',this.pageIndex)
      }
    },
  },
}
</script>

<style scoped lang="scss">
.footerCounter {
  display: flex;
  margin: 0 auto;
  width: 300px;

  div {
    width: 54px;
    height: 54px;
    text-align: center;
    line-height: 54px;
  }

  .active {
    background: #ffe443;
  }
}
</style>