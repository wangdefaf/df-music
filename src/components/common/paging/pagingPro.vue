<template>
  <ul class="footerCounter" v-if="isShow">
    <li class="iconLeft" @click="leftClick">
      <left theme="outline" size="34" fill="#b1b1b1"/></li>

    <li v-for="index in pageArray"  @click="itemClick(index)" :class="{'active':index===pageIndex}" v-if="isover">
      {{index}}</li>

    <li v-for="index in pageTable"  @click="itemClick(index)" :class="{'active':index===pageIndex}" v-else>
      {{index}}</li>

    <li v-if="isover">
      ...</li>

    <li v-if="isover" @click="itemClick(pageMax)" :class="{'active':pageMax===pageIndex}">
      {{pageMax}}</li>

    <li class="iconRight" @click="rightClick">
      <right theme="outline" size="34" fill="#b1b1b1"/></li>
  </ul>
</template>

<script>
import {Left,Right} from '@icon-park/vue'
export default {
  name: "pagingPro",
  data() {
    return {
      pageIndex: 1,
      isShow: true,
      pageTable: 5,
      pageArray: [],
      isover: false,
      // 假设这是后台传来的数据来源
      data: [],
      // 所有页面的数据
      totalPage: [],
      // 每页显示数量
      pageSize: 5,
      // 共几页
      pageNum: 1,
      // 当前显示的数据
      dataShow: "",
      // 默认当前显示第一页
      currentPage: 0
    }
  },
  components: {
    Left,
    Right
  },
  props: {
    pageMax: {
      type: Number
    }
  },
  mounted() {
    // 分页三点操作
    if (this.pageMax>5) {
      this.isover = true
      let arr=[]
      for (let i=this.pageIndex; i<this.pageIndex+5; i++) {
        arr.push(i)
      }
      this.pageArray = arr
      console.log(this.pageArray);
    }
  },
  methods: {
    itemClick(index) {
      this.pageIndex = index
      this.pageArrayNew()
      console.log(index);
      this.$emit('pageClick',this.pageIndex)
    },
    leftClick() {
      if (this.pageIndex === 1) return
      else {
        this.pageIndex -= 1
        this.pageArrayNew()
        this.$emit('pageClick',this.pageIndex)
      }

    },
    rightClick() {
      if (this.pageIndex === this.pageMax) return
      else {
        this.pageIndex += 1
        this.pageArrayNew()
        this.$emit('pageClick',this.pageIndex)
      }

    },

    pageArrayNew() {
      let arr = []
      // console.log(this.pageIndex < this.pageMax - 1);
      //防止生成多余pages
      if (this.pageIndex<=this.pageMax) {
          if (this.pageIndex>=this.pageTable) {
            for (let i=this.pageIndex; i<this.pageIndex+5; i++) {
              arr.push(i)
            }
            this.pageArray = arr
          }
      }
      console.log(this.pageIndex);
      console.log(this.pageMax);
    }
  },
}
</script>

<style scoped lang="scss">
.footerCounter {
  display: flex;
  margin: 0 auto;
  width: 450px;
  li {
    width: 54px;
    height: 54px;
    list-style: none;
    text-align: center;
    line-height: 54px;
  }

  .active {
    background: #ffe443;
  }
}
</style>