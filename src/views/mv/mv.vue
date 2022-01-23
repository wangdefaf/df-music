<template>
<div id="mv">
<!--  头部-->

    <MainHeader id="header" :optionsList="optionsList" @headerClick="headerClick"/>

<!--    内容-->

    <MainArticle id="article" :GoodsList="GoodsList"/>

<!--  分页-->
  <pagination
      background
      layout="prev, pager, next"
      :total="pageMax"
      @current-change="currentChange"
  >
  </pagination>
</div>
</template>

<script>
//组件
import { Pagination } from 'element-ui';
import MainHeader from "./childComps/MainHeader";
import MainArticle from "./childComps/MainArticle";
//网络请求
import {getMVList} from "@/network/getdata/mv"
export default {
  name: "MV",
  data() {
    return {
      optionsList: [
        ['全部','内地','港台','欧美','日本','韩国'],
        ['全部','官方版','原生','现场版','网易出品']
      ],
      optionsValue: [],
      offset: 0,
      GoodsList: [],
      pageMax: 100
    }
  },
  methods: {
    //子组件方法
    headerClick(value) {
      this.optionsValue = value
      //console.log(value);
      this.getPlaylists()
    },
    currentChange(index) {
      this.offset = index
      this.getPlaylists()
    },
    //数据请求
    getPlaylists() {
      getMVList(this.optionsValue[0],this.optionsValue[1],this.offset*30).then(res => {
        this.GoodsList = res.data.data
        //console.log(this.GoodsList);
      }).catch(err => {
        console.log('请求失败',err);
      })
    }
  },
  // MainArticle,
  components: { MainHeader,MainArticle,Pagination },
  created() {
    this.getPlaylists()
  }
}
</script>

<style scoped lang="scss">
#header {
  margin-bottom: 40px;
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