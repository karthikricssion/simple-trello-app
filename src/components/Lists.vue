<template>
  <div class="board-lists-wrapper">
    <Container 
      lock-axis="x"
      orientation="horizontal"
      drag-handle-selector=".list-drag-handle"
      @drop="onListDrop"
      class="board-lists"
      >
        <Draggable v-for="(item, index) in getBoardLists()" :key="index" class="list-wrapper">
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
  components: {
    Container,
    Draggable,
    List
  },

  computed: {
    ...mapGetters([
      'getBoardLists'
    ])
  },

  methods: {
    onListDrop(dropResult) {
      this.$store.dispatch('applyListDrag', dropResult)
    },

    getGhostParent() {
      return document.body;
    }
  }
}
</script>

<style lang="less">
.board-lists-wrapper {
  display: inline-block;
  vertical-align: top;

  .board-lists {
    .list-wrapper {
      background-color: #cccccc;
      margin: 8px;
      display: inline-block;
      vertical-align: top;
      min-width: 300px;
      border-radius: 3px;

      h6 {
        padding: 8px;
      }
    }
  }
}
</style>
