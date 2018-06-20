//设置window.localStorage的key
const Storage_key = "todolist";
export default {
	fetch () {
		//JSON.parse()方法用于将一个JSON字符串转换为对象
		//抓取window.loaclStorage中key的值
		return JSON.parse(window.localStorage.getItem(Storage_key)||"[]");
	},
	save (items){
		//往window.loaclStorage传入新的key与vlue值;
		window.localStorage.setItem(Storage_key,JSON.stringify(items))
	}
	
}
