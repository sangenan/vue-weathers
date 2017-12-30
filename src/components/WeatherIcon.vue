<template>
  <div>
    <svg class="icon" aria-hidden="true">
      <use v-bind:xlink:href="iconName"></use>
    </svg>
  </div>
</template>
<script>
  import * as Constant from '../config/Constant.js'

  export default {
    props: [
      'nowWeather'
    ],
    name: 'm-weathericon',
    data() {
      return {
        iconName: '#icon-icon-test22'
      }
    },
    watch: {
      nowWeather() {
        this.switchWeather(this.nowWeather)
      }
    },
    mounted() {
      this.switchWeather(this.nowWeather)
    },
    methods: {
      switchWeather(weather) {
        switch (weather) {
          case "晴":
            this.iconName = Constant.WEATHER_ICON_MAP.get('sun')
            break;
          case "小雨":
            this.iconName = Constant.WEATHER_ICON_MAP.get('lightRain')
            break;
          case "雷阵雨":
          case "阵雨":
            this.iconName = Constant.WEATHER_ICON_MAP.get('thunderRain')
            break;
          case "中雨":
            this.iconName = Constant.WEATHER_ICON_MAP.get('moderateRain')
            break;
          case "大雨":
            this.iconName = Constant.WEATHER_ICON_MAP.get('heavyRain')
            break;
          case "暴雨":
            this.iconName = Constant.WEATHER_ICON_MAP.get('rainStorm')
            break;
          case "阴":
            this.iconName = Constant.WEATHER_ICON_MAP.get('overcast')
            break;
          case "多云":
            this.iconName = Constant.WEATHER_ICON_MAP.get('cloudy')
            break;
          case "霾":
            this.iconName = Constant.WEATHER_ICON_MAP.get('fogHaze')
            break;
          case "雾":
            this.iconName = Constant.WEATHER_ICON_MAP.get('fog')
            break;
          case "小雪":
            this.iconName = Constant.WEATHER_ICON_MAP.get('lightSnow')
            break;
          case "中雪":
            this.iconName = Constant.WEATHER_ICON_MAP.get('moderateSnow')
            break;
          case "大雪":
            this.iconName = Constant.WEATHER_ICON_MAP.get('greatSnow')
            break;
          case "暴雪":
            this.iconName = Constant.WEATHER_ICON_MAP.get('heavySnow')
            break;
          case "雨夹雪":
            this.iconName = Constant.WEATHER_ICON_MAP.get('sleet')
            break;
          default:
            this.iconName = Constant.WEATHER_ICON_MAP.get('unknow')
            break;
        }
      }
    }
  }
</script>
<style>
  .icon {
    width: 100%;
    height: 100%;
    vertical-align: -0.15em;
    fill: currentColor;
    overflow: hidden;
  }
</style>
