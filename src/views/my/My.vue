<template>
  <div id="My">
    <div id="left">
      <Mainheader :playlistTitle="playlistTitle" @itemClick="itemClick" @Cutover="Cutover"/>
    </div>
    <div id="right">
      <songlist :songlist="songlist" :isScroll="true"></songlist>
    </div>
  </div>
</template>

<script>
//网络请求方法引入
import {getUesrAccount,getUesrDet,getUserPlayList} from "../../network/getdata/my";
import {getTopList} from "@/network/getdata/discover";
//组件引入
import Mainheader from "./childComps/Mainheader";
import Songlist from "@/components/common/songlist/songlist";
export default {
  name: "My",
  components: {Songlist, Mainheader},
  data() {
    return {
      index: 0,
      userId: null,
      playlistId: null,
      songlist: [],
      playlistTitle: [
        {
          title: '我创建的歌单',
          data: [],
          index: '1'
        },
        {
          title: '我收藏的歌单',
          data: [],
          index: '2'
        }
      ],
    }
  },
  methods: {
    // 子组件方法
    itemClick(index1,index) {
      let data = this.playlistTitle[index1].data[index].id
      this.index = index
      this.playlistId = data
      this.PlayListsFun()
    },
    Cutover(index1) {
      this.playlistId = this.playlistTitle[index1].data[this.index].id
      this.PlayListsFun()
    },
    //轮询是否登录决定发起网络请求
    TimeOut() {
      console.log('开始判定');
      if (!this.$store.state.isLogin) {
        console.log('判定结束','通过');
        if (this.$store.state.setTime) {
          this.$store.state.isLogShow = true
          setTimeout(() => {
            this.TimeOut();
          },1000)
        }
      }
      else {
        //发起请求
        getUesrAccount().then(res => {
          this.$store.state.userId = res.data.account.id
          this.userId = res.data.account.id
        }).then(() => {
          this.UesrDetFun()
          this.UserPlayListFun()
        })
      }//获取账户信息
    },
    //网络请求代码
    UesrDetFun() {
      getUesrDet(this.userId).then(res => {
        console.log(res,this.userId,'账户详情');
      }).catch(err => console.log(err))},
    //请求歌单数量
    UserPlayListFun() {
      getUserPlayList(this.userId).then(res => {
        let data = res.data.playlist
        this.playlistId = data[0].id
        for (let i=0; i<data.length; i++) {
          if (!data[i].subscribed) {
            this.playlistTitle[0].data.push(data[i])
          } else this.playlistTitle[1].data.push(data[i]);}
        console.log(data,'歌单');
      }).then(() => {
        this.PlayListsFun()
      })
    },
    //请求歌单详情
    PlayListsFun() {
      let id = this.playlistId
      getTopList(id).then(res => {
        this.songlist = res.data.playlist.tracks
      })}
  },
  beforeRouteEnter (to, from, next) {
    next( vm => {
      if (vm.userId !== vm.$store.state.userId || vm.$store.state.userId === null) {
        vm.$store.state.setTime = true
        console.log('没有登录');
        vm.TimeOut()}
    })
  }
}
// 未登录
// 登录
// 登录后退出
// 退出后再次登录
// 缓存模式
// 需求
// 根据登录用户是否没有变化来决定要不要请求新数据
// 1
</script>

<style scoped lang="scss">
#My {
  display: flex;
  width: 1400px;
  margin: 0 auto;
  #left {
    flex: 2.5
  }
  #right {
    flex: 7.5;
    margin-top: 28px;
  }
}
</style>