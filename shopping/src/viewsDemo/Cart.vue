<template>
  <div>
    购物车页面
    <span>{{$route.query.goodsId}}</span>
  </div>
</template>

<script>
  export default{
    data(){
      return{
        msg:'购物车'
      }
    }
  }
</script>

<style>
</style>
