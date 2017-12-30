<template>
  <div id="main-container">
    <m-header></m-header>
    <m-navbar></m-navbar>
    <div class="menu-mask" @click="clickMenu" v-show="navIsOpen"></div>
    <m-messagebox @messageBoxResult="messageBoxResult" :isOpen="boxIsOpen"></m-messagebox>
    <div id="now_weather_content">
      <div id="left_content">
        <p id="now_temp">{{nowTemp}}</p>
        <m-aci id="ACI">{{ACI}}</m-aci>
      </div>
      <div id="right_content">
        <p>{{nowDay}}</p>
        <p>{{nowWeather}}</p>
        <p>{{nowWind}}</p>
      </div>
    </div>
    <m-weathericon :nowWeather="weatherNow" id="m-weathericon"></m-weathericon>
    <m-hourweather :weatherIconArray="weatherIconArray" :weatherTempArray="weatherTempArray"></m-hourweather>
    <m-sixweatherlist :weatherListArray="weatherListArray"></m-sixweatherlist>
  </div>
</template>
<script>
  import header from '../components/Header.vue'
  import MessageBox from '../components/MessageBox.vue'
  import NavBar from '../components/NavBar.vue'
  import ACI from '../components/ACI.vue'
  import {mapState} from 'vuex'
  import api from '../api/api.js'
  import WeatherIcon from '../components/WeatherIcon.vue'
  import HourWeather from '../components/HourWeather.vue'
  import SixWeatherList from '../components/SixWeatherList.vue'
  import bus from '../config/bus.js'

  export default {
    data() {
      return {
        nowTemp: '0°',
        ACI: '44',
        nowDay: '',
        nowWeather: '',
        nowWind: '',
        weatherNow: '',
        weatherIconArray: [],
        weatherTempArray: [],
        weatherListArray: [],
        selectedCityContent: [],
        cityList: []
      }
    },
    computed: {
      ...mapState({
        boxIsOpen: state => state.boxIsOpen,
        navIsOpen: state => state.navIsOpen,
        city: state => state.city
      })
    },
    components: {
      'm-header': header,
      'm-messagebox': MessageBox,
      'm-navbar': NavBar,
      'm-aci': ACI,
      'm-weathericon': WeatherIcon,
      'm-hourweather': HourWeather,
      'm-sixweatherlist': SixWeatherList
    },
    mounted() {
      this.getNowDay()
      this.configLocalStorage()
    },
    watch: {
      city() {
        this.getSixDayWeather(this.city)
      },
      selectedCityContent() {
        for (let i = 0; i < this.selectedCityContent.length; ++i) {
          var flag = false
          for (let j = 0; j < this.cityList.length; ++j) {
            if (this.cityList[j] == this.selectedCityContent[i].city) {
              flag = true
            }
          }
          if (flag != true)
            this.cityList.push(this.selectedCityContent[i].city)
        }
      }


    },
    methods: {
      clickMenu() {
        this.$store.commit('reverseNavIsOpen')
        document.body.style.overflow = 'auto'
        document.body.style.overflowX = 'hidden'
      },
      messageBoxResult(flag) {
        this.$store.commit('setBoxIsOpen', false)
        if (flag) {
          this.$store.commit('reverseNavIsOpen')
          this.$store.commit('reverseBoxIsOpen')
        }
      },
      getNowDay() {
        var myDate = new Date();
        this.nowDay = (myDate.getMonth() + 1) + '/' + myDate.getDate()
      },
      configLocalStorage() {
        var localdata = window.localStorage.getItem('selectedCityArray')
        if (localdata != null) {
          var selectedCityArray = JSON.parse(localdata)
          for (let i = 0; i < selectedCityArray.length; ++i) {
            this.getWeatherContent(selectedCityArray[i].city)
          }
        }
      },
      getNowWeekday(n = 0) {
        var week = new Date().getDay();
        week = week + n
        if (week > 6) {
          week = week - 7
        }
        switch (week) {
          case 0 :
            return '星期天'
            break;
          case 1 :
            return '星期一'
            break;
          case 2 :
            return '星期二'
            break;
          case 3 :
            return '星期三'
            break;
          case 4 :
            return '星期四'
            break;
          case 5 :
            return '星期五'
            break;
          case 6 :
            return '星期六'
            break;
        }
      },
      getWeatherContent(city) {
        api.getSixDayWeathers(city).then(res => {
          var data = res.data
          this.selectedCityContent.push(
            {
              city: city,
              nowTemp: data.NewDataSet.Table1.tempNow + '°',
              weatherNow: data.NewDataSet.Table1.weatherNow
            }
          )
        })
      },
      getSixDayWeather(city) {
        api.getSixDayWeathers(city).then(res => {
          var data = res.data
          var flag = false
          this.weatherIconArray.length = 0
          this.weatherTempArray.length = 0
          this.weatherListArray.length = 0
          this.nowTemp = data.NewDataSet.Table1.tempNow + '°'
          this.ACI = data.NewDataSet.Table1.AQIData
          this.nowWeather = data.NewDataSet.Table1.temp1 + "  " + data.NewDataSet.Table1.weatherNow
          this.nowWind = data.NewDataSet.Table1.winNow
          this.weatherNow = data.NewDataSet.Table1.weatherNow
          this.weatherIconArray.push(data.NewDataSet.Table2.sixweather1)
          this.weatherIconArray.push(data.NewDataSet.Table2.sixweather2)
          this.weatherIconArray.push(data.NewDataSet.Table2.sixweather3)
          this.weatherIconArray.push(data.NewDataSet.Table2.sixweather4)

          this.weatherTempArray.push(data.NewDataSet.Table2.highTemp1 + '/' + data.NewDataSet.Table2.lowTemp1)
          this.weatherTempArray.push(data.NewDataSet.Table2.highTemp2 + '/' + data.NewDataSet.Table2.lowTemp2)
          this.weatherTempArray.push(data.NewDataSet.Table2.highTemp3 + '/' + data.NewDataSet.Table2.lowTemp3)
          this.weatherTempArray.push(data.NewDataSet.Table2.highTemp4 + '/' + data.NewDataSet.Table2.lowTemp4)

          for (let i = 0; i < this.selectedCityContent.length; ++i) {
            if (city == this.selectedCityContent[i].city) {
              flag = true
            }
          }
          if (flag == false) {
            this.selectedCityContent.push(
              {
                city: city,
                nowTemp: data.NewDataSet.Table1.tempNow + '°',
                weatherNow: data.NewDataSet.Table1.weatherNow
              }
            )
          }
          bus.$emit('selectedCityContent', this.selectedCityContent)
          this.weatherListArray.push({
            day: this.getNowWeekday(1),
            nowWeather: data.NewDataSet.Table1.weather2,
            nowTemp: data.NewDataSet.Table1.temp2
          })
          this.weatherListArray.push({
            day: this.getNowWeekday(2),
            nowWeather: data.NewDataSet.Table1.weather3,
            nowTemp: data.NewDataSet.Table1.temp3
          })
          this.weatherListArray.push({
            day: this.getNowWeekday(3),
            nowWeather: data.NewDataSet.Table1.weather4,
            nowTemp: data.NewDataSet.Table1.temp4
          })
          this.weatherListArray.push({
            day: this.getNowWeekday(4),
            nowWeather: data.NewDataSet.Table1.weather5,
            nowTemp: data.NewDataSet.Table1.temp5
          })
          this.weatherListArray.push({
            day: this.getNowWeekday(5),
            nowWeather: data.NewDataSet.Table1.weather6,
            nowTemp: data.NewDataSet.Table1.temp6
          })
        })
      }
    },
  }
</script>
<style scoped>
  #main-container {
    margin: 1vw;
    position: relative;
    padding-top: 1px;
  }

  #now_weather_content {
    margin-top: 2rem;
    overflow: hidden;
  }

  #now_temp {
    font-size: 3rem;
    font-weight: lighter;
  }

  #ACI {
    width: 1.8rem;
    height: 1.8rem;
    font-size: 0.5rem;
  }

  #left_content {
    float: left;
    width: 5rem;
  }

  #right_content {
    float: right;
    font-size: 0.8rem;
  }

  #m-weathericon {
    width: 100vw;
    height: 20vh;
  }

  .menu-mask {
    position: fixed;
    z-index: 1;
    width: 100vw;
    height: 100vh;
    background: rgba(0, 0, 0, .25);
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
    top: 0;
  }
</style>
