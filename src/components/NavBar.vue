<template>
  <div id="nav-container" :class="{open:navIsOpen,close:!navIsOpen}">
    <div id="back-container">
      <svg class="icon" aria-hidden="true" id="icon-daohang" @click="closeDrawer">
        <use xlink:href="#icon-fanhui"></use>
      </svg>
    </div>
    <div id="content-container">
      <m-input class="m-input"></m-input>
      <m-selectedcitylist class="m-list" v-show="!inputIsClick"></m-selectedcitylist>
    </div>
  </div>
</template>
<script>
  import {mapState} from 'vuex'
  import Input from '../components/Input.vue'
  import SelectedCityList from '../components/SelectedCityList.vue'
  import bus from '../config/bus.js'

  export default {
    name: 'm-navbar',
    components: {
      'm-input': Input,
      'm-selectedcitylist':SelectedCityList
    },
    computed: {
      ...mapState({
        navIsOpen: state => state.navIsOpen,
      })
    },
    data(){
      return{
        inputIsClick:false
      }
    },
    methods: {
      closeDrawer() {
        this.$store.commit('reverseNavIsOpen')
        document.body.style.overflow = 'auto'
        document.body.style.overflowX = 'hidden'
      }
    },
    created () {
      bus.$on('inputIsClick', (flag) => {
         this.inputIsClick = flag
      })
    }
  }
</script>
<style scoped>
  #nav-container {
    position: fixed;
    top: 0;
    width: 80vw;
    height: 100%;
    left: -80vw;
    z-index: 1000;
    transition: all 0.3s ease-out;
    background: white;
    box-shadow: 0 1px 20px rgba(0, 0, 0, .117647);
    overflow: auto;
  }

  #nav-container.open {
    left: 0;
  }

  #nav-container.close {
    left: -81vw;
  }

  .icon {
    width: 1.5rem;
    height: 1.5rem;
    vertical-align: -0.15rem;
    fill: currentColor;
    overflow: hidden;
  }

  #back-container {
    margin: 1vw;
  }

  #content-container {
    position: relative;
    margin: 2vw;
  }

  .m-input {
    left: 0;
    right: 0;
    margin: 0 auto;
  }
  .m-list{
    margin-top: 2rem;
  }
</style>
