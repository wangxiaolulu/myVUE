import Vue from 'vue'
import Router from 'vue-router'
import GoodsList from '@/views/GoodsList'
import Title from './../views/Title'
import Image from './../views/Image'
import Cart from './../views/Cart'

Vue.use(Router)

export default new Router({
  mode:'hash',       //hash 必须得带#/才能访问。history接近原生
  routes: [
    {
      path: '/goods',
      name: 'GoodsList',
      components: {
        default:GoodsList,
        title:Title,
        image:Image
      }
      // children:[
      //   {
      //     path:'title',
      //     name:'title',
      //     component:Title
      //   },
      //   {
      //     path:'image',
      //     name:'image',
      //     component:Image
      //   }
      // ]
    },
    {
      path:'/cart/:cartId',
      name:'Cart',
      component:Cart
    }
  ]
})
