<template>
  <div id="counter">
    <ul class="header">
      <li>序号</li>
      <li>歌曲</li>
      <li>歌手</li>
      <li>专辑</li>
      <li>时长</li>
    </ul>
    <ul class="counter" :class="{'scroll':isScroll}">
      <li
          v-for="(item,index,key) in songlist"
          :class="{'evenClass':index%2!==0}"
          :key="key"
          @mouseenter="isShow=index" @mouseleave="isShow=-1"
      >
<!--        -->
        <div class="icon" @click="playClick(item.id)">
          <i>
            <play @click="playClick(item.id)" v-if="isShow===index" theme="two-tone" size="35" :fill="['#9e9e9e' ,'#ffe443']"/>
            <img :src="picUrl[index]" alt="" v-else-if="songlist[index].t < 4 && songlist[index].t !== 0">
            <span v-else-if="songlist[index].t !== 0">{{songlist[index].t}}</span>
            <span v-else>{{index+1}}</span>
          </i>
<!--          <el-image :src="item.al.picUrl+'?param=54y54'" scroll-container=".counter" lazy></el-image>-->
          <img v-lazy="item.al.picUrl+'?param=54y54'" alt="">
        </div>
        <router-link
            :to="{name:'song',params :{id:item.id}}"
            tag="div"
            class="info"
        >
          <div class="song" :title="item.name">
            <span>{{item.name}}</span>
            <router-link class="icon" v-if="item.mv" tag="span" :to="{name:'mvdet',params:{id:item.mv}}">
              <img  src="~@/assets/img/mvicon.png" alt="">
            </router-link>
          </div>
          <div class="singer" >
          <router-link :to="{name:'singer',params:{id:item1.id}}" v-for="(item1,index,key) in item.ar" :title="item.name" :key="key">
            <span v-if="item.ar.length>1 && index!==0">&nbsp;&nbsp;/&nbsp;&nbsp;</span>{{item1.name}}
          </router-link>
          </div>
          <div class="table" :title="item.al.name">
            {{item.al.name}}
          </div>
          <div class="time">
            {{item.dt | formatTime}}
          </div>
        </router-link>
        </li></ul></div>
</template>

<script>
import {Play} from '@icon-park/vue'
export default {
  name: "songlist",
  data() {
    return {
      isShow: false
    }
  },
  methods: {
    playClick(id) {
      this.$store.commit('playClick',id)
    }
  },
  components: {
    Play,
  },
  props: {
    songlist: {
      type: Array
    },
    picUrl: {
      type: Array,
    },
    isScroll: {
      type:Boolean,
      default: false
    }
  },
  mounted() {
    console.log(this.songlist);
  },
  filters: {
    //获取歌曲时间 毫秒转换分：秒
    formatTime(time) {
      // 取整
      time = ~~time
      var formatTime
      if (time < 10) {
        formatTime = '00:0' + time
      } else if (time < 60) {
        formatTime = '00:' + time
      } else {
        var m = ~~parseInt((time % (1000 * 60 * 60)) / (1000 * 60))
        if (m < 10) {
          m = '0' + m
        }
        var s = ~~parseInt((time % (1000 * 60)) / 1000)
        if (s < 10) {
          s = '0' + s
        }
        formatTime = m + ':' + s
      }
      return formatTime
    },
  },
}
</script>

<style scoped lang="scss">
#counter {
  .header {
    width: 100%;
    display: flex;
    >li {
      margin-right: 1px;
      height: 46px;
      background: #FAFAFA;
      color: #999;
      font-size: 14px;
      line-height: 46px;
      list-style: none;

    }
    li:nth-child(1) {
      padding-left: 30px;
      flex: 1.5;
    }
    li:nth-child(2) {
      flex: 3;
    }
    li:nth-child(3) {
      flex: 2.5;
    }
    li:nth-child(4) {
      flex: 2;
    }
    li:nth-child(5) {
      flex: 1;
    }
  }
  .scroll {
    height: 1000px;
    overflow: scroll;
  }
  .counter .evenClass {
    background: #FAFAFA;
  }
  .counter {
    width: 100%;

    li {
      display: flex;
      height: 70px;
      color: #333;
      line-height: 70px;
      list-style: none;
      font-size: 14px;
      cursor:pointer!important;
      .icon {
        flex: 1.5;
        text-align: center;
        i {
          display: inline-block;
          width: 65px;
          height: 100%;
          font-size: 18px;
          font-style: normal;
          font-weight: bold;
          span {
            margin-left: 12px;
          }
          img {
            width: 35px;
            height: 35px;
          }
        }
        >image {
          width: 54px;
          height: 54px;
          margin-left: 15px;

          margin-bottom: 5px;
        }
      }
      >div {
        overflow: hidden;
      }
      .info {
        flex: 8.5;
        display: flex;
        .song {
          flex: 3;
          padding-left: 28px;
          padding-right: 10px;
          margin-left: 5px;
          .icon {
            img {
              height: 12px;
              width: 26px;
            }
          }
        }
        .singer {
          flex: 2.5;
          a {
            color: #000;
          }
        }
        .table {
          flex: 2;
          padding-right: 10px;
        }
        .time {
          flex: 1;
        }
      }
    }
  }
}
.counter li:hover {
  background-color: #d4d4d4 !important;
}
::-webkit-scrollbar {
  width:8px;
  height: 20px;
}
/* 滚动槽 */
::-webkit-scrollbar-track {
  border-radius:10px;
}
/* 滚动条滑块 */
::-webkit-scrollbar-thumb {
  border-radius:10px;
  background: rgba(0, 0, 0, 0.5);
}
</style>