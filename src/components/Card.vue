<template>
  <div class="card card-drag-handle">
    {{cardItem.description}}
  </div>
</template>

<script>
export default {
  name: 'Card',
  props: ['cardItem']
}
</script>

<style lang="less">
.card {
  font-size: 16px;
  font-weight: 400;
  line-height: 1.3;
  background-color: #fff;
  padding: 8px;
  color: #4d4d4d;
  border-bottom: 1px solid #ccc;
  border-radius: 5px;
  margin-bottom: 8px;
}
</style>
