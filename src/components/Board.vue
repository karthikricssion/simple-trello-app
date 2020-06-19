<template>
  <div v-if="!load" class="c-flex c-flex-column full-height">
    <div class="board-details">
      <div class="board-lists">
        <router-link :to="{ name: 'home' }" class="home-icon-link">
          <home-icon fillColor="#fff" />
        </router-link>
        <b-dropdown id="dropdown-1" text="Boards" class="m-md-2">
          <b-dropdown-item 
            v-for="(board, index) in getBoards()" 
            :key="index"
            :to="{ name: 'board', params: { id: board.uid } }"
          >
            {{board.title}}
          </b-dropdown-item>
        </b-dropdown>
        <div class="board-title">
          <input type="text" v-model="board.title" placeholder="Give a name for Board" />
        </div>
      </div>
    </div>
    <section class="board-container full-height scroll-x">
      <Lists :boardId="boardId" />
      <div class="add-list-input-wrapper">
        <div class="add-list-input">
          <input type="text" v-model="title" @keyup.enter="createList"  placeholder="Add new list.." />
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import Lists from './Lists';

const newListObj = (listTitle, boardId) =>  {
  return {
    boardId: boardId,
    data: listTitle,
    cards: []
  }
}
 
export default {
  name: 'Board',
  components: {
    Lists
  },
  data() {
    return {
      boardId: '',
      load: true,
      title: '',
      board: {}
    }
  },

  beforeMount() {
    let boardId = this.$route.params.id
    if(boardId) {
      this.getBoardDetails(boardId)
    }
  },

  computed: {
    ...mapGetters([
      'getBoards',
      'getBoardById'
    ])
  },

  methods: {
    getBoardDetails: function(boardId) {
      this.boardId = boardId
      this.board = this.getBoardById(boardId)
      this.load = false
    },

    createList: function() {
      var listTitle = this.title.trim()
      if(listTitle) {
        this.$store.dispatch('addListToBoard', newListObj(listTitle, this.boardId))
        this.title = ''
      } else {
        console.log('Dude, u need have a look at the list')
      }
    }
  }
}
</script>

<style lang="less">
.board-details {
  height: 56px;
  background-color: #0067a3;

  .board-lists {
    button {
      background-color: #4c94be;
      border-radius: 0.3rem;
      transition: background-color 150ms;
    }

    .home-icon-link {
      display: inline-block;
      vertical-align: top;
      padding: 8px;
      margin: 8px;
    }

    .board-title {
      display: inline-block;
      vertical-align: top;
      padding: 8px;

      input {
        border: 0;
        background-color: transparent;
        color: #fff;
        text-transform: capitalize;
        font-size: 18px;
        padding: 5px;
        min-width: 300px;
        
        &::placeholder {
          color: #a5cae0;
          opacity: 1; 
        }

        &:-ms-input-placeholder {
          color: #a5cae0;
        }

        &::-ms-input-placeholder {
          color:#a5cae0;
        }
      }
    }
  }
}

.board-container {
  display: block;
  white-space: nowrap;
}

.add-list-input-wrapper {
  // flex: 0 0 300px;
  width: 300px;
  display: inline-block;
  vertical-align: top;

  .add-list-input {
    background-color: #006aa7;  
    border-radius: 5px;
    transition: background-color 150ms;
    margin: 8px;

    input {
      border: 0;
      width: 100%;
      background-color: transparent;
      padding: 8px;
      font-size: 16px;
      font-weight: 400;
      color: #a5cae0;

      &::placeholder {
        color: #a5cae0;
        opacity: 1; 
      }

      &:-ms-input-placeholder {
        color: #a5cae0;
      }

      &::-ms-input-placeholder {
        color:#a5cae0;
      }
    }
  }
}
</style>
