<template>
  <div class="interface">
<!--等待确认界面-->
    <div v-if="isShow" class="loginWait">
      <close class="close" @click.native="showClick" theme="two-tone" size="17" :fill="['#333' ,'#ffffff']"/>
      <p class="text1">扫描成功</p>
<!--      用户基本信息-->
      <img :src="$store.state.userUrl+'?param=120y120'" alt="">
      <p class="text3">{{userName}}</p>
      <check-one theme="two-tone" size="57" :fill="['#333333' ,'#ffe443']"/>
      <p class="text2">请在手机上确认登录</p>
    </div>
<!--    等待扫描界面-->
    <div class="loginCode" v-else>
      <close class="close" @click.native="showClick" theme="two-tone" size="17" :fill="['#333' ,'#ffffff']"/><div>
<!--       二维码过期-->
        <div v-if="isExpired">
          <close-one theme="two-tone" size="67" :fill="['#333','#ffe443' ]"/>
        </div>
<!--        二维码-->
        <img :src="Qrurl" alt="">
      </div>
      <p v-if="isExpired">二维码已过期，请 <a href="#" @click="breakQrClick">刷新</a>。</p>
      <p v-else>请用网易云音乐APP扫描二维码</p>
    </div>
  </div>
</template>

<script>
import {CheckOne,Close,CloseOne} from '@icon-park/vue'

import {getLoginQr,getLoginQrKey,getLoginQrCheck} from "../../../network/getdata/login";
import {getUesrAccount} from "../../../network/getdata/my";
export default {
  name: "login",
  data() {
    return {
      Qrkey: null,
      Qrurl: null,
      QrCheck: null,
      isShow: false,
      isExpired: false,
      userName: null,
      setTime: true
    }
  },
  components: {
    CheckOne,
    Close,
    CloseOne
  },
  methods: {
    //组件方法
    showClick() {
      this.$store.state.setTime = false
      this.setTime = false
      this.$store.state.isLogShow = false
      if (window.location.pathname === '/My') this.$router.push('/Home/discover')
    },
    //刷新二维码
    breakQrClick() {
      this.getLoginQrFun()
      this.isExpired = false
    },
    //网络请求
    getLoginQrFun() {
      getLoginQr().then(res => {
        // 获得二维码key
        this.Qrkey = res.data.data.unikey
        if (this.Qrkey) {
          // 传入key创建二维码url
          getLoginQrKey(this.Qrkey,this.Qrkey).then(res => {
            this.Qrurl = res.data.data.qrimg
            this.getLoginQrCheckFun()
          }).catch(err => {
            console.log(err);
          })
        }
      }).catch(err => {
        console.log(err);
      })
    },
    getLoginQrCheckFun() {
      getLoginQrCheck(this.Qrkey).then(res => {
        let data = res.data
        switch (data.code) {
          case 800: this.isExpired = true; break;//二维码过期
          case 801://等待扫码
            if (this.setTime) setTimeout(this.getLoginQrCheckFun,1000)
            //console.log(data.code,this.setTime,'这位大哥还不登录');
            break;
          case 802://等待确认
            if (this.setTime) setTimeout(this.getLoginQrCheckFun,1000)
            //console.log(data,'报告长官，就差确认了！');
            this.isShow = true
            //用户信息赋值
            this.$store.state.userUrl = data.avatarUrl
            this.userName = data.nickname; break;
          case 803://登录成功
            // console.log('登录完成！',res.data);
            this.$cookies.set("token",res.data.cookie)
            this.$store.state.isLogShow = false
            this.$store.state.isLogin = true

            break;
        }
      }).catch(err => {
        console.log(err);
      })
    }
  },
  created() {
    if (!this.$store.state.isLogin) {this.getLoginQrFun()}
  },
}
</script>

<style scoped lang="scss">
  .interface {
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    z-index: 11;
    width: 100%;
    height: 100%;
    background-color: rgba(114, 114, 114, 0.3);
    color: #333333;
    >div {
      position: relative;
      width: 360px;
      height: 540px;
      margin: 0 auto;
      padding: 15px;
      box-shadow: 0 0 20px -8px #6a6a6a;
      background-color: #ffffff;
      .close {
        position: absolute;
        top: 15px;
        right: 15px;
      }
    }
    .loginCode {
      display: flex;
      justify-content: center;
      align-items: center;
      flex-wrap: wrap;
      >div {
        position: relative;
        width: 180px;
        height: 180px;
        >div {
          display: flex;
          justify-content: center;
          align-items: center;
          position: absolute;
          top: 0;
          width: 100%;
          height: 100%;
          background-color: rgba(114, 114, 114, 0.7);
        }
      }
    }
    .loginWait {
      text-align: center;
    }
  }
  .loginWait .text1 {
    margin-top: 100px;
    margin-bottom: 40px;
    font-size: 20px;
  }
  .loginWait .text2 {
    margin-top: 50px;
  }
  .loginWait .text3 {
    margin-top: 12px;
  }
</style>