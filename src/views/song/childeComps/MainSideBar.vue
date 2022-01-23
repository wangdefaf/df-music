<template>
  <div class="sidebar">
    <h3>相似歌曲</h3>
    <div v-for="(item,index) in simiSong" class="item">
      <router-link :to="{name:'song',params:{id:item.id}}" tag="div" class="info">
        <div class="pic">
          <img :src="item.album.picUrl+'?param=75y75'" alt="">
        </div>
        <div class="text">
          <div class="name">
            <p class="song">{{item.name}}</p>
            <router-link tag="p" :to="{name:'singer',params:{id:item.id}}" class="sing">{{item.album.artists[0].name}}</router-link>
          </div>
        </div>
      </router-link>
      <div class="icon">
        <play-one @click="playClick(item.id)" theme="two-tone" size="47" :fill="['#ffe443' ,'#ffffff']"/>
      </div>
    </div>
  </div>
</template>

<script>
import {PlayOne} from '@icon-park/vue'
export default {
  name: "MainSideBar",
  methods: {
    playClick(id) {
      this.$store.commit('playClick',id)
    }
  },
  props: {
    simiSong: {
      type: Array
    }
  },
  components: {
    PlayOne
  }

}
</script>

<style scoped lang="scss">
.sidebar {
  margin-bottom: 10px;
  h3 {
    font-size: 25px;
    border-bottom: 1px solid #ccc;
    padding-bottom: 15px;
    margin-bottom: 20px;
  }
  .item {
    display: flex;
    height: 80px;
    padding-left: 10px;
    margin: 15px 0;
    font-size: 17px;
    cursor: pointer;
    .info {
      display: flex;
      flex: 10;
      .pic {
        flex: 2;
        img {
          margin-right: 10px;
        }
      }
      .text {
        display: flex;
        flex: 8;
        .name {
          flex: 7;
          p {
            width: 265px;
            white-space:nowrap;
            text-overflow: ellipsis;
            overflow:hidden;
          }
        }

      }
    }
    .icon {
      flex: 3;
    }
  }
}
</style>