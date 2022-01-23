<template>
  <div class="sidebar">
    <h3>精彩评论</h3>
    <div class="items" v-if="Comments">
      <div v-for="(item,index,key) in Comments" class="item" :key="key">
        <div class="pic">
          <img :src="item.user.avatarUrl+'?param=69y69'" alt="">
        </div>
        <div class="text">
          <p class="sing">
            <span>{{item.user.nickname}}</span>
          </p>
          <p class="song">{{item.content}}</p>
        </div>
      </div>
    </div>
    <h3 v-else>暂无评论</h3>
  </div>
</template>

<script>
import {PlayOne} from '@icon-park/vue'
export default {
  name: "MainComment",
  methods: {
    avatarUrl(item) {
      return item.user.avatarUrl && item.user?item.user.avatarUrl:undefined
    }
  },
  props: {
    Comments: {
      type: Array
    },
  },
  components: {PlayOne,},

}
</script>

<style scoped lang="scss">
.sidebar {
  h3 {
    font-size: 25px;
    border-bottom: 1px solid #ccc;
    padding-bottom: 15px;
    margin-bottom: 20px;
  }
  .item {
    display: flex;
    margin: 15px 0;
    font-size: 17px;

    .pic {
      flex: 2;
      height:69px;
      border-radius: 50%;
      overflow: hidden;
    }
    .text {
      flex: 9.5;
      box-sizing: border-box;
      padding-left: 10px;
      line-height: 30px;
      p:nth-child(1) {
        padding-right: 10px;
        margin-bottom: 10px;
        span:nth-child(2) {
          float: right;
          margin-bottom: 4px;
        }
      }
      p:nth-child(2) {
        border-radius: 5px;
        padding: 8px;
        background-color: #f1f1f1;
      }
    }
  }
}

</style>