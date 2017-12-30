<template>
  <div class="main-container" :class="{move:isClick}">
    <div class="input-container" @click="isClick=true">
      <input class="input" placeholder="请输入城市" @keyup.enter="onEnter" v-model="inputCity"/>
      <span class="bar"></span>
      <svg class="icon" aria-hidden="true" :class="{rotate:isClick}" @click.stop="isClick=false">
        <use xlink:href="#icon-zhankai"></use>
      </svg>
    </div>
    <div class="city-container" v-show="isClick">
      <span v-for="(item,index) in cityArray" class="city" @click="selectCity(index,$event)" :id="'city'+index "
            v-touchlight>{{item}}</span>
    </div>
  </div>

</template>
<script>
  import bus from '../config/bus.js'

  export default {
    data() {
      return {
        isClick: false,
        cityArray: [
          '自动定位', '北京', '上海', '广州', '深圳', '武汉', '南京', '杭州', '西安',
          '郑州', '成都', '东莞', '沈阳', '天津', '重庆', '哈尔滨', '长沙', '福州',
          '厦门', '石家庄', '苏州', '无锡', '济南', '大连', '佛山', '南昌', '太原',
          '长春', '合肥', '南宁', '青岛', '汕头', '昆明', '海定'
        ],
        selectedCityArray: [],
        isTouchStart: false,
        inputCity: ''
      }
    },
    watch: {
      isClick() {
        bus.$emit('inputIsClick', this.isClick)
      }
    },
    mounted() {
      this.configLocalStorage()
    },
    methods: {
      onEnter() {
        this.isClick = false
        this.$store.commit('setCity', this.inputCity)
        document.body.style.overflow = 'auto'
        document.body.style.overflowX = 'hidden'
        this.$store.commit('reverseNavIsOpen')
        var index = this.cityArray.indexOf(this.inputCity)
        if (index != -1) {
          document.getElementById('city' + index).style.color = 'red'
          this.selectedCityArray.push({
            id: index,
            city: this.inputCity
          })
        }
        else{
          this.selectedCityArray.push({city: this.inputCity})
        }
        this.inputCity = ''
      },
      selectCity(index, event) {
        this.isClick = false
        this.$store.commit('setCity', this.cityArray[index])
        document.body.style.overflow = 'auto'
        document.body.style.overflowX = 'hidden'
        this.$store.commit('reverseNavIsOpen')
        var hasKey = false
        for (let i = 0; i < this.selectedCityArray.length; ++i) {
          if (this.selectedCityArray[i].id == index) {
            hasKey = true;
          }
        }
        if (!hasKey)
          this.selectedCityArray.push(
            {
              id: index,
              target: event.currentTarget,
              city: this.cityArray[index]
            })
        event.currentTarget.style.color = 'red'
      },
      configLocalStorage() {
        var localdata = window.localStorage.getItem('selectedCityArray')
        if (localdata != null) {
          this.selectedCityArray = JSON.parse(localdata)
          for (let i = 0; i < this.selectedCityArray.length; ++i) {
            document.getElementById('city' + this.selectedCityArray[i].id).style.color = 'red'
          }
        }
        window.addEventListener('beforeunload', () => {
          window.localStorage.setItem('selectedCityArray', JSON.stringify(this.selectedCityArray))

        })

      }
    },
    directives: {
      touchlight: {
        inserted: function (el, binding) {

          el.addEventListener('touchstart', () => {
            el.style.backgroundColor = 'rgba(22, 144, 206, 0.62)'
            el.style.color = 'white'
          })
          el.addEventListener('touchend', () => {
            el.style.backgroundColor = 'white'
            el.style.color = 'black'
          })


        }
      }
    }
  }
</script>
<style scoped>
  .main-container {
    top: 2rem;
    transition: 0.3s ease all;
    -moz-transition: 0.3s ease all;
    -webkit-transition: 0.3s ease all;
    position: relative;
  }

  .input-container {
    position: relative;
  }

  .move {
    top: 0rem;
  }

  .input {
    width: 100%;
    border: none;
    border-bottom: 1px solid #757575;
    padding: 10px 10px 10px 5px;
    outline: none;
    font-size: 1rem;
    font-weight: lighter;
    height: 2rem;
  }

  .bar {
    width: 100%;
    display: block;
    position: relative;
  }

  .bar:before {
    left: 50%;
  }

  .bar:after {
    right: 50%;
  }

  input:focus ~ .bar:before, input:focus ~ .bar:after {
    width: 50%;
  }

  .bar:before, .bar:after {
    content: '';
    height: 2px;
    width: 0;
    bottom: 1px;
    position: absolute;
    background: #5264AE;
    transition: 0.3s ease all;
    -moz-transition: 0.3s ease all;
    -webkit-transition: 0.3s ease all;
  }

  .icon {
    width: 1em;
    height: 1em;
    vertical-align: -0.15em;
    fill: currentColor;
    overflow: hidden;
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    margin: auto 0;
    margin-right: 10px;
    transition: 0.3s ease all;
    -moz-transition: 0.3s ease all;
    -webkit-transition: 0.3s ease all;
    transform: rotate(45deg);
  }

  .rotate {
    transform: rotate(0);
  }

  .city-container {
    width: 100%;
  }

  .city-container .city {
    display: inline-block;
    width: 33.3%;
    font-size: 0.6rem;
    height: 2rem;
    line-height: 2rem;
    text-align: center;
    font-weight: lighter;
  }

  .touched {
    background: rgba(22, 144, 206, 0.62);
    color: white;
  }

</style>
