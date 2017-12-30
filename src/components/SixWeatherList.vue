<template>
  <div class="main-container">
    <ul>
      <template v-for="item in weatherListArray">
        <li>
          <span class="left">{{item.day}}</span>
          <m-weathericon :nowWeather="item.nowWeather" class="icon"></m-weathericon>
          <span class="right">{{item.nowTemp}}</span>
        </li>
      </template>
    </ul>
  </div>
</template>
<script>
  import WeatherIcon from '../components/WeatherIcon.vue'
  import MWeathericon from "./WeatherIcon.vue";

  export default {
    props: ['weatherListArray'],
    components:{
      'm-weathericon':WeatherIcon,
    },
  }
</script>
<style scoped>
  div ul {
    list-style: none;
    font-size: 0.7rem;
    font-weight: lighter;
  }
  div ul li {
     height: 4rem;
    position: relative;

  }
  div ul li span{

  }
  div ul li .left{
    position: absolute;
    left:0;
    top:50%;
    -webkit-transform: translateY(-50%);
    -moz-transform: translateY(-50%);
    -ms-transform: translateY(-50%);
    -o-transform: translateY(-50%);
    transform: translateY(-50%);
  }
  div ul li .right{
    position: absolute;
    right:0;
    top:50%;
    -webkit-transform: translateY(-50%);
    -moz-transform: translateY(-50%);
    -ms-transform: translateY(-50%);
    -o-transform: translateY(-50%);
    transform: translateY(-50%);
  }
  div ul li .icon{
    width: 2rem;
    height: 2rem;
    display: inline-block;
    position: absolute;
    top:50%;
    left:50%;
    transform: translate(-50%,-50%);
    -webkit-transform: translate(-50%,-50%);
    -moz-transform: translate(-50%,-50%);
    -ms-transform: translate(-50%,-50%);
  }
</style>
