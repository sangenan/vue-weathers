<template>
  <div>
    <button @click="getSixDayWeather"></button>
    <m-weathericon id="m-weathericon" :nowWeather="nowWeather"></m-weathericon>
    <m-input></m-input>

  </div>
</template>
<script>
  import api from '../api/api.js'
  import WeatherIcon from '../components/WeatherIcon.vue'
  import ACI from '../components/ACI.vue'
  import SixWeatherList from '../components/SixWeatherList.vue'
  import Input from '../components/Input.vue'
  export default {
    components:{
      'm-weathericon':WeatherIcon,
      'm-aci':ACI,
      'm-sixweatherlist':SixWeatherList,
      'm-input':Input
    },
    data(){
      return{
        top:'30',
        nowWeather:'晴',
        weatherListArray:[
          {
            day:'星期二',
            nowWeather:'晴',
            nowTemp:'32  25'
          },
          {
            day:'星期二',
            nowWeather:'晴',
            nowTemp:'32  25'
          }, {
            day:'星期二',
            nowWeather:'晴',
            nowTemp:'32  25'
          }, {
            day:'星期二',
            nowWeather:'晴',
            nowTemp:'32  25'
          }
          ]
      }
    },
    methods:{
      getSixDayWeather(){
        api.getSixDayWeathers('杭州').then(res=>{

        })
      }
    }
  }
</script>
<style>
button {
  width: 100px;
  height: 100px;
  background: rebeccapurple;
}
#m-weathericon{
  width: 200px;
  height: 200px;
}
</style>
