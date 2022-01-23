<template>
  <div id="toplist">
    <nav-bar :navabar-title="NavBarArray" class="navbar">
      <h2 slot="title">排行榜</h2>
    </nav-bar>
    <ul id="songList">
      <li class="songlistitem" v-for="(item,index) in TopList">
        <div class="imgs">
          <p></p>
          <img :src="imgUrlArray[index]" alt="">
        </div>
        <ul>
          <router-link tag="li" :to="{name:'song',params:{id:item.id}}" v-for="(item,index,key) in item" :key="key">
            <i :class="classNames[index]">
              <span>{{index+1}}</span>
            </i>
            <div class="info" :title="item.name">
              <span>{{item.name}}</span>
              <router-link class="icon" v-if="item.mv" tag="span" :to="{name:'mvdet',params:{id:item.mv}}">
                <img  src="~@/assets/img/mvicon.png" alt="">
              </router-link>
              <router-link tag="p" :to="{name:'singer',params:{id:item.ar[0].id}}">{{item.ar[0].name}}</router-link>
            </div>
          </router-link>
        </ul>
      </li>
    </ul>
  </div>
</template>

<script>
import NavBar from "../../../components/content/nav-bar/NavBar";
export default {
name: "MaintopList",
  data() {
    return {
      NavBarArray: [
        {
          title: '更多>',
          path: '/Home/rankList',
          length: '3'
        }
      ],
      classNames: [
          'icon_1',
          'icon_2',
          'icon_3',
          'ico1n_4',
          'ico1n_4'
      ],
      imgUrlArray: [
        require('../../../assets/img/home/discover/img1.png'),
        require('../../../assets/img/home/discover/img2.png'),
        require('../../../assets/img/home/discover/img3.png'),
        require('../../../assets/img/home/discover/img4.png'),
        require('../../../assets/img/home/discover/img5.png'),
      ]
    }
  },
  props: {
    TopList: {
      type: Array,
      default() {}
    }
  },
  components: {NavBar}
}
</script>

<style scoped lang="scss">
.navbar {
  padding: 0;
  line-height: 57px;
}
#songList {
  display: flex;
  justify-content: space-between;
  background: #eee;
  margin-top: 10px;
  box-shadow: -10px -10px 40px #eee;
  .songlistitem {
    width: 264px;
    list-style: none;
    position: relative;
    .imgs {
      width: 264px;
      height: 145px;
      overflow: hidden;
      vertical-align: middle;
      position: relative;
      img {
        position: relative;
        width: 264px;
        z-index: 6;
      }
    }
    >ul {
      box-sizing: border-box;
      width: 264px;
      height: 284px;
      background: #fff;
      padding: 28px 0px 26px 0px;
      >li {
        height: 46px;
        font-size: 16px;
        list-style: none;
        i {
          display: inline-block;
          width: 40px;
          height: 100%;
        }
        i[class^='icon'] {
          background-size: 30px 30px;
          background-repeat: no-repeat;
          background-position: 0px 5px;
          span {
            display: none;
          }
        }
        i[class^='ico1n'] {
          text-align: center;
          position: relative;
          bottom: 20px;
          right: 4px;
          font-size: 18px;
          font-style: normal;
          font-weight: bold;
        }
        .info {
          display: inline-block;
          width: 200px;
          height: 46px;
          overflow:hidden;
          text-overflow:ellipsis;
          white-space:nowrap;
          >span:nth-child(1) {
            margin-right: 10px;
          }
          .icon {
            img {
              height: 12px;
              width: 26px;
            }
          }
          p {
            margin: 0;
            font-size: 14px;
            color: #ccc;
            cursor: pointer;
          }
          p:hover {
            text-decoration: underline;
          }
          span {
            margin: 0;
            cursor: pointer;
          }
          span:hover {
            text-decoration: underline;
          }
        }
      }
      .icon_1 {
        background: url("../../../assets/img/icon_first1.png");
      }
      .icon_2 {
        background: url("../../../assets/img/icon_first2.png");
      }
      .icon_3 {
        background: url("../../../assets/img/icon_first3.png");
      }
    }
  }
}
</style>