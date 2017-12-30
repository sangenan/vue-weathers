<template>
  <transition name="fade">
    <div id="main-container" v-show="isOpen">
      <div id="message-container">
        <svg class="icon" aria-hidden="true" id="icon">
          <use xlink:href="#icon-icon-c-question"></use>
        </svg>
        <p id="slot-content">定位失败，是否手动选择城市？</p>
        <div id="bt-cancel" @click="cancel">取消</div>
        <div id="bt-confirm" @click="confirm">确定</div>
      </div>
    </div>
  </transition>
</template>
<script>
  export default {
    name: 'm-messagebox',
    props: ['isOpen'],
    data() {
      return {}
    },
    methods: {
      cancel() {
        this.$emit('messageBoxResult', false)
      },
      confirm() {
        this.$emit('messageBoxResult', true)
      }
    }
  }
</script>
<style scoped>

  #main-container {
    font-size: 0.7rem;
    background: rgba(0, 0, 0, 0.20);
    width: 100vw;
    height: 100vh;
    position: fixed;
    z-index: 1000;
    top: 0;
  }

  #message-container {
    width: 300px;
    height: 180px;
    position: absolute;
    background: white;
    top: 50%;
    left: 50%;
    -webkit-transform: translate(-50%, -50%);
    -moz-transform: translate(-50%, -50%);
    -ms-transform: translate(-50%, -50%);
    -o-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
    box-shadow: 0 3px 20px -2px rgba(0, 0, 0, 0.25);
    border-radius: 5px;
    text-align: center;
    transition: all 0.5s ease-in;
  }

  #icon {
    width: 1.5rem;
    height: 1.5rem;
    vertical-align: -0.15rem;
    fill: currentColor;
    overflow: hidden;
    display: inline-block;
    height: 54px;
    line-height: 54px;
  }

  #slot-content {
    height: 54px;
    line-height: 54px;
  }

  #bt-cancel {
    float: left;
    width: 50%;
    height: 72px;
    line-height: 72px;
  }

  #bt-confirm {
    float: left;
    width: 50%;
    height: 72px;
    line-height: 72px;
    color: #3da8ff;
  }

  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s
  }

  .fade-enter, .fade-leave-to {
    opacity: 0
  }
</style>
