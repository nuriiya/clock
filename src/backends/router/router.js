import { createRouter, createWebHistory } from 'vue-router'
import ValueEditer from '../../views/ValueEditor.vue'
import HistoryData from '../../views/HistoryData.vue'

const routes = [
  { path: '/value-editor', component: ValueEditer },
  { path: '/', component: ValueEditer },
  { path: '/historyData', component: HistoryData }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router