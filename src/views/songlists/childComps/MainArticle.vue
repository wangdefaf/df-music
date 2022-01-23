<template>
  <div id="Article">
    <div class="top">
      <router-link tag="div" :to="{name:'singer',params:{id:item.id}}" v-for="(item,index,key) in GoodsList1" :key="key">
        <img :src="item.img1v1Url+'?param=160y160'" alt="">
        <p>{{item.name}}</p>
        <span>{{item.musicSize+'首单曲'}} </span>
      </router-link>
    </div>

    <div class="bottom">
      <router-link tag="div" :to="{name:'singer',params:{id:item.id}}" v-for="(item,index,key) in GoodsList2" :key="key" style="text-align: left">
        <img :src="item.img1v1Url+'?param=38y38'" alt="">
        <span>{{item.name}} </span>
      </router-link>

    </div>
  </div>
</template>

<script>
export default {
  name: "MainArticle",
  props: {
    GoodsList1: {
      type: Array
    },
    GoodsList2: {
      type: Array
    }
  }
}
</script>

<style scoped lang="scss">
#Article {
  width: 1400px;
  >div {
    display: flex;
    flex-wrap:wrap;
    justify-content: space-between;
    >div {
      flex: 1 233px;
      text-align: center;
      margin: 8px 0;
      img {
        cursor:pointer;
        border-radius: 50%;
      }
      p {
        cursor:pointer;
        margin: 6px 0 3px;
      }
      span {
        cursor:pointer;
        font-size: 14px;
        color: #999;
      }
    }
  }
}
.bottom {
  div {
    text-align: left;
    img {
      width: 38px;
      height: 38px;
    }
    span {
      margin-left: 10px;
    }
  }
}
</style>