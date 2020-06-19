<template>
  <div id="app" class="c-flex c-flex-column full-height">
    <router-view :key="$route.path"></router-view>
  </div>
</template>

<script>
import DummyData from './dummy';

export default {
  name: 'App',
  mounted() {
    this.$store.dispatch('addBoard', DummyData[0])
  }
}
</script>

<style lang="less">
  @import url(https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap);

  html, body {
    width: 100%;
    height: 100%;
  }

  body {
      background-color: #0079bf;
      font-family: 'Roboto', sans-serif;
      overflow: hidden;
  }

  .full-height {
    height: 100%;
    min-height: 0;
  }

  .c-flex {
    display: flex;
    min-width: 0;
  }

  .c-flex-column {
    flex-direction: column;
  }

  .scroll-x {
    overflow: auto;
    
    &::-webkit-scrollbar {
      width: 2px;
      height: 5px;
    }
    &::-webkit-scrollbar-thumb {
      background: rgba(82, 80, 80, 0.5);
      border-radius: 5px;
    }
    &::-webkit-scrollbar-track {
      background: transparent;
    }
  }

</style>
