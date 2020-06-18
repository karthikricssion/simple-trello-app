<template>
  <div class="card-drag-handle">
    {{cardItem}}
  </div>
</template>

<script>
export default {
  name: 'Card',
  props: ['cardItem']
}
</script>

<style lang="less">
.card-drag-handle {
  display: block;
  background-color: #fff;
  border-radius: 3px;
}
</style>
