<template>
  <div id="Article">
    <div class="image">
      <div>
        <img :src="Goods.artist.cover+'?param=300y300'" alt="">
      </div>
    </div>
    <div class="text">
      <h2 class="name">{{Goods.artist.name}}</h2>
      <div class="summary" :title="Goods.artist.briefDesc">
        <pre ref="pre" :class="{'show':!isShow}">{{Goods.artist.briefDesc}}</pre>
        <span @click="isShow=!isShow" v-if="isShow">展开</span>
        <span @click="isShow=!isShow" v-else>收起</span>
      </div>
      <div class="buttons">
        <div @click="playAll">
          <play-one theme="two-tone" size="40" :fill="['#5c5c5c' ,'#ffe443']"/>
          <span>全部播放</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {PlayOne} from '@icon-park/vue'
export default {
name: "MainArticle",
  data() {
    return {
      isShow: true
    }
  },
  methods: {
   playAll() {
      this.$store.commit('playAll',this.songlist)
   }
  },
  components: {
    PlayOne
  },
  props: {
    Goods: Object,
    songlist: Array,
  },
}
</script>

<style scoped lang="scss">
#Article {
  width: 1050px;
  display: flex;
  color: #333333;
.image {

>div {
  display: inline-block;
  width: 300px;
  height: 300px;
  border-radius: 30%;
  overflow: hidden;
}
}
.text {
  width: 100%;
  color: #555555;
  padding-right: 20px;
  padding-left: 20px;
.name, .summary {
  padding-left: 10px;
}
.summary {
  pre {
    display: inline-block;
    box-sizing: content-box;
    height: 150px;
    overflow: hidden;
    padding: 10px;
    white-space: pre-wrap;
    word-wrap: break-word;
  }
  .show {
    height: auto;
    padding-bottom: 10px;
    background-image: linear-gradient(rgba(255, 255, 255,0), rgb(250, 250, 250));
  }
  span {
    cursor: pointer;
    font-size: 20px;
  }
  span:hover {
    color: #ffe443;
    text-decoration: underline;
  }
}

> div, h2 {
  margin: 15px 0;
  font-size: 20px;
}

h2 {
  color: #000;
  font-weight: bolder;
  font-size: 30px;
}

.buttons {
  display: flex;
  margin-top: 30px;

div:nth-child(1){
  cursor:pointer;
  background: #ffe443;
span {
  margin: 0!important;
}
}

div:nth-child(2) span {
  margin: 0 5px
}
div {
  height: 55px;
  padding: 0 20px;
  margin-right: 15px;
  border-radius: 30px;
  background: #F2F2F2;
  line-height: 55px;
  text-align: center;
  color: #000;
  font-size: 17px;
span {margin: 0 5px}
} } } }
</style>