<template>
  <div id="navbar">
    <slot name="title"></slot>
    <ul>
      <li v-for="(value,index,key) in navabarTitle" @click="itemClick(index,value)" :class="{active:itemIndex===index}">
        <span>{{value.title}}</span>
        <span></span>
      </li>
    </ul>
  </div>
</template>

<script>

export default {
  name: "NavBarPro",
  data() {return {itemIndex: 0}},
  props: {navabarTitle: {type: Array,}},
  methods: {
    itemClick(index,value) {
      if (value.path) {this.$router.push(value.path)}
      else {this.itemIndex = index;this.$emit('itemClick',index)}
      }
  }
}
</script>

<style scoped lang="scss">
#navbar {
  display: flex;
  margin: 0 auto;
  width: 1400px;
  height: 54px;

  h2 {
    margin: 0;
    font-weight: bolder;
    flex:1;
  }
  ul {
    flex: 9;
    margin: 0 auto;
    display: flex;
    line-height: 54px;
    li {
      cursor: pointer;
      position: relative;
      padding: 2px 20px;;
      list-style: none;
      span:nth-child(1) {
        position: relative;
        font-size: 1em;
        color: #616161;
        z-index: 2;
      }
      span:nth-child(2) {
        display: none;
        position: absolute;
        right: 20px;
        bottom: 20px;
        height: 5px;
        width: 56%;
        background: #ffe443;
        z-index: 1;
      }
    }
  }
  .active {
    span:nth-child(1) {
      font-weight: bolder;
    }
    span:nth-child(2) {
      display: inline-block;
    }
  }
}
</style>