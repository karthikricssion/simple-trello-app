<template>
  <div class="draggable-item">
    <h6 class="list-drag-handle">{{listItem.data}}</h6>

    <Cards 
      :listId="listItem.uid" 
      :listIndex="listIndex"
      :list="listItem"
    />

    <input type="text" 
      v-model="title" 
      @keyup.enter="createCard"
    />

  </div>
</template>

<script>
import Cards from './Cards';
const newCardObj = (cardTitle) =>  {
  return {
    data: cardTitle,
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
      title: ''
    }
  },
  methods: {
    createCard: function() {
      var cardTitle = this.title.trim()
      if(cardTitle) {
        var self = this
        this.$store.dispatch('addCardToList', {
          listId: self.listItem.uid, 
          card: newCardObj(cardTitle)
        })
        this.title = ''
      } else {
        console.log('Dude, u need have a look at the card title')
      }
    }
  }
}

</script>

<style lang="less">

</style>

