<template>
    <div>
      这是商品列表页面
      <span>{{$route.params.goodsId}}</span>      <!-- params是组件跟组件之间，路由切换的时候用 -->
      <br>
      <span>{{$route.params.name}}</span>
      <router-link to="/goods/title">标题</router-link>
      <router-link to="/goods/image">图片</router-link>
      <div>
        <router-view></router-view>
      </div>
      <!-- <router-link to="/cart">跳转到购物车</router-link>
      <button @click="jump">button-跳转到购物车</button> -->
      <router-link v-bind:to="{name:'Cart',params:{cartId:'qwe'}}">跳转到购物车</router-link>   <!-- params是路由的参数，并不是页面之间跳转的参数 -->
    </div>
</template>

<script>
  export default{
    data(){
      return{
        msg:'hello'
      }
    },
    methods:{
      jump(){
        // this.$router.push("/cart")
        // this.$router.push({path:"/cart"})
        this.$router.push({path:"/cart?goodsId=123"})
        // this.$router.go(-2)
      }
    }
  }
</script>

<style>
</style>
