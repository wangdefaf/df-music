<template>
  <div id="artist">
    <Mainheader :playListTag="playListTag" @tagFun="tagFun" @navClick="navClick"/>
    <MainSongList :playlists="playlists" class="songlist"/>
    <pagination
        background
        layout="prev, pager, next"
        :total="pageMax"
        @current-change="currentChange"
    >
    </pagination>
  </div>
</template>
<!--:current-page="curpage"&ndash;&gt;-->
<!--        @current-change="pageClick"-->
<script>
//网络请求
import { getPlayListCatlist,getPlayListDetails } from "@/network/getdata/artist"
//ui组件库
import { Pagination } from 'element-ui';
import Mainheader from "./childComps/Mainheader";
import MainSongList from "./childComps/MainSongList";
import PagingPro from "../../components/common/paging/pagingPro";
export default {
name: "artist",
  components: {PagingPro, MainSongList, Mainheader,Pagination},
  data() {
    return {
      playListTag: [
        // {
        //   Cat: '',
        //   CateGorie: null
        // }
      ],
      cat: '全部歌单',
      order: 'hot',
      playlists: [],
      pageMax:100,
      offset: 0
    }
  },
  mounted() {

  },
  methods: {
  //网络请求方法
    NetgetPlayListCatlist() {
      getPlayListCatlist().then(res => {
        this.playListTag = JSON.parse(JSON.stringify(this.playListTag))

        for (let i=0; i<5; i++) {
          let obj = {Cat1: '', cate_gorie: [] }
          obj.Cat1 = res.data.categories[''+i+'']
          //生成标签列表
          this.playListTag.push(obj)
        }
        this.playListTag.push({Cat1: '默认', cate_gorie: [{name:'全部歌单'}] })
        let value = res.data.sub
        // 分类标签
        for (let i=0; i<value.length; i++) {
          let index =value[i].category
          this.playListTag[index].cate_gorie.push(value[i])
        }
        this.playListTag.reverse()
      }).catch(err => {
        console.log('请求失败',err);
      })

    },

    NetgetPlayListDetails() {
      getPlayListDetails(this.order,this.cat,this.offset*50).then(res => {
        this.playlists = res.data.playlists.splice(2,48)
      }).catch(err => {
        console.log('请求失败',err);
      })
    },

  //子组件方法
    tagFun(tag) {
      this.cat = tag
      this.NetgetPlayListDetails()
    },
    navClick(value) {
      this.order = value
      this.NetgetPlayListDetails()
    },
    currentChange(index) {
      this.offset = index
      this.NetgetPlayListDetails()
    }
  },
  created() {
  // 请求标签
    this.NetgetPlayListCatlist()

  //  请求歌单信息
    this.NetgetPlayListDetails()
  }
}
</script>

<style scoped lang="scss">
.songlist {
  margin-top: 10px;
}

::v-deep {
  .el-pagination.is-background {
    width:700px;
    margin: 0 auto;
  }
  .el-pagination.is-background button {
    width: 50px;
  }
  .el-pagination.is-background .el-pager li{
    width: 50px;
  }
  .el-pagination.is-background .el-pager li:not(.disabled) {
    background-color: #fff;   // 进行修改未选中背景和字体
     color: #5a5a5a;
  }
  .el-pagination.is-background .el-pager li:not(.disabled).active {
    background-color: #ffe443;   // 进行修改选中项背景和字体
    color: #000000;
  }
}
</style>