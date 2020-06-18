<template>
    <section class="board-container">
      <Lists />
      <div class="add-list-input-wrapper">
        <div class="add-list-input">
          <input type="text" v-model="title" @keyup.enter="createList"  placeholder="Add new list.." />
        </div>
      </div>
    </section>
</template>

<script>
import Lists from './Lists';

const newListObj = (listTitle) =>  {
  return {
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
      title: ''
    }
  },

  methods: {
    createList: function() {
      var listTitle = this.title.trim()
      if(listTitle) {
        this.$store.dispatch('addListToBoard', newListObj(listTitle))
        this.title = ''
      } else {
        console.log('Dude, u need have a look at the list')
      }
    }
  }
}
</script>

<style lang="less">
.board-container {
  display: flex;
}

.add-list-input-wrapper {
  // flex: 0 0 300px;
  width: 300px;

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
