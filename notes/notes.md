## 第一章 课程介绍
### 1.1 导学
#### vue框架对比
+ Vue和React对比
	- Angular提供的更多是一整套解决方案，vue和react更像一个生态
	- Vue和React目前都使用了Virtual Dom
+ vue
	- 模板和渲染函数的弹性选择
	- 简单的语法及项目创建
	- 更快的渲染速度和更小的体积
+ React
	- 更适用于大型应用和更好的可测试性
	- 同时适用于Web端和原生App
	- 更大的生态圈带来的更多支持和工具
+ Vue和React相同点
	- 利用虚拟DOM实现快速渲染（虚拟DOM：在js的内存里构建一个类似于DOM的一个对象）
	- 轻量级
	- 响应式组件
	- 服务器端渲染
	- 易于集成路由工具，打包工具以及状态管理工具
	- 优秀的支持和社区
### 1.2 前端框架回顾
+ 基于MV*模式的Vue框架
	- Model绑定View
	- 没有控制器概念
	- 数据驱动，状态管理
### 1.3 vue概括核心思想
#### vue概况以及核心思想
+ Vue本身并不是一个框架
+ Vue结合周边生态构成一个灵活的、渐进式的框架
+ 核心思想
	- 数据驱动
	- 组件化
+ Vue如何实现双向数据绑定？
	- Object.defineProperty()
## 第二章 vue基础
### 2.1 nodejs和npm安装
+ 安装
	- 下载：https://nodejs.org/en/download/
	- npm install -g cnpm --registry=https://registry.npm.taobao.org
	- npm install -g npm (更新)
### 2.2 vue环境搭建以及vue-cli使用
+ Vue多页面应用文件引用
	- 官方拷贝：<script src="https://unpkg.com/vue/dist/vue.js"></script>
	- npm安装
		- npm i vue --save 
+ vue-cli构建SPA应用
	- npm install -g vue-cli
	- vue init webpack-simple demo
	- vue init webpack demo2
### 2.3 Vue配置
### 2.5 Vue基础语法介绍
+ 模板语法
	- Mustache语法：{{msg}}
	- Html赋值：v-html=""
	- 绑定属性：v-bind:id=""
	- 使用表达式：{{ok?'YES':'NO'}}
	- 文本赋值：v-text=""
	- 指令：v-if=""
	- 过滤器：{{message | capitalize}} 和 v-bind:id="rawId | formatId"
+ Class和Style绑定
	- 对象语法：v-bind:class="{active:isActive,'text-danger':hasError}"
	- 数组语法：
		/* <div v-bind:class="{activeClass,errorClass}"></div>
		data{
			activeClass:'active',
			errorClass:'text-danger'
		} */ 
	- style绑定-对象语法：v-bind:style="color:activeColor,fontSize:fontSize + 'px'"
	- 条件渲染：
		- v-if
		- v-else
		- v-else-if
		- v-show
		- v-cloak
	- vue事件处理器
	    - v-on:click="greet" 或者 @click="greet"
		- v-on:click.stop、v-on:click.stop.prevent、v-on:click.self、v-on:click.once
		- v-on:keyup.enter
			- .enter
			- .tab
			- .delete(捕获‘删除’和‘退格’键)
			- .esc
			- .space
			- .up
			- .down
			- .left
			- .right
	- Vue组件
		- 全局组件和局部组件
		- 父子组件通讯-数据传递（props父子，emit子父）
		- Slot
## 第三章 Vue-router
### 3.1 路由基础介绍
+ 什么是前端路由？
	- 路由是根据不同的url地址展示不同的内容或页面
	- 前端路由就是把不同路由对应不同的内容或页面的任务交给前端来做，之前是通过服务器根据url的不同返回不同的页面实现的
+ 什么时候使用前端路由/
	- 在单页面应用，大部分页面结构不变，只改变部分内容的使用
+ 前端路由有什么优点和缺点？
	- 优点：用户体验好，不需要每次都从服务器全部获取，快速展现给用户
	- 缺点：不利于SEO；使用浏览器的前进，后退键的时候会重新发送请求，没有合理地利用缓存；单页面无法记住之前滚动的位置，无法在前进，后退的时候记住滚动的位置
+ vue-router用来构建SPA
+ <router-link></router-link>或者this.$router.push({path:''})
+ <router-view></router-view>
###　3.2 动态路由配置
###　3.3 嵌套路由
+ 同一页面不同标签切换
###　3.4 编程试路由
+ 什么是编程式路由？
	- 通过js来实现页面的跳转
	- $router.push("name")
	- $router.push({path:"name"})
	- $router.push({path:"name?a=123"})或者$router.push({path:"name",query:{a:123}})
	- $router.go(1)
###　3.5 命名路由和命名视图
+ 什么是命名路由和命名视图？
	- 给路由定义不同的名字，根据名字进行匹配
	- 给不同的router-view定义名字，通过名字进行对应组件的渲染
## 第四章 Vue-resource和Axios
### vue-resource
+ 引入
	- <script src=""></script>
	- npm install vue-resource  --save
+ vue-resource的请求API是按照REST风格设计的。7种
	- get(url,[options])
	- head(url,[options])
	- delete(url,[options])
	- jsonp(url,[options])
	- post(url,[body],[options])
	- put(url,[body],[options])
	- patch(url,[body],[options])
+ 全局拦截器  interceptors
```javascript
Vue.http.interceptors.push((request,next)=>{
	//...
	<!-- 请求发送前的处理逻辑 -->
	//...
	next((response)=>{
		//...
		//请求发送后的处理逻辑
		//...
		//根据请求的状态，response参数会返回给successCallback或errorCallback
		return response
	})
})
```
### axios
+ 引入
    - <script src=""></script>
    - npm install axios --save
+ API
    - axios.request(config)
    - axios.get(url,[,config])
    - axios.delete(url,[,config])
    - axios.head(url,[,config])
    - axios.options(url,[,config])
    - axios.post(url,data[,config])
    - axios.put(url,data[,config])
## 第五章 ES6常用语法