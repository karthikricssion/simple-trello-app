<template>
  <div id="app">
    <Board />
  </div>
</template>

<script>
import Board from './components/Board.vue'

export default {
  name: 'App',
  components: {
    Board
  }
}
</script>

<style lang="less">
body {
    font-family: Arial, sans-serif;
    display: flex;
    flex-direction: column;
    background-color: #0079bf;
}
</style>
