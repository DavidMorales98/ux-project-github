import Vue from 'vue'
import VueRouter from 'vue-router'
import LoginView from '../views/LoginView.vue'
import AccountView from '../views/AccountView.vue'
import RecordView from '../views/RecordView.vue'
import TransferView from '../views/TransferView.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView
  },
  {
    path: '/account',
    name: 'account',
    component: AccountView
  },
  {
    path: '/record',
    name: 'record',
    component: RecordView
  },
  {
    path: '/transfer',
    name: 'transfer',
    component: TransferView
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
