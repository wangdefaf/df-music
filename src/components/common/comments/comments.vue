<template>
  <div id="comments">
    <div class="sidebar">
      <h3>精彩评论</h3>
      <div class="items" v-if="comments.length >= 10">
        <div v-for="(item,index,key) in  comments" class="item" :key="key">
          <div class="pic"><div><img :src="item.user.avatarUrl+'?param=75y75'" alt=""></div></div>
          <div class="text">
            <p><span>{{item.user.nickname}}</span></p>
            <p>{{item.content}}</p>
          </div>
        </div>
      </div>
      <p v-else>
        <b style="font-size: 20px;"> 暂无评论 </b>
      </p>

    </div>
  </div>
</template>

<script>
export default {
name: "comments",
  props: {
    comments: {
      type: Array
    }
  }
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
  >p {text-align: center}
  .item {
    display: flex;
    margin: 15px 0;
    font-size: 17px;
    .pic {
      flex: 1;
      padding-left: 10px;
      div {
        width: 75px;
        height: 75px;
        border-radius: 50%;
        overflow: hidden;
        img {
          width: 75px;
          height: 75px;
          margin-right: 10px;
        }
      }

    }
    .text {
      flex: 15;
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
      p:nth-child(3) {
        padding-right: 10px;
        text-align: right;
      }
    }
  }
}

</style>