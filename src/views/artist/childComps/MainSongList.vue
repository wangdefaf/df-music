<template>
<article>
  <ul>
    <router-link tag="li" :to="{name:'songList',params:{id:item.id}}" v-for="(item,index,key) in playlists" :key="key" :title="item.name">
      <div class="imgDiv">
        <img :src="item.coverImgUrl+'?param=215y215'" alt="">
        <div class="itemHover">
          <play theme="two-tone" size="80" :fill="['#999999' ,'#ffffff']"/>
        </div>
      </div>

      <p>{{item.name}}</p>
      <div>
        <play-one theme="outline" size="25" fill="#b1b1b1" strokeLinejoin="bevel"/>
        <span>{{item.playCount+'' | playCount}}</span>
      </div>
    </router-link>
  </ul>
</article>
</template>

<script>
import {PlayOne,Play} from '@icon-park/vue'
export default {
name: "MainSongList",
  mounted() {
  },
  components: {
    PlayOne,
    Play
  },
  props: {
    playlists: {
      type: Array
    }
  },
  filters: {
    playCount(value) {
      if (value.length > 4) {
        return value.substring(0,value.length-4) + '万'
      } else return value
    }
  }
}
</script>

<style scoped lang="scss">
article {
  ul {
    display: flex;
    flex-wrap: wrap;
    li {
      flex: 1;
      cursor: pointer;
      height: 300px;
      margin-bottom: 26px;
      padding-right:14px ;
      list-style: none;
      .imgDiv {
        position: relative;
        width: 215px;
        height: 215px;
        overflow: hidden;
        img {
          transition: all 0.3s;
        }
        .itemHover {
          display: none;
          position: absolute;
          top: 0;
          width: 100%;
          height: 100%;
          background: rgba(116, 116, 116, 0.3);
          text-align: center;
          line-height: 264px;
        }
      }
      p {
        margin: 7px 0 10px;
        font-size: 17px;
      }
      div {
        color: #333;
        span {
          margin-top: 5px;
          color: #999;
        }
      }
    }
  }
}

</style>