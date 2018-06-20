<template>
	<div id="app">
		<!--<img src="./assets/logo.png">
    <router-view/>-->
		<h1>{{msg}}</h1>
		<!--keyup键盘敲击事件.enter回车键-->
		<!--v-on:事件方式可以简写为@,如:v-on:click->@click-->
		<input type="text" v-model="newItem" @keyup.enter="addNew" />
		<p>{{newItem}}</p>
		<ul>
			<!--toggleFinish()写进去的时候,没有传入参数,所以输出的对象的MouseEvent-->
			<!--toggleFinish(item) 将item作为参数传入函数,-->
			<li v-for="item in list" v-bind:class="{loading:item.state}" v-on:click="toggleFinish(item)">{{item.label}}</li>
		</ul>
		<!--组件对大小写敏感,大写A用-a代替-->
		<!--父组件传值给子组件,使用的是子组件的props属性,子组件在props中已经定义了msgfromfather属性,在父组件调用子子组件的标签中,父组件已经给子组件的msgfromfather赋值-->
		<!--子组件往父组件传值时,需要对子组件进行监听事件,v-on:自定义事件名-->
		<!--儿子告诉我什么事情的时候,我执行什么-->
		<component-a msgfromfather='you die !' v-on:child-tell-me-something='listenToMyBoy'></component-a>
		<p>child tell me:{{childWord}}</p>
		<!--使用$dispatch,父组件就监听不到chilk事件,使用的是父组件内的属性,events-->
		<component-b msgfromfather='you die !'></component-b>
		<p>child tell me:{{childWord2}}</p>
	</div>
</template>

<script>
	import Storage from './store'
	//组件首字母必须大写,组件中间每个大小的在DOM标签中必须使用-转换为小写
	//使用$emit向父组件传递数据
	import ComponentA from "./components/componentA"
	//使用$dispatch向父组件传递数据
	import ComponentB from "./components/componentB"
	//Storgae是一个对象,里面
	console.log(Storage);
	export default {
		name: 'App',
		data() {
			return {
				msg: '你好?',
				//当前每次刷新页面,list都为空,需要给list执行一个函数
				//list: [],
				//获取window.loaclStorage中value值,并赋给list
				list:Storage.fetch(),
				//新建一个参数newItem,初始值为空
				newItem: ' ',
				childWord:"",
				childWord2:""
			}
		},
		//观察对象是否有变化,key为观察对象,value为 回调函数
		watch: {
			//监视当前函数内部的list对象
			//每当list中的item执行addNew的时候,watch都会监听到,并进行handle这个回调函数
			list: {
				handler: function(item) {
					console.log(item);
					Storage.save(item);
				},
				//并对其进行深层赋值
				//如果deep设置为false,那么点击事件就不会同时更新在localStorage中
				deep: true
			}
		},
		//使用$dispatch,使用events事件绑定,Vue2.0已经废弃了$dispatch和$boradcast使用更建明清晰的组件通信和状态管理方案,可以使用Vuex
		events:{
			"child-tell-me-something":function(msg){
				this.childWord2 = msg;
			}
		},
		methods: {
			toggleFinish: function(item) {
				item.state = !item.state;
				console.log(item);
			},
			addNew: function() {
				//里面的所有数据使用this
				console.log(this.newItem);
				this.list.push({
					label: this.newItem,
					state: true
				});
				console.log()
				this.newItem = '';
				//		Storage.save(this.list);
			},
			listenToMyBoy:function(msg){
				this.childWord = msg;
			}
		},
		//注册 组件
		components:{ ComponentA,ComponentB }
	}
</script>

<style>
	#app {
		font-family: 'Avenir', Helvetica, Arial, sans-serif;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
		text-align: center;
		color: #2c3e50;
		margin-top: 60px;
	}
	
	ul {
		list-style: none;
		color: #BD1717;
	}
	
	li {
		margin: 10px;
	}
	
	.loading {
		color: #009900;
	}
</style>