import Vue from 'vue'
import Router from 'vue-router'

import home from  '../pages/home.vue'
import productOrder from '../pages/productOrder.vue'
import productList from '../pages/productList.vue'
import productReview from '../pages/productReview.vue'
import productCategory from '../pages/productCategory.vue'
import enter from '../pages/enter.vue'
import login from '../components/login.vue'
import register from '../components/register.vue'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/home',
      component: home,
      children: [
        {
          path: '/home/',
          redirect: '/home/productOrder',
          component: productOrder,
        },
        {
          path: '/home/productOrder',
          component: productOrder
        },
        {
          path: '/home/productList',
          component: productList
        },
        {
          path: '/home/productCategory',
          component: productCategory
        },
        {
          path: '/home/productReview',
          component: productReview
        },
      ]
    },
    {
      path: '/',
      component: enter, 
      children:[
        {
          path: '/enter',
          redirect: '/enter/register',
          component: register,
        },
        {
          path: '/enter/register',
          component: register,
        },
        {
          path: '/enter/login',
          component: login,
        },
      ]
    }
  ]


  
})
