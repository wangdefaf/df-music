<template>
  <div id="Article">
    <div id="song">
      <div id="left">
        <MainArticle :Goods="Goods">
          <a href="#comment">
            <Comment theme="two-tone" size="30" :fill="['#333' ,'#ffffff']"/>
            <span>评论</span>
          </a>
        </MainArticle>
        <comments :comments="CommentsData"/>
      </div>
      <div id="right">
        <MainSideBar :simiSong="simiSong"/>
        <MainComment :Comments="Comments"/>
      </div>
    </div>
  </div>
</template>

<script>
import {Comment} from '@icon-park/vue'
import {getSongDet,getLyric,getSimiSong,getComment} from '@/network/getdata/song'
import MainArticle from "./childeComps/MainArticle";
import MainSideBar from "./childeComps/MainSideBar";
import MainComment from "@/components/common/comments/MainComment";
import comments from "@/components/common/comments/comments";
export default {
  name: "song",
  components: {comments, Comment, MainComment, MainSideBar ,MainArticle},
  data() {
    return {
      Goods: {
        name: null,
        al: {
          picUrl: null,
          name: null
        },
        ar: []
      },
      p:null,
      simiSong: [],
      Comments: [],
      CommentsData: [],
      lrcs:[],
    }
  },
  methods: {

    // 切割歌词
    lyricChange(lrc) {
      this.$store.commit('lrcChange')
      for (let i=0;i<lrc.length; i++) {
        let lyrics = lrc[i].split("\n");//rc代表歌词文件内容的引用
        let lrcObj = {};
        for(let i=0;i<lyrics.length;i++){
          let lyric = decodeURIComponent(lyrics[i]);
          let timeReg = /\[\d*:\d*((\.|\:)\d*)*\]/g;
          let timeRegExpArr = lyric.match(timeReg);
          if(!timeRegExpArr)continue;
          let clause = lyric.replace(timeReg,'');
          for(let k = 0,h = timeRegExpArr.length;k < h;k++) {
            let t = timeRegExpArr[k];
            let min = Number(String(t.match(/\[\d*/i)).slice(1)),
                sec = Number(String(t.match(/\:\d*/i)).slice(1));
            let time = min * 60 + sec;
            lrcObj[time] = clause;
          }}
        this.$store.state.lrc[i] = lrcObj
      }
    },

    //网络请求
    getFun() {
      let _this = this
      // let state = _this.$store.state
      let id =_this.$route.params.id
      getSongDet(_this.$route.params.id).then(res => {
        _this.Goods = res.data.songs[0]
      //  console.log(_this.Goods,'数据');
      })
      //获取歌词
      getLyric(id).then(res => {
        if (res.data.tlyric) {
          _this.lrcs = []
          if (res.data.tlyric.lyric) {
            _this.lrcs[0] = res.data.lrc.lyric
            _this.lrcs[1] = res.data.tlyric.lyric
          } else _this.lrcs[0] = res.data.lrc.lyric
          _this.lyricChange(_this.lrcs)
        } else {_this.$store.commit('lrcChange')}
       // console.log(res.data.tlyric,'歌词',state.lrc);
      })
      //获取相似音乐
      getSimiSong(id).then(res => {
        _this.simiSong = res.data.songs
        // console.log(_this.simiSong,'相似音乐');
      })
      //获取精彩评论
      getComment(id).then(res => {
        _this.Comments = res.data.hotComments.splice(0,5)
        _this.CommentsData = res.data.comments
        // console.log(res.data.hotComments.splice(0,5),'评论');
      })
    }
  },
  watch: {
    '$route.params.id'() {
      if (this.$route.params.id) this.getFun()
     // console.log('变了变了');
    }
  },
  beforeRouteEnter (to, from, next) {
    next( vm => {
      // 获取歌单详情
      vm.getFun()
    })
  }
}
</script>

<style scoped lang="scss">
  #song {
    display: flex;
    width: 1400px;
    margin: 0 auto;
    padding-top: 20px;

    #left {
      flex: 7.5;
      a {
        color: #333333;
      }
    }
    #right {
      flex: 3;
      padding: 20px 0 20px 10px;
    }
    .active {
      font-weight: bolder!important;
      font-size: 30px!important;
    }
  }

</style>