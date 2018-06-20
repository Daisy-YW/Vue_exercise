<template>
  <!-- v-bind动态绑定一个或多个特性 -->
  <!-- 这里动态添加class,可以是数据的形式,共有样式todo-item,根据todo.complate状态来添加class -->
    <div :class="['todo-item',todo.completed ? 'completed' :'' ]" :click="test()">
      <!-- checkbox 选中之后，v-model绑定的值如果是布尔类型，该值会变成true ，再点击会变成false，可以看一下官方文档 -->
        <input
        type="checkbox"
        class="toggle"
        v-model="todo.completed"
        >
        <label> {{todo.content}}</label>
        <button class="destroy" @click="deletetodo"> </button>
    </div>
</template>
<script>
export default {
  props: {
      todo: {
          type: Object,
          required: true
      }
  },
  methods : {
    test:function(){
      console.log(this)
    },
      deletetodo(){
          this.$emit("del",this.todo.id);
      }
  }
}
</script>
<style lang="stylus" scoped>
.todo-item
  position relative
  background #ffffff
  font-size 24px
  border-bottom 1px solid rgba(0,0,0,.06)
  &:hover
    .destroy:after {
         content: 'x'
    }

  label
    white-space pre-line
    word-break break-all
    padding 15px 60px 15px 15px
    margin-left 45px
    display block
    line-height 1.2
    transition color 0.4s
&.completed{
    label
    color #d9d9d9
    text-decoration line-through
}
.toggle{
  text-align center
  width 400px
  height 40px
  position absolute
  top 0
  bottom 0
  margin auto 0
  border none
  outline none
  appearance: none;
  -webkit-appearance: none;
}
  .toggle:before{
    content:url('../assets/images/round.svg')
    position absolute
    left 12px
    cursor pointer
  }
  .toggle:checked:before{
    content : url('../assets/images/done.svg')
    position absolute
    left 12px
    cursor pointer
  }
.destroy
  position absolute
  top 50%
  right 10px
  bottom 0;
  width 40px
  height 40px
  margin auto 0;
  font-size 30px
  color #cc9a9a;
  margin-bottom 11px
  transition: color 0.2s east-out
  background-color transparent
  appearance: none;
  -webkit-appearance: none;
  border-width 0
  cursor pointer
  outline none
</style>
