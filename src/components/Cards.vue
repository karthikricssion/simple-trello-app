<template>
  <div class="list-cards-container">
    <Container 
      group-name="list"
      drag-class="card-ghost"
      drop-class="card-ghost-drop"
      :get-child-payload="getCardPayload(listId)"
      :animation-duration="100"
      @drop="e => onCardDropComplete(e, list, listIndex)"
      >
        <Draggable v-for="(item, index) in getListCardsyId(listId)" :key="index" class="single-card">
          <Card :cardItem="item" />
        </Draggable>
    </Container>
  </div>
</template>

<script>
import { Container, Draggable } from 'vue-smooth-dnd'
import { mapGetters } from 'vuex';
import Card from './Card'

const applyDrag = (arr, dragResult) => {
  const { removedIndex, addedIndex, payload } = dragResult
  if (removedIndex === null && addedIndex === null) return arr

  const result = [...arr]
  let itemToAdd = payload

  if (removedIndex !== null) {
    itemToAdd = result.splice(removedIndex, 1)[0]
  }

  if (addedIndex !== null) {
    result.splice(addedIndex, 0, itemToAdd)
  }

  return result
}

export default {
  name: 'Cards',
  props: ['listId', 'listIndex', 'list'],
  components: {
    Container,
    Draggable,
    Card
  },

  computed: {
    ...mapGetters([
      'getListCardsyId',
      'getBoardLists'
    ])
  },

  methods: {
    onCardDropComplete (dropResult, list, listIndex) {
      if (dropResult.removedIndex !== null || dropResult.addedIndex !== null) {
        const newColumn = Object.assign({}, this.list)
        newColumn.cards = applyDrag(newColumn.cards, dropResult)
        this.$store.commit('moveCard', {
          columnIndex: listIndex,
          newColumn: newColumn
        })
      }
    },

    getCardPayload (columnId) {
      const lists = this.getBoardLists()
      return index => {
        return (
          lists.filter(p => p.uid === columnId)[0].cards[index]
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
.list-cards-container {
  padding: 8px;

  .single-card {
    &:last-child {
      .card {
        margin-bottom: 0;
      }     
    }
  }
}
</style>
