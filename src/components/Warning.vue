<template>
  <div class="Warning_container">
    <p>预警</p>
    <slot></slot>
  </div>
</template>
<script>

</script>
<style scoped>
  .Warning_container {
    width: 100%;
    height:100%;
    background: #8fff59;
    border-radius: 50%;
    font-size: 0.5rem;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
  }
  p{
    flex-grow: 1;

  }
  slot{
    flex-grow: 1;

  }
</style>
