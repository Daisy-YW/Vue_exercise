// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
//import ComponentA from "./components/componentA"

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  //components,页面所引入的组件,组件两个以及两个以上使用数组
  components: { App },
  //在需要的地方安插DOM,而安插DOM已经制定为#app,template指定#app中安插APP组件内容
  template: '<App/>'
})
