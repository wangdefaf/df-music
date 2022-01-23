<template>
  <div id="discover">
    <swiper :banners="TopBanner"/>
    <MainsongList id="songList"/>
    <MainsingerList class="singerList" :singerList="singerList" @itemClick="itemClick"/>
    <MaintopList :TopList="topList"/>
  </div>
</template>

<script>//
//网络请求相关代码
import {getHomeGoods,getsingerList,getTopList} from "@/network/getdata/discover";
//组件相关代码
import Swiper from "@/components/common/swiper/swiper";
import MainsongList from "./childComps/MainsongList";
import MainsingerList from "./childComps/MainsingerList";
import MaintopList from "./childComps/MaintopList";

export default {
  name: "Discover",
  data() {
    return {
      TopBanner: null,
      singerList: [],
      indexList: 1,
      topList: [],
    }
  },
  components: { MaintopList, MainsingerList, MainsongList, Swiper},
  methods: {
    itemClick(index) {
      // console.log(index);
      this.indexList = index
    }
  },
  created() {
    //网络请求相关
    getHomeGoods().then(res => {
      let data = res.data.data.blocks
      this.TopBanner = data[0].extInfo.banners.splice(0,11)
    }).catch(err => {
      // console.log('请求失败',err);
    })

    for (let i=0; i<5; i++) {
      getsingerList(i).then(res => {
        let data = res.data.list.artists.splice(0,6)
        this.singerList.push(data)
        // console.log(this.singerList);
      }).catch(err => {
        console.log('请求失败',err);
      })
    }

    for (let i=0; i<6; i++) {
      //飙升 新增 热歌 欧美 韩语
      let ids = [19723756,3779629,3778678,2809513713,745956260]
      getTopList(ids[i]).then(res => {
        let data = res.data.playlist.tracks.splice(0,5)
        this.topList.push(data)
      }).catch(err => {
        console.log('请求失败',err);
      })
    }
  }
}
</script>

<style scoped>
#songList {
 margin-top: 20px;
}
.singerList {
  margin-top: 10px;
}
</style>