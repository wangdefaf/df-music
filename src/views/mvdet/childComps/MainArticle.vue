<template>
  <div id="Article">
      <div class="text">
        <div class="info">
          <h4>{{Goods.name}}<router-link tag="a" :to="{name:'mvdet',params:{id:Goods.id}}">{{Goods.artistName}}</router-link></h4>
          <div class="amount">
            <span>播放: {{mvPlayCount(Goods.playCount)}}</span>
            <span>发布时间: {{Goods.publishTime}}</span>
          </div>
          <div class="sumTil">简介：</div>
          <div class="summary" :title="Goods.desc">

            <div v-if="Goods.desc">{{Goods.desc}}</div>
            <span v-else>暂无简介</span>
          </div>
        </div>
        <div class="zhuan">
          <span></span>
        </div>
      </div>
    </div>
</template>

<script>
import {PlayOne} from '@icon-park/vue'
export default {
  name: "MainArticle",
  computed: {
    mvPlayCount() {
      return function (pc) {
        if(pc < 9999) {
          return pc
        }else{
          return Math.round(pc / 10000) + '万'
        }
      }
    },
    mvDuration() {
      return function (d) {
        let min = parseInt(d / 1000 / 60);
        let sec = parseInt((d / 1000) % 60);
        if (min < 10) {
          min = "0" + min;
        }
        if (sec < 10) {
          sec = "0" + sec;
        }
        return `${min} : ${sec}`
      }
    },
  },
  components: {PlayOne},
  props: {
    Goods: {
      type: Object
    }
  },
  mounted() {
    //console.log(this.$store.state.lrc[0]);

  }
}
</script>

<style scoped lang="scss">
#Article {
    width: 100%;
    .text {
      color: #555555;
      padding-right: 20px;
      .info {
        h4 {
          a {
            color: #333333;
            font-size: 14px;
            margin-left: 15px;
          }
        }
        .amount {
          span:nth-child(1) {
            margin-right: 10px;
          }
        }
        h4 {
          margin-top: 20px;
          margin-bottom: 15px;
        }
        .sumTil {
          margin-top: 15px;
        }
        .summary {

          margin-top:10px;
          padding-left: 10px;
          div {

          }
        }
      }
    }
}
</style>