<template>
  <div>
    <ul class="hourweather-container">
      <li>
        <div class="container">
          <p>上午</p>
          <m-weathericon class="hour-weather-icon" :nowWeather="weatherIconArray[0]"></m-weathericon>
          <p>{{weatherTempArray[0]}}</p>
        </div>
      </li>
      <li>
        <div class="container">
          <p>下午</p>
          <m-weathericon class="hour-weather-icon" :nowWeather="weatherIconArray[1]"></m-weathericon>
          <p>{{weatherTempArray[1]}}</p>
        </div>
      </li>
      <li>
        <div class="container">
          <p>前半夜</p>
          <m-weathericon class="hour-weather-icon" :nowWeather="weatherIconArray[2]"></m-weathericon>
          <p>{{weatherTempArray[2]}}</p>
        </div>
      </li>
      <li>
        <div class="container">
          <p>后半夜</p>
          <m-weathericon class="hour-weather-icon" :nowWeather="weatherIconArray[3]"></m-weathericon>
          <p>{{weatherTempArray[3]}}</p>
        </div>
      </li>
    </ul>
  </div>
</template>
<script>
  import WeatherIcon from '../components/WeatherIcon.vue'
  import MWeathericon from "./WeatherIcon.vue";

  export default {
    components: {
      'm-weathericon': WeatherIcon
    },
    props:['weatherIconArray','weatherTempArray'],
    data(){
      return{
      }
    },


  }
</script>
<style scoped>
  .hourweather-container {
    display: flex;
    flex-direction: row;
    justify-content: center;
    height: 20vh;
  }

  ul {
    list-style: none;
    height: 100%;
  }

  li {
    flex-grow: 1;
    height: 100%;
  }

  ul li .container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    font-size: 0.7rem;
    font-weight: lighter;
    height: 100%;
  }

  ul li .container p {
    padding: 0.2rem;
  }

  ul li .container .hour-weather-icon {
    width: 50%;
    height: 50%;
  }
</style>
