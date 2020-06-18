<template>
  <div v-if="getBoardLists().length" class="board-list-container">
    <Container 
      orientation="horizontal"
      drag-handle-selector=".list-drag-handle"
      @drop="onListDrop"
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
.board-list-container {
  display: inline-block;
  vertical-align: top;

  .list-wrapper {
    min-width: 300px;
  }
}
</style>
