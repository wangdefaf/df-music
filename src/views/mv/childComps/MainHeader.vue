<template>
  <header>
    <div v-for="(item,index1,key) in optionsList" :key="key">
        <span
            v-for="(value,index,key) in item"
            @click="itemClick(index1,index,value)"
            :class="{active:optionsIndex[index1]===index}"
            :key="key">
          {{value}}
        </span>
    </div>
  </header>
</template>

<script>
export default {
  name: "MainHeader",
  data() {
    return {
      optionsIndex: [0,0],
      optionsValue: ['全部','全部']
    }
  },
  methods: {
    itemClick(index1,index,value) {
      this.$set(this.optionsIndex,index1,index)
      this.optionsValue[index1] = value
      this.$emit('headerClick',this.optionsValue)
      //console.log(this.optionsValue);
    }
  },
  props: {
    optionsList: {
      type: Array
    }
  }
}
</script>

<style scoped lang="scss">
header {
>div {
  margin: 14px 0;
span {
  display: inline-block;
  border-radius: 20px;
  padding: 2px 13px;
  margin-right:6px;
  font-size: 14px;
  color: #6d6d6d;
  cursor:pointer;
}
.active {
  background: #ffe443;
  color: #000;
}
}
}
</style>