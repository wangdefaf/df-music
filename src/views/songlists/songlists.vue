<template>
<div id="singer">
<!--  头部-->

    <MainHeader id="header" :optionsLists="optionsLists" @headerClick="headerClick"/>

<!--    内容-->

    <MainArticle :GoodsList1="GoodsList1" :GoodsList2="GoodsList2"/>

</div>
</template>

<script>
//组件
import MainHeader from "./childComps/MainHeader";
//网络请求
import {toplistHot} from "@/network/getdata/songlist"
import MainArticle from "./childComps/MainArticle";
export default {
  name: "singer",
  data() {
    return {
      optionsLists: [
        [ {name:'热门',value:null},
          {name:'A',value:'A'},
          {name:'B',value:'B'},
          {name:'C',value:'C'},
          {name:'D',value:'D'},
          {name:'E',value:'E'},
          {name:'F',value:'F'},
          {name:'G',value:'G'},
          {name:'H',value:'H'},
          {name:'I',value:'I'},
          {name:'J',value:'J'},
          {name:'K',value:'K'},
          {name:'L',value:'L'},
          {name:'M',value:'M'},
          {name:'N',value:'N'},
          {name:'O',value:'O'},
          {name:'P',value:'P'},
          {name:'Q',value:'Q'},
          {name:'R',value:'R'},
          {name:'S',value:'S'},
          {name:'G',value:'G'},
          {name:'U',value:'U'},
          {name:'V',value:'V'},
          {name:'W',value:'W'},
          {name:'X',value:'X'},
          {name:'Y',value:'Y'},
          {name:'Z',value:'Z'}],
        [{name:'全部',value:-1},{name:'男歌手',value:1},{name:'女歌手',value:2},{name:'乐队',value:3}],
        [{name:'全部',value:-1},{name:'华语',value:7},{name:'欧美',value:96},{name:'日本',value:8},{name:'日本',value:16},{name:'其他',value:0}]
      ],
      optionsValue: [null,null,null],
      GoodsList1: [],
      GoodsList2: []
    }
  },
  methods: {

    headerClick(value) {
      this.optionsValue = value
      this.getPlaylists()
    },
    //数据请求
    getPlaylists() {
      toplistHot(this.optionsValue).then(res => {
        let value = res.data.artists
        this.GoodsList1 = value.splice(0,12)
        this.GoodsList2 = value.splice(12,100)
      }).catch(err => {
        console.log('请求失败',err);
      })
    }
  },
  components: {MainArticle, MainHeader},
  created() {
    this.getPlaylists()
  }
}
</script>

<style scoped lang="scss">
#header {
  margin-bottom: 40px;
}
</style>