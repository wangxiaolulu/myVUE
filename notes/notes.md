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
### 5.2 ES6常用命令
#### 函数的Rest参数和扩展
#### Promise使用
#### module.export和ES6 import/export的使用

## 第六章 商品列表模块实现
### 6.1商品列表组件拆分
+ Header组件
+ Footer组件
+ 面包屑组件
### 6.2商品列表数据渲染
+ 模拟mock数据，加载商品列表信息
+ 因为最新版本的vue-cli已经放弃dev-server.js，只需在webpack.dev.conf.js配置就行
 - 在const portfinder = require(‘portfinder’)后添加
```javascript
const express = require('express')
const app = express()
var appData = require('../mock/goods.json')//加载本地数据文件
var apiRoutes = express.Router()
app.use('/api', apiRoutes)
```
 - 然后找到devServer,在里面添加
```javascript
    before(app) {
      app.get('/api/appData', (req, res) => {
        res.json({
          errno: 0,
          data: appData
        })//接口返回json数据，上面配置的数据appData就赋值给data请求后调用
      })
    }
```
 - 然后npm run dev，一定要重启 一下就可以http://localhost:8080/api/appData 访问了
### 6.3实现图片懒加载
+ https://www.npmjs.com/package/vue-lazyload
+ 安装
 - npm i vue-lazyload -S
+ 使用
 - main.js
 ```javascript
import Vue from 'vue'
import App from './App.vue'
import VueLazyload from 'vue-lazyload'
 
Vue.use(VueLazyload)
 
// or with options
Vue.use(VueLazyload, {
  preLoad: 1.3,
  error: 'dist/error.png',
  loading: 'dist/loading.gif',
  attempt: 1
})
 
new Vue({
  el: 'body',
  components: {
    App
  }
})
```
  - template:
  ```html
<ul>
  <li v-for="img in list">
    <img v-lazy="img.src" >
  </li>
</ul>
```
## 第七章 Node
### 7.1 linux环境搭建

### 7.2 创建httpserver
+ node特点
 - 基于chrome  V8引擎
 - 单线程
 - 使用javascript开发后端代码
 - 非阻塞的IO
+ node运行文件
    ```node Demo```
### 7.3 通过node加载静态资源

### 7.4 搭建基于Express框架的运行环境
+ 安装express generator生成器
    - npm i -g express-generator
    - 查看  express --version
    - 创建项目 express server
    - 一般前后端分离，server单独执行 npm install
    - 该项目不分离，将server中package.json合并到源项目的package
    - 安装ejs   npm i ejs --save
+ 通过生成器自动创建项目
= 配置分析
## 第八章 MongoDB介绍
### 8.1 window下mongodb环境搭建
+ mongodb是非关系型 NoSQL数据库
    - 优点
        - 高可扩展性
        - 分布式存储
        - 低成本
        - 结构灵活
    - 下载安装包或者压缩包
    - 添加db存储和日志存储文件夹
    - 添加服务、配置环境变量、启动mongo
+ 安装配置（32位）（64位直接下载暗黄，查看任务管理器-服务-mongodb是否启动，打开http://localhost:27017/。查看是否返回一行信息It looks like you are trying to access MongoDB over HTTP on the native driver port.返回就安装成功）
    - 新建MongoDB,在文件夹里新建data、etc、logs文件夹
    - etc中新建mongodb.conf文件
    - 打开cmd，进入安装好的mongodb的bin目录
    - 执行命令：mongod --dbpath path  (指定db存储在哪里,path为data目录)
    - 打开配置文件mongodb.conf，添加配置信息
### 8.2 linux平台下的搭建 
### 8.3 给mongodb创建用户
+ 创建管理员
+ 授权认证
+ 给使用的数据库添加用户
### 8.4 mongodb基本语法
+ 数据库对比
+ 插入文档
+ 更新文档
+ 删除文档
+ 查询文档
### 8.5 表数据设计和插入

## 第九章 基于node.js开发商品列表接口
### 9.1 node的启动和调试
+ 通过node命令启动
    - node bin/www    通过localhost:3000 查看状态
+ webstorm配置启动入口
+ pm2
    - npm install pm2 -g
    - pm2 -v
    - pm2 start app.js
    - pm2 stop all
### 9.2 基于Express实现商品列表查询接口
+ 安装Mongoose
+ 创建model
+ 创建路由
+ 基于mongoose，实现商品列表的查询功能
### 9.3 商品列表分页和排序功能实现

+安装vue-infinite-scroll   https://www.npmjs.com/package/vue-infinite-scroll
    - npm install vue-infinite-scroll --save
### 9.4 价格过滤功能实现
### 9.5 加入购物车功能实现

## 第十章  登录模块实现
### 10.1  登录功能实现
### 10.2  登出功能实现
+ 插件  supervisor  自启动node
+ express-session  插件用来做session存储
### 10.3  登录拦截
### 10.4  全局模态框组件实现
## 第十一章 购物车模块实现

