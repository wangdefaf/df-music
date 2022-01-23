<template>
  <div id="ranklist">
    <div class="leftCounter">
<!--      左侧导航栏-->
      <MainNavBar class="navbar" :toplists="Toplists" @toplistId="toplistId" @itemClick="itemClick"/>
    </div>
    <div class="rightCounter">
<!--      头部-->
      <mainheader :TopListDetail="TopDetail" :songlist="TopListDetail"/>
<!--      歌曲列表和分页-->
      <SongList
          class="songlist"
          :songlist="TopListDetail"
          :picUrl="picUrl"
          ref="songlist"
      />
      <paging :pageTable="pageTable"  @pageClick="pageClick"/>
    </div>
  </div>
</template>

<script>
//网络请求相关代码
import {toplistHot,toplistDetails} from '@/network/getdata/ranklist'
//组件导入
import MainNavBar from "./childComps/MainNavBar";
import Mainheader from "./childComps/Mainheader";
import SongList from "@/components/common/songlist/songlist";
import Paging from "@/components/common/paging/paging";

export default {
name: "ranklist",
  components: {Paging, SongList, Mainheader, MainNavBar},
  data() {
    return {
      Toplists: [],
      hotToplist: [],
      Toplist: [],
      ToplistValue: [],
      ToplistId: 19723756,
      TopDetail: {
        name: '飙升榜',
        updateFrequency: '刚刚更新'
      },
      picUrl: [
        require('@/assets/img/icon_first1.png'),
        require('@/assets/img/icon_first2.png'),
        require('@/assets/img/icon_first3.png')
      ],
      TopListDetail: [],
      pageTable: null,
      PageNow: 1,
    }
  },
  methods: {

    //切换请求的榜单
    toplistId(value) {
      this.ToplistId = value.id
      this.TopDetail = value
      this.$refs.songlist.pageIndex = 1
      this.toplistDetailsNetWork(this.pageNow)
    },
    //切换榜单类型时更换请求榜单
    itemClick(index) {
      this.ToplistId = this.Toplists[index][0].id
      this.toplistDetailsNetWork(this.pageNow)
    },
    //切换分页切换
    pageClick(index) {
      this.pageNow = index
      this.TopBack()
      this.toplistDetailsNetWork(this.pageNow)
    },
    //切换分页切换后回到顶部
    TopBack() {
      var clock = setInterval(function () {
        if (document.documentElement.scrollTop !== 0) {
          document.documentElement.scrollTop -= 40;
        } else {
          clearInterval(clock);
        }
      }, 1);
    },
    //网络请求方法
    toplistHotNetWork() {
      toplistHot().then(res => {
        let data =res.data.list
        for (let i=0; i<data.length; i++) {
          if (data[i].ToplistType) {
            this.hotToplist.push(data[i])
          } else this.Toplist.push(data[i])
        }
        this.Toplists.push(this.hotToplist)
        this.Toplists.push(this.Toplist)
      }).catch(err => {
        console.log(err);
      })
    },

    toplistDetailsNetWork(index) {
      toplistDetails(this.ToplistId).then(res => {
        //计算页数
        let valueOne = res.data.playlist.tracks
        for (let i = 0; i<valueOne.length; i++) {
          valueOne[i].t = i+1
        }
        if( valueOne.length %30!==0 ) {
          this.pageTable = Math.round(valueOne.length/30 + 1)
        } else this.pageTable = Math.round(valueOne.length/30)
        //设置每次只请求30条，然后第二次请求地址加30条

          this.TopListDetail = valueOne.splice((index-1) * 30,30)
        //console.log(valueOne);
      }).catch(err => {

      })
    }
  },
  created() {
  //请求歌单列表
    this.toplistHotNetWork()
  //请求歌单详情
    this.toplistDetailsNetWork(this.pageNow)
  },
}
</script>

<style scoped lang="scss">
#ranklist {
  width: 1400px;
  display: flex;
  padding-top: 40px;
  .leftCounter {
    flex: 2.5;
  }
  .rightCounter {
    padding-left: 50px;
    flex: 7.5;
    .songlist {
      margin-top: 50px;
    }
  }
}
</style>