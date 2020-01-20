
<template>
  <div
    :style="{height:height*lineNum + 'px'}"
    class="rollScreen_container"
    id="rollScreen_container"
  >
    <ul
      class="rollScreen_list"
      :style="{transform:transform}"
      :class="{rollScreen_list_unanim:num===0}"
    >
      <li
        class="rollScreen_once"
        v-for="(item,index) in contentArr"
        :key="index"
        :style="{height:height+'px'}"
      >
        <span>{{item.name}}</span>
         <el-progress
          :percentage="item.number/contentArr.length*100"
          :color="color[index]"
        ></el-progress>
      </li>
      <li
        class="rollScreen_once"
        v-for="(item,index) in contentArr"
        :key="index+contentArr.length"
        :style="{height:height+'px'}"
      >
        <span>{{item.name}}</span>
        <el-progress
          :percentage="item.number/contentArr.length*100"
          :color="color[index]"
        ></el-progress>
      </li>
    </ul>
  </div>
</template>
 
<script>
import vSwiper from "./v-swiper.js";
export default {
  props: {
    height: {
      default: 40,
      type: Number
    },
    lineNum: {
      default: 5,
      type: Number
    }
  },
  data: function() {
    return {
      contentArr: [],
      num: 0,
      color: [
        "#55A532",
        "#18C79C",
        "#63A35C",
        "#008A00",
        "rgba(220,87,18,1)",
        "rgba(229,131,8,1)",
        "rgba(244,208,0,1)",
        "rgba(138,151,123,1)",
        "rgba(182,194,154,1)",
        "rgba(131,175,155,1)"
      ]
    };
  },
  async mounted() {
    let datas = await vSwiper.queryCategoryList();
    this.contentArr = datas.datas;
  },
  computed: {
    transform: function() {
      return "translateY(-" + this.num * this.height + "px)";
    }
  },
  created: function() {
    let _this = this;
    setInterval(function() {
      if (_this.num !== _this.contentArr.length) {
        _this.num++;
      } else {
        _this.num = 0;
      }
    }, 3000);
  }
};
</script>
 
<style>
.rollScreen_container {
  display: inline-block;
  position: relative;
  overflow: hidden;
}
.rollScreen_list {
  transition: 1s linear;
}
.rollScreen_list_unanim {
  transition: none;
}
.rollScreen_container{
    width:100%;
}
</style>