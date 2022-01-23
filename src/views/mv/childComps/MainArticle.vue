<template>
  <div id="article">
    <ul>
      <router-link tag="li" :to="{name:'mvdet',params:{id:item.id}}" v-for="(item,index,key) in GoodsList" :key="key" :title="item.name">
        <div class="imgDiv" v-if="isShow">
          <img :src="item.cover+'?param=264y156'" alt="">
          <img src="~@/assets/img/loadImg.png" alt="" >
          <div class="itemHover">
            <play theme="two-tone" size="80" :fill="['#999999' ,'#ffffff']"/>
          </div>
        </div>
        <p>{{item.name}}</p>
        <span>{{item.artistName}} </span>
      </router-link>
    </ul>
  </div>
</template>

<script>
import {PlayOne,Play} from '@icon-park/vue'
export default {
  name: "MainArticle",
  data() {
    return {
      isShow: true
    }
  },
  props: {
    GoodsList: {
      type: Array
    },
  },
  components: {
    PlayOne,
    Play
  },
}
</script>

<style scoped>
#article {
  width: 1400px;
}
ul {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}
li {
  flex: 1 233px;
  padding-right: 10px;
  list-style: none;
  text-align: center;
  margin: 8px 0;
}
.imgDiv {
  position: relative;
  width: 264px;
  height: 156px;
  overflow: hidden;
}
img {
  width: 264px;
  height: 156px;
  transition: all 0.3s;
}
.itemHover {
  display: none;
  position: absolute;
  top: 0;
  width: 100%;
  height: 100%;
  background: rgba(116, 116, 116, 0.3);
  line-height: 156px;
}
.imgDiv:hover .itemHover {
  display: block;
}
.imgDiv:hover img{
  transform:scale(1.1);
}
span {
  cursor:pointer;
  font-size: 14px;
  color: #999;
}
p {
  width: 270px;
  height: 47.5px;
  margin: 6px 0 3px;
  overflow: hidden;
  text-overflow: ellipsis;
  cursor:pointer;
}
img {
  cursor:pointer;
}
</style>