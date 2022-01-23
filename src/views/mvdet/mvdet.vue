<template>
  <div id="mvdet">
    <div id="left">
      <video ref="video" :src="mvUrl" controls width="1024px" height="576"></video>
      <MainArticle id="Article" :Goods="Goods"/>
      <comments :comments="CommentsData"/>
    </div>
    <div id="right">
      <MainSideBar :simiSong="simiMv"/>
    </div>
  </div>

</template>

<script>
import {getMvUrl,getMvDet,getMvSimi,getComment} from '@/network/getdata/mv'
import MainArticle from "./childComps/MainArticle";
import MainSideBar from "./childComps/MainSideBar";
import comments from "@/components/common/comments/comments";
export default {
  name: "mvdet",
  mounted() {
    //reurn false 禁止函数内部执行其他的事件或者方法
    const videoElement = this.$refs.video
    let vol = 0.1;  //1代表100%音量，每次增减0.1
    let time = 10; //单位秒，每次增减10秒
    //console.log(videoElement.paused);
    videoElement.addEventListener('play', function () {//播放开始执行的函数
      //console.log('播放');
      document.querySelector('#player').pause()
    });
    document.onkeyup = function (event) {//键盘事件
     let e = event || window.event

      //鼠标上下键控制视频音量
      if (e && e.keyCode === 38) {

        // 按 向上键
        videoElement.volume !== 1 ? videoElement.volume += vol : 1;
        return false;

      } else if (e && e.keyCode === 40) {

        // 按 向下键
        videoElement.volume !== 0 ? videoElement.volume -= vol : 1;
        return false;

      } else if (e && e.keyCode === 37) {

        // 按 向左键
        videoElement.currentTime !== 0 ? videoElement.currentTime -= time : 1;
        return false;

      } else if (e && e.keyCode === 39) {

        // 按 向右键
        videoElement.volume !== videoElement.duration ? videoElement.currentTime += time : 1;
        return false;

      } else if (e && e.keyCode === 32) {

        // 按空格键 判断当前是否暂停
        videoElement.paused === true ? videoElement.play() : videoElement.pause();
        return false;
      }

    };
  },
  components: {
    MainArticle,
    MainSideBar,
    comments
  },
  data() {
    return {
      Goods: {},
      mvUrl: null,
      simiMv: [],
      CommentsData: [],
    }
  },
  methods: {
    //网络请求
    getFun() {
      let _this = this
      let id =_this.$route.params.id
      getMvDet(_this.$route.params.id).then(res => _this.Goods = res.data.data)
      //获取MV地址
      getMvUrl(id).then(res => _this.mvUrl = res.data.data.url)
      //获取相似MV
      getMvSimi(id).then(res => _this.simiMv = res.data.mvs)
      //获取精彩评论
      getComment(id).then(res => _this.CommentsData = res.data.comments)
    },
  },
  created() {
    this.getFun()
  },
  watch: {
    '$route.params.id'() {
      if (this.$route.params.id) this.getFun()
    }
  },
}
</script>

<style scoped lang="scss">
#mvdet {
  display: flex;
  width: 1400px;
  margin: 0 auto;
  padding-top: 20px;

#left {
  flex: 7.5;
  #Article {
    margin-bottom: 20px;
  }
}
#right {
  flex: 2.5;
  padding: 0 0 20px 10px;
}

}
</style>