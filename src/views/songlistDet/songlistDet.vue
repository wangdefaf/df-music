<template>
  <div id="songlist">
    <div id="left">
      <MainArticle :Goods="Goods">
        <a href="#comment">
          <Comment theme="two-tone" size="30" :fill="['#333' ,'#ffffff']"/>
          <span>评论</span>
        </a>
      </MainArticle>
      <songlist class="songlist" :songlist="songlist"/>
      <comments id="comment" :comments="CommentsData"/>
    </div>
    <div id="right">
      <MainSideBar :simiSong="simiSonglist"/>
      <MainComment :Comments="Comments"/>
    </div>
  </div>
</template>

<script>
import {Comment} from '@icon-park/vue'
import {getSongDet} from '@/network/getdata/song'
import {getSongListDet,getSimiSongList,getComment} from '@/network/getdata/songlist'
import MainArticle from "./childeComps/MainArticle";
import MainSideBar from "./childeComps/MainSideBar";
import MainComment from "@/components/common/comments/MainComment";
import comments from "@/components/common/comments/comments";
import songlist from "@/components/common/songlist/songlist";
export default {
name: "songlistDet",
  data() {
    return {
      Goods: {
        coverImgUrl: null,
        name: null,
        description: null,
        trackIds: []
      },
      songlist:[],
      simiSonglist: [],
      Comments: [],
      CommentsData: [],

    }
  },
  components: {
    comments,
    Comment,
    songlist,
    MainArticle,
    MainComment,
    MainSideBar
  },
  methods: {
    //网络请求
    getFun() {
      this.loading = false
      let _this = this
      let ids = []
      let idSrg = ''
      getSongListDet(_this.$route.params.id).then(res => {
        _this.Goods = res.data.playlist
        //循环出数组方式的歌单请求url
        for (let item of res.data.playlist.trackIds) {ids.push(item.id)}
        _this.Goods.trackIds = ids
        //循环出字符串方式歌单请求url
        for (let index in ids) {idSrg += ids[index] + ','}
        idSrg = idSrg.substr(0,idSrg.length-1)
        //请求歌曲数据
        getSongDet( idSrg ).then(res => {
          _this.songlist = res.data.songs
        })
      })
      //获取相似音乐
      getSimiSongList(_this.$route.params.id).then(res => {
        _this.simiSonglist = res.data.playlists
      })
      //获取精彩评论
      getComment(_this.$route.params.id).then(res => {
        _this.Comments = res.data.hotComments.splice(0,5)
        _this.CommentsData = res.data.comments

      })
    },
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
#songlist {
  display: flex;
  width: 1400px;
  margin: 0 auto;
  padding-top: 20px;
  #left {
    flex: 7.5;
    a {
      color: #333333;
    }
    .songlist {
      margin-top: 20px;
    }
  }
  #right {
    flex: 3;
    padding: 20px 0 20px 10px;
  }
}

</style>