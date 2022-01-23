<template>
  <div id="singer">
    <div id="left">
      <MainArticle :Goods="Goods" :songlist="songlist"></MainArticle>
      <songlist class="songlist" :songlist="singerList"/>
    </div>
    <div id="right">
      <MainSideBar :simiSong="simiSinger"/>
    </div>
  </div>
</template>

<script>
import {getSingerDet,getSimiSinger,getSingerSong} from '@/network/getdata/singer'
import MainArticle from "./childeComps/MainArticle";
import MainSideBar from "./childeComps/MainSideBar";
import songlist from "@/components/common/songlist/songlist";
export default {
  name: "singer",
  data() {
    return {
      Goods: {
        artist: {
          name: null,
          cover: null
        }
      },
      singerList:[],
      simiSinger: [],
      songlist: [],
      singerDesc: null,
    }
  },
  components: {
    songlist,
    MainArticle,
    MainSideBar
  },
  methods: {
    //网络请求
    getFun() {
      let _this = this
      let ids = []
      //歌曲详情
      getSingerDet(_this.$route.params.id).then(res => {
        _this.Goods = res.data.data
        // console.log(_this.Goods,'歌手详情');
      })
      //请求歌手歌曲数据
      getSingerSong(_this.$route.params.id).then(res => {
        _this.singerList = res.data.hotSongs
        for (let item of res.data.hotSongs) {ids.push(item.id)}
        _this.songlist = ids
        //console.log(ids);
        //console.log(res.data.hotSongs,'歌手歌曲');
      })
      //获取相似歌手
      getSimiSinger(_this.$route.params.id).then(res => {
        _this.simiSinger = res.data.artists
        // console.log(res.data.artists,'相似歌手');
      })
    }
  },
  watch: {
    '$route.params.id'() {
      if (this.$route.params.id) this.getFun()
      // console.log('变了变了');
    }
  },
  created() {
    this.getFun()
  },
}
</script>

<style scoped lang="scss">
#singer {
  display: flex;
  width: 1400px;
  margin: 0 auto;
  padding-top: 20px;
  #left {
    width: 1050px;
    a {
      color: #333333;
    }
    .songlist {
      margin-top: 20px;
    }
  }
  #right {
    width: 350px;
    padding: 20px 0 20px 10px;
  }
}

</style>