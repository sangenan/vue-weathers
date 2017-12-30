<template>
  <div class="container">
    <template v-for="item in selectedCityContent" >
      <div @click="selectCity(item.city)">
        <span class="left">{{item.city}}</span>
        <span class="right">{{item.nowTemp}}</span>
        <m-weathericon class="center" :nowWeather="item.weatherNow"></m-weathericon>
      </div>
    </template>
  </div>
</template>
<script>
  import WeatherIcon from '../components/WeatherIcon.vue'
  import MWeathericon from "./WeatherIcon.vue";
  import bus from '../config/bus.js'

  export default {
    data() {
      return {
        selectedCityContent: []
      }
    },
    components: {
      MWeathericon,
      'm-weathericon': WeatherIcon,
    },
    created() {
      bus.$on('selectedCityContent', (selectedCityContent) => {
        this.selectedCityContent = selectedCityContent
      })
    },
    methods: {
      selectCity(city) {
        console.log('click')
        this.$store.commit('setCity', city)
        document.body.style.overflow = 'auto'
        document.body.style.overflowX = 'hidden'
        this.$store.commit('reverseNavIsOpen')
      }
    }
  }
</script>
<style scoped>
  .container {
    font-size: 0.8rem;
    font-weight: lighter;
    position: relative;
    height: 2.5rem;
    padding: 0.1rem;
  }

  .left {
    height: 2.5rem;
    line-height: 2.5rem;
  }

  .center {
    float: right;
    width: 2rem;
    height: 2rem;
    vertical-align: middle;
    margin-right: 0.5rem;
  }

  .right {
    float: right;
    height: 2.5rem;
    line-height: 2.5rem;
  }
</style>
