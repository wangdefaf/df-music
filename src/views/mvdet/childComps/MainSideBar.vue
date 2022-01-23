<template>
  <div class="sidebar">
    <h3>相似MV</h3>
    <div v-for="(item,index) in simiSong" class="item">
      <router-link :to="{name:'mvdet',params:{id:item.id}}" tag="div" class="info">
        <div class="pic">
          <img :src="item.cover+'?param=206y108'" alt="">
          <div id="itemHover">
            <play theme="two-tone" size="67" :fill="['#ffe443' ,'rgba(255,255,255,0)']"/>
          </div>
        </div>
        <div class="text">
            <p class="song">{{item.name}}</p>
            <p>
              <router-link tag="a" :to="{name:'singer',params:{id:item.id}}" class="sing">{{item.artistName}}</router-link>
            </p>

        </div>
      </router-link>
    </div>
  </div>
</template>

<script>
import {Play} from '@icon-park/vue'
export default {
  name: "MainSideBar",
  methods: {
  },
  props: {
    simiSong: {
      type: Array
    }
  },
  components: {
    Play
  }

}
</script>

<style scoped lang="scss">
.sidebar {
  margin-bottom: 10px;
  a {
    color: #333333;
  }
  h3 {
    font-size: 25px;
    border-bottom: 1px solid #ccc;
    padding-bottom: 15px;
    margin-bottom: 20px;
  }
  .item {
    display: flex;
    position: relative;
    padding-left: 10px;
    margin: 8px 0;
    font-size: 17px;
    cursor: pointer;
    .info {
      flex: 10;
      .pic {
        position: relative;
        #itemHover {
          display: none;
          position: absolute;
          text-align: center;
          top: 0;
          width: 100%;
          height: 100%;
          background: rgba(116, 116, 116, 0.3);
          line-height: 176px;
        }
        img {
          width: 100%;
          height: auto;
          margin-right: 10px;
        }
      }
      .pic:hover #itemHover {
        display: block;
      }
      .text {
        font-size: 14px;
        padding-top: 5px;
        p {
          margin-bottom: 4px;
          white-space:nowrap;
          text-overflow: ellipsis;
          overflow:hidden;
        }
        p:nth-child(2) {
          margin: 0;
        }
      }
    }
  }
}

</style>