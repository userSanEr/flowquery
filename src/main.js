import Vue from 'vue'
import App from './App'
import Router from 'vue-router'
import router from './router'
import store from './store/index'
import Axios from 'axios'

// console.log(Router.prototype)
const routerPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return routerPush.call(this, location).catch(error=> error)
}

Axios.defaults.baseURL=process.env.VUE_APP_BASE_API;

//请求拦截器
Axios.interceptors.request.use(function(config){
  store.state.isShow=true; //在请求发出之前进行一些操作
  return config
})
//定义一个响应拦截器
Axios.interceptors.response.use(function(config){
  store.state.isShow=false;//在这里对返回的数据进行处理
  return config
})

//公共的js方法
import common from './commonFunction/common';
Vue.prototype.common= common;

Vue.prototype.$http=Axios

new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
