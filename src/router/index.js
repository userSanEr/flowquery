import Vue from 'vue'
import Router from 'vue-router'
import Index from '../components/flowquery_index.vue';
import Bind from '../components/flowquery_bind.vue';
import Public from '../components/flowquery_public.vue';
import Load from '../components/flowquery_load.vue';
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index
    },
    {
      path: '/bind',
      name: 'Bind',
      component: Bind
    },
    {
      path: '/public',
      name: 'Public',
      component: Public
    },
    {
      path: '/load',
      name: 'Load',
      component: Load
    },
  ]
})
