import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Exams from '../views/Exams.vue'
import Admin from '../views/Admin.vue'
import Exam from '../views/Exam.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/exams',
    name: 'Exams',
    component: Exams
  },
  {
    path: '/exam/:id',
    name: 'Exam',
    component: Exam
  },
  {
    path: '/admin',
    name: 'Admin',
    component: Admin
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
