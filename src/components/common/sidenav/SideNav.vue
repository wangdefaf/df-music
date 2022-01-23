<template>
<div ref="sidenav">
  <backtop :bottom="100">
    <to-top theme="outline" size="35" fill="#808080"/>
  </backtop>
<!--  <ul :style="{opacity:'0.'+index}">-->
<!--    <li @click="TopBack">-->
<!--      -->
<!--    </li>-->
<!--  </ul>-->
</div>
</template>
<script>
import {ToTop,Windows,Android,Apple} from '@icon-park/vue'
import {Backtop} from 'element-ui'
export default {
name: "SideNav",
  data() {
    return {
      index: 0,
    }
  },
  mounted() {
    window.addEventListener('scroll',this.Scroll,true)
  },
  methods: {
    Scroll() {
      let scrollTop= document.body.scrollTop || document.documentElement.scrollTop;
      let MaxHeight = document.body.scrollHeight - 920
      let value = Math.round((scrollTop/MaxHeight)*100)
      // console.log(scrollTop,MaxHeight,);
      if (value <= 99) {
        this.index = value
      }
    },
    TopBack() {
      var clock = setInterval(function () {
        if (document.documentElement.scrollTop != 0) {
          document.documentElement.scrollTop -= 40;
        } else {
          clearInterval(clock);
        }
      }, 1);
    }
  },
  components: {
  ToTop,
  Windows,
  Android,
  Apple,
  Backtop
}
}
</script>

<style scoped>
ul {
  background: rgba(158, 158, 158, 0);
}
li:nth-child(1) {
  color: #f5f5f5;
  font-size: 19px;
}
 li {

}
</style>