const autoprefixer = require('autoprefixer')


//css代码部分浏览器需要加前缀才能识别,这个autoprefixer可以自动去完成
module.export = {
	plugins: [
		autoprefixer()
	]
}
