<template>
  <div class="songlist">
    <nav-bar-pro class="navbar" @itemClick="itemClick" :navabar-title="NavBarArray">
      <h2 slot="title">推荐歌单</h2>
    </nav-bar-pro>
    <ul class="songlist">
      <router-link tag="li" :to="{name:'songList',params:{id:item.id}}" v-for="(item,index,key) in SongList[itemIndex]" :key="key" :title="item.name" @click="itemClick">
        <img v-lazy="item.coverImgUrl+'?param=264y264'" alt="" :key="item.uesrId">
        <p>{{item.name | fontlength}}</p>

        <p><play theme="two-tone" size="25" :fill="['#333' ,'#ffffff']" strokeLinejoin="bevel"/><span>{{item.playCount | fontview}}</span></p>
      </router-link>
    </ul>
  </div>
</template>

<script>
import {Play} from "@icon-park/vue"
import NavBarPro from "../../../components/content/nav-bar/NavBarPro";
//网络请求相关
import {getsongList} from "@/network/getdata/discover";
export default {
name: "MainsongList",
  data() {
    return {
      SongList: [],
      itemIndex: 0,
      songlistArray: ["全部","华语","古风","欧美","流行"],
      NavBarArray: [
        {title: '每日推荐',},
        {title: '华语',}, {title: '古风',},
        {title: '欧美',},{title: '流行',},
        {title: '更多>', path: '/Home/artist',}],
    }
  },
  methods: {
    itemClick(index) {
      this.itemIndex = index
    }
  },
  filters: {
    fontview(item) {
      let index = item + ''
      if (index.length > 4) {
        return index.substring(0,3) + '万'
      } else {
        return item
      }
    },
    fontlength(item) {
      if (item.length > 16) {
        return item.substring(0,16) + '...'
      } else {
        return item
      }
    }
  },
  created() {
    for (let i=0; i<5; i++) {
      let cat = this.songlistArray[i]
      getsongList(cat).then(res => {
          this.SongList.push(res.data.playlists)
      }).catch(err => {
        console.log('请求失败', err);
      })
    }
  },
  components: {NavBarPro,Play}
}
</script>

<style scoped lang="scss">
.songlist {
  .navbar {
    padding: 0;
  }
  ul {
    display: flex;
    li {
      flex: 1;
      cursor: pointer;
      padding-left: 15px;
      list-style: none;
      text-align: center;
      img {
        width: 256px;
        height: 256px;
        margin: 0 auto;
      }
      p {
        text-align: left;
        margin-bottom: 5px;
        color: #7b7b7b;
        .play{
          margin: 0 8px;
        }
      }
      >p {
        margin-top: 5px;
        margin-bottom: 8px;
        span {
          margin-left: 7px;
        }
      }
    }
  }
}
</style>