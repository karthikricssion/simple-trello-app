<template>
  <div class="container">
    <div class="row"> 
      <div class="col-6">
        <div class="create-board-page">
          <div class="input-group mb-3">
            <input type="text" 
              ref="boardInput"
              v-model="title"
              @keyup.enter="createBoard"
              class="form-control" 
              placeholder="Give a name for board" 
              aria-label="Give a name for board" 
              aria-describedby="basic-addon2">
            <div class="input-group-append">
              <button class="btn btn-success" @click="createBoard" type="button">Create Board</button>
            </div>
          </div>
        </div>
      </div>  
    </div>

    <div class="row"> 
      <div class="col-3" v-for="(board, index) in getBoards()" :key="index">
        <router-link :to="{ name: 'board', params: { id: board.uid } }" class="single-board">
          {{board.title}}
        </router-link>
      </div>
    </div>

  </div>
</template>

<script>

import { mapGetters } from 'vuex'

var newBoardObj = function(title) {
  return {
    title: title,
    lists: []
  }
}

export default {
    name: 'Home',
    data() {
      return {
        title: ''
      }
    },

    computed: {
      ...mapGetters([
        'getBoards'
      ])
    },

    methods: {
      createBoard: function() {
        var self = this
        var boardTitle = this.title.trim()
        if(boardTitle) {
          this.$store.dispatch('addBoard', newBoardObj(boardTitle))
          setTimeout(function () {
            self.$refs.boardInput.focus()
          }, 1)
          this.title = ''
        } else {
          console.log('Dude, u need have a look at the list')
        }
      }
    }
}
</script>

<style lang="less">
.create-board-page {
  padding-top: 16px;
  padding-bottom: 16px;
}

.single-board {
  text-decoration: none;
  color: #333;
  text-align: center;
  display: block;
  min-height: 40px;
  margin-bottom: 16px;
  background-color: #ffffff;
  font-size: 18px;
  line-height: 4;
  border-radius: 5px;

  &:hover {
    opacity: 0.8;
    color: #333;
    text-decoration: none;
  }
}

</style>
