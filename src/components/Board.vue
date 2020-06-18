<template>
    <section class="lists-container">
      <Lists />
      <div class="add-list-input">
        <input type="text" v-model="title" @keyup.enter="createList"  placeholder="Add new list.."/>
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
.lists-container {
  overflow-x: scroll;
  white-space: nowrap;
}
.add-list-input {
  display: inline-block;
  vertical-align: top;
}
</style>
