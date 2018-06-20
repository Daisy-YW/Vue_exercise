// 本身使用的javascript语法,跟Vue的区别是将vue中的template中的html节点卸写在了render()方法中
// 这就是jsx的写法,无论是jsx的render还是vue的template到最后后会被转化为createElement方法

import '../assets/styles/footer.styl'

export default{
  // 声明一个data,并将参数传入,基本为组件的初始值
  data(){
    return{
      author: "jokcy"
    }
  },
  render(){
    return(
      <div id="footer">
        {/* 注意: 使用jsx的时候,数据调用使用的{}单花括号,和Vue中的{{}}双花括号是有区别的 */}
        <span>Written by {this.author}</span>
      </div>
    )
  }
}
