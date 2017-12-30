<template>
  <div id="header-container">
    <svg class="icon" aria-hidden="true" id="icon-fenlei" @click="openDrawer">
      <use xlink:href="#icon-fenlei"></use>
    </svg>
    <div id="center-container">
      <svg class="icon" aria-hidden="true" id="icon-daohang">
        <use xlink:href="#icon-daohang"></use>
      </svg>
      <span id="city-name">{{city}}</span>
    </div>
    <svg class="icon" aria-hidden="true" id="icon-fenxiang">
      <use xlink:href="#icon-fenxiang"></use>
    </svg>
  </div>
</template>
<script>
  import * as Constant from '../config/Constant.js'
  import {mapState} from 'vuex'

  export default {
    name: 'm-header',
    computed: {
      ...mapState({
        city: state => state.city
      })
    },
    created() {
      this.getLocation()
    },
    methods: {
      getLocation() {
        var geolocation = new qq.maps.Geolocation(Constant.GEOLOCATION_KEY, Constant.GEOLOCATION_PROJECT_NAME);
        geolocation.getLocation((successResult) => {
          var city = successResult.city.slice(0, successResult.city.length - 1)
          this.$store.commit('setCity', city);
        }, () => {
          this.$store.commit('setCity', Constant.GEOLOCATION_ERROR);
          this.$store.commit('setBoxIsOpen', true)
        })
      },
      openDrawer() {
        this.$store.commit('reverseNavIsOpen')
        document.body.style.overflow = 'hidden'
      }
    }
  }
</script>
<style scoped>
  #header-container {
    position: absolute;
    text-align: center;
    width: 100%;
    height: 2rem;
    top: 0;
  }

  #icon-fenlei {
    position: absolute;
    left: 0.1rem;
    top: 50%;
    transform: translateY(-50%);

  }

  #icon-daohang {
    width: 0.7rem;
    height: 0.7rem;

  }

  #icon-fenxiang {
    position: absolute;
    right: 0.1rem;
    top: 50%;
    transform: translateY(-50%);
  }

  #city-name {
    vertical-align: middle;
  }

  .icon {
    width: 1.5rem;
    height: 1.5rem;
    vertical-align: -0.15rem;
    fill: currentColor;
    overflow: hidden;
  }

  #center-container {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    -webkit-transform: translate(-50%, -50%);
    -moz-transform: translate(-50%, -50%);
    -ms-transform: translate(-50%, -50%);
  }
</style>
