<template>
  <div id="Article">

      <div class="image">
        <div>
          <img v-if="Goods&&Goods.al&&Goods.al.picUrl" :src="Goods.al.picUrl+'?param=300y300'" alt="">
        </div>
      </div>
      <div class="text">
        <div class="name">
          <h2 v-if="Goods&&Goods.name">{{Goods.name}}</h2>
        </div>
        <div class="singer" >
          <router-link v-if="Goods&&Goods.ar&&Goods.ar[0]" :to="{name:'singer',params:{id:item.id}}" v-for="(item,index,key) in Goods.ar" :key="key" :title="Goods.name">
            <span v-if="Goods.ar.length>1 && index!==0">&nbsp;&nbsp;&&nbsp;&nbsp;</span>{{item.name}}
          </router-link>
        </div>
        <div class="zhuan">
          <span v-if="Goods&&Goods.al&&Goods.al.name">专辑: {{Goods.al.name}}</span>
        </div>
        <div class="buttons">
          <div @click="playClick">
            <play-one theme="two-tone" size="40" :fill="['#5c5c5c' ,'#ffe443']"/>
            <span>立即播放</span>
          </div>
          <div><slot></slot></div>
        </div>
        <h4 v-if="!$store.state.lrc[0]">
          暂无歌词
        </h4>
        <div class="ric" ref="lrc" v-else>
          <div v-for="(item,index,key) in $store.state.lrc[0]" :class="{active:index == $store.state.time}" :key="key">
            <p>{{item}}</p>
            <p v-if="$store.state.lrc[1]">{{$store.state.lrc[1][index]}}</p>
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
    }
  },
  methods: {
    playClick() {
      this.$store.commit('playClick',this.$route.params.id)
      document.querySelector('#player').load()
    },
  },
  components: {PlayOne},
  props: {
    Goods: {
      type: Object
    }
  },
}
</script>

<style scoped lang="scss">
#Article {
  a {
    color: #333333;
  }
    display: flex;
    color: #333333;
    .image {
      flex: 2;
      >div {
        display: inline-block;
        width: 300px;
        height: 300px;
        border-radius: 30%;
        overflow: hidden;
      }
    }
    .text {
      flex: 2.5;
      color: #555555;
      padding-right: 20px;

      .name, .singer, .zhuan {
        padding-left: 10px;
      }
      >h4 {
        margin-top:80px;
        cursor: pointer;
        text-align: center;
      }
      > div, h2 {
        margin: 15px 0;
        font-size: 20px;
      }

      h2 {
        color: #000;
        cursor: pointer;
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
          span {
            margin: 0 5px
          }
        }
      }

      .ric {
        display: flex;
        flex-wrap: wrap;
        height: 1100px;
        margin-top: 80px;
        padding-right: 10px;
        overflow: scroll;
        overflow-x: hidden;
        transition: all 0.3s;
        >div {
          width: 100%;
        }
        p {
          transition: all 0.3s;
        }
        .active {
          font-weight: bolder;
          font-size: 22px;
        }
      }
    }
}
::-webkit-scrollbar {
  width:8px;
  height: 20px;
}
/* 滚动槽 */
::-webkit-scrollbar-track {
  background: #d2d2d2;
  border-radius:10px;
}
/* 滚动条滑块 */
::-webkit-scrollbar-thumb {
  border-radius:10px;
  background: rgba(0, 0, 0, 0.5);
}

</style>