//这是一个入口文件,没有办法直接挂载到HTML文件中
//挂载html文件的方法
//从nodejs中引入vue的库
import Vue from 'vue';
//加载app组件
import App from './app.vue'

import './assets/styles/global.styl'


// 往html中添加节点
const root = document.createElement("div");
document.body.appendChild(root);


// 实例化一个vue对象
new Vue({
  // 接收一个参数,这个参数是App参数,通过h(App)挂载到html中
  render:(h) => h(App)
  // 挂载部分需要调用Vue API
}).$mount(root);
