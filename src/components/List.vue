<template>
  <div class="single-list-container">
    <h6 class="list-drag-handle">{{listItem.data}}
      <delete-icon @click="deleteList" fillColor="#838b91" :size="18" />
    </h6>

    <Cards 
      :listId="listItem.uid" 
      :listIndex="listIndex"
      :list="listItem"
    />

    <template v-if="view.addCard">
      <div class="add-card-input-area">
        <textarea 
          ref="typeBox"
          v-model="description" 
          @keyup.enter.exact="createCard"
        />
        <div class="add-card-actions">
          <button class="btn btn-success" @click="createCard">Add</button>
          <button class="btn btn-link" @click="view.addCard = false; description = ''">Cancel</button>
        </div>
      </div>
    </template>

    <template v-else>
      <button class="add-new-card-btn" @click="openAddCard()">Add a card..</button>
    </template>

  </div>
</template>

<script>
import Cards from './Cards';

const newCardObj = (cardDescription, listItem) =>  {
  return {
    boardId: listItem.boardId,
    listId: listItem.uid,
    uid: (Date.now()).toString(),
    title: '',
    description: cardDescription,
    comments: []
  }
}

export default {
  name: 'List',
  props: ['listItem', 'listIndex'],
  components: {
    Cards
  },
  data() {
    return {
      description: '',
      view: {
        addCard: false
      }
    }
  },

  methods: {
    createCard: function() {
      var cardDescription = this.description.trim()
      if(cardDescription) {
        var self = this
        this.$store.dispatch('addCardToList', newCardObj(cardDescription, self.listItem))
        this.view.addCard = false
        this.description = ''
      } else {
        console.log('Dude, u need have a look at the card title')
      }
    },

    openAddCard: function() {
      this.view.addCard = true
      var self = this      
      setTimeout(function () {
        self.$refs.typeBox.focus()
      }, 1)
    },

    deleteList: function() {
      this.$store.dispatch('removeList', this.listItem)
    }
  }
}

</script>

<style lang="less">

.single-list-container {
  background-color: #e2e4e6;
  white-space: normal;
  border-radius: 3px;
  overflow: hidden;
  margin: 8px 0px 8px 8px;
  width: 300px;
  box-shadow: 0 1px 3px 0 rgba(0,0,0,.2), 0 1px 1px 0 rgba(0,0,0,.14), 0 2px 1px -1px rgba(0,0,0,.12);

  h6 {
    padding: 8px;
    margin: 0;
    position: relative;
    padding-right: 32px;

    span {
      position: absolute;
      top: 4px;
      right: 4px;
      padding: 4px;
      cursor: pointer;

      &:hover {
        opacity: 0.6;
      }
    }
  }
}

.add-card-input-area {
  padding: 0 8px 8px 8px;
  
  textarea {
    font-size: 14px;
    font-weight: 400;
    line-height: 1.3;
    background-color: #fff;
    padding: 8px;
    color: #4d4d4d;
    border: 0;
    border-bottom: 1px solid #ccc;
    border-radius: 3px;
    outline: 0 !important;
    resize: none;
    width: 100%;
  }

  .add-card-actions {
    button {
      text-transform: uppercase;
      font-size: 14px;
      font-weight: 400;
      margin-right: 8px;;

      &.btn-link {
        color: #4d4d4d;
        text-decoration: none;
      }
    }
  }
}

.add-new-card-btn {
  border: 0;
  background-color: transparent;
  cursor: pointer;
  padding: 8px;
  display: block;
  width: 100%;
  text-align: left;
  color: #838c91;
  font-size: 16px;
  outline: 0 !important;

  &:hover {
    background-color: #cdd2d4;
    color: #4d4d4d;
    text-decoration: underline;
  }
}

</style>

