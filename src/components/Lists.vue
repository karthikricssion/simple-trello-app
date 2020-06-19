<template>
  <div v-if="getBoardListsById(boardId).length" class="board-list-container">
    <Container 
      orientation="horizontal"
      drag-handle-selector=".list-drag-handle"
      :get-child-payload="getListPayload(boardId)"
      @drop="onListDrop"
      >
        <Draggable v-for="(item, index) in getBoardListsById(boardId)" :key="index" class="list-wrapper">
          <List 
            :listItem="item"
            :listIndex="index"
          />
        </Draggable>
    </Container>
  </div>
</template>

<script>
import { Container, Draggable } from 'vue-smooth-dnd'
import { mapGetters } from 'vuex';
import List from './List'

export default {
  name: 'Lists',
  props: ['boardId'],
  components: {
    Container,
    Draggable,
    List
  },

  computed: {
    ...mapGetters([
      'getBoards',
      'getBoardListsById'
    ])
  },

  methods: {
    onListDrop(dropResult) {
      this.$store.dispatch('applyListDrag', dropResult)
    },

    getListPayload: function(boardId) {
      const boards = this.getBoards()
      return index => {
        return (
          boards.filter(p => p.uid === boardId)[0].lists[index]
        )
      }
    },

    getGhostParent() {
      return document.body;
    }
  }
}
</script>

<style lang="less">
.board-list-container {
  display: inline-block;
  vertical-align: top;

  .list-wrapper {
    min-width: 300px;
  }
}
</style>
