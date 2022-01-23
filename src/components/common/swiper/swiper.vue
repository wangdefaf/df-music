<template>
  <div id="swiper" @mouseover="mouseoverSwiper" @mouseleave="mouseleaveSwiper">
    <span class="leftButton" @click="itemIndexReduce">
      <left theme="two-tone" size="47" :fill="['#ffffff' ,'#ffffff']"/>
    </span>
    <span class="rightButton" @click="itemIndexPuls">
      <Right theme="two-tone" size="47" :fill="['#ffffff' ,'#ffffff']"/>
    </span>
    <div class="list-circle">
      <span v-for="(item,index) in banners" :class="{active:itemIndex===index}" @click="indexChange(index)"></span>
    </div>
    <div class="swiperImgs">
      <a :href="item.url?item.url:'https://music.163.com/#'" v-for="(item,index) in banners" class="a" @click="spanClick(item)">
        <div class="filter" :style="'left:' + -1400*itemIndex + 'px'">
          <img :src="item.pic+'?param=1024y420'" alt="">
          <img :src="item.pic+'?param=1024y420'" alt="">
        </div>
      </a>
    </div>
  </div>
</template>
<script>
import {Left,Right} from "@icon-park/vue"
export default {
  name: "swiper",
  data() {
    return {
      itemIndex: 0,
      Interval: setInterval(this.timerFun,3000)
    }
  },
  components: {
    Left,Right
  },
  props: {
    banners: {
      type: Array,
      default() {

      }
    }
  },
  methods: {
    mouseoverSwiper() {
      clearInterval(this.Interval)
      this.Interval = null
    },
    mouseleaveSwiper() {
      this.Interval = setInterval(this.itemIndexPuls,3000)
    },
    indexChange(index) {
      this.itemIndex = index;
    },
    itemIndexPuls() {
      if (this.itemIndex === this.banners.length-1) {
        this.itemIndex = 0
      } else {
        this.itemIndex++
      }
    },
    itemIndexReduce() {
      if (this.itemIndex === 0) {
        this.itemIndex = this.banners.length-1
      } else {
        this.itemIndex--
      }
    },
  }
}
</script>

<style scoped lang="scss">
  #swiper {
    overflow: hidden;
    position: relative;
    width: 1400px;
    &:hover .leftButton,&:hover .rightButton {
      display: inline-block;
    }
    .list-circle {
      position: absolute;
      bottom: 20px;
      left: (1400px - 286px)/2;
      z-index: 10;
      >span {
        display: inline-block;
        width: 12px;
        height: 12px;
        margin: 0 7px;
        border-radius: 50%;
        background: #fff;
      }
      .active {
        background: #3c3c3c;
      }
    }
    .leftButton,.rightButton {
      $height : 70px;
      display: none;
      position: absolute;
      width: $height;
      height: $height;
      text-align: center;
      line-height: $height;
      background: rgba(29, 29, 29, .1);
      border-radius: 50%;
      z-index: 10;
      >i {
        color: #f1f1f1;
        font-size: 70px;
      }
      &:hover i {
        color: #fff;
      }
    }
    .leftButton {
      top: (420px-70px)/2;
      left: 40px;
    }
    .rightButton {
      top: (420px-70px)/2;
      right: 40px;
    }
    //height:;
    .swiperImgs {
      width: 1400px * 11;
      height: 420px;
      >.a {
        display: inline-block;
        position: relative;
        width: 1400px;
        height: 420px;
        z-index: 9;
      }
      .filter {
        float: left;
        position: relative;
        left: 0;
        width: 1400px;
        height: 420px;
        overflow: hidden;
        transition: all 0.3s;
        img:nth-child(1) {
          top: 0;
          width: 1440px;
          height: 440px;
          filter: blur(30px);
          transform:translate(10px,10px)
        }
        img:nth-child(2) {
          position: absolute;
          top: 0;
          left: (1400px-1080px)/2;
          z-index: 2;
        }
      }
    }
  }
</style>