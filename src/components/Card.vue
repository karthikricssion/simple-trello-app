<template>
  <div class="card-drag-handle">
    <div class="card" @click="showModal = true">
      {{cardItem.description}}
      <close-icon @click="deleteCard" :size="18" />
    </div>
    <CardEdit 
      v-if="showModal" 
      @close="showModal = false" 
      :itemToEdit="cardItem" 
      :listIndex="listIndex" 
      @deleteCard="deleteCard"
    />
  </div>
</template>

<script>
  import CardEdit from './CardEditModal.vue';
  
  export default {
    name: 'Card',
    props: ['cardItem', 'listIndex'],
    components: {
      CardEdit
    },
    data() {
      return {
        showModal: false
      }
    },
    methods: {
      deleteCard: function() {
        var self = this
        this.$store.dispatch('removeBoardListCard', self.cardItem )
      }
    }
  }
</script>

<style lang="less">
.card {
  font-size: 14px;
  font-weight: 400;
  line-height: 1.3;
  background-color: #fff;
  padding: 8px;
  color: #4d4d4d;
  border-bottom: 1px solid #ccc;
  border-radius: 5px;
  margin-bottom: 8px;
  position: relative;
  cursor: pointer;
  padding-right: 35px;

  span {
    position: absolute;
    top: 4px;
    right: 4px;
    padding: 4px;
    cursor: pointer;
    border-radius: 50%;
    width: 28px;
    text-align: center;

    &:hover {
      background-color: #ececec;
      opacity: 0.6;
    }
  }
}
</style>
