<template>
	<div>
		<h1>{{msg}}</h1>
		<h2>{{msg2}}</h2>
		<h3>{{msgfromfather}}</h3>
		<button v-on:click="onClickMe"> 点击我</button>
	</div>
</template>

<script>
	export default {
		name: 'componentA',
		//data组件必须使用return回调,为了不让多处组件共享同一data对象,必须使用返回函数
		data: function() {
			return {
				msg: "你还好吗?",
				msg2: "我不好"
			}
		},
		//可以是数组或对象,用户接受来自父组件的数据,props可以
		props:[
		//获取父组件传递的数据,由于是变量名,所以要以字符串的方式书写
		//定义了一个变量msgfromfather,在父组件被赋值,所以methods中的this.msgfromfather才能获取到信息
			'msgfromfather'
		],
		methods: {
			onClickMe: function() {
				console.log(this.msgfromfather);
				this.$emit('child-tell-me-something',this.msg);
			}
		}
	}
</script>

<style scoped>
	div{
		border-bottom: 3px dashed #ddd;
			padding: 20px 0;
	}
</style>