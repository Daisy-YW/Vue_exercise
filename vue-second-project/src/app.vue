<template>
	<!--vue只能支持一个节点-->
	<div id="app">
		<div id="cover"></div>
		<Header></Header>
		<Todo/>
		<Footer/>
	</div>
</template>

<script>
	import Header from './todo/header.vue'
	// 引入footer.jsx组件
	import Footer from './todo/footer.jsx'
	import Todo from './todo/todo.vue'

	export default{
		data(){
			return{
				text:"abc"
			}
		},
		//声明注册当前页面需要使用的组件
		components:{
			Header,
			Footer,
			Todo
		}
	}
</script>

<style scoped lang="stylus">
 #app{
        position absolute
        left 0
        right 0
        top 0
        bottom 0
    }
    #cover{
        position absolute
        left 0
        right 0
        top 0
        bottom 0
        background-color #999
        opacity .4
        z-index -1
    }
</style>
