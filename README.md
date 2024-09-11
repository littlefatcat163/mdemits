# mdEmits

MD 代表 Markdown，明确传达了工具的主要功能；Emits 表示发出或生成，传达了生成 HTML 内容的意义，名称简短，容易记住和拼写。Emits 给人一种现代和动态的感觉，适合描述生成或发布内容的过程。


root
    server
    package.json
    run command
    |—— docs
    |   |—— dist 支持build完，直接丢上对应的git page 或者是 云服务，可以手动执行git，或者是其他命令
    |   |—— config 主要是配置主题颜色而已，左侧导航栏
    |   |—— index.md 任何文件都是md，最终会生成对应的html
    |   |—— ...assests 图片资源任意位置放
    |—— mdFiled1
    |   |—— config
    |   |—— index.md
    |—— mdFiled2
    |   |—— secondField
    |   |   |—— index.md
    |   |   |—— abc.md
    |   |—— config
    |   |—— index.md
    |   |—— home.md 大类下面的所有子分类都堆在这里


- [ ] fs解析path，读取同名字的md、vue文件，并将其解析成html
- [ ] 扫描目录下面的所有相关文件，生成对应的目录结构html
- [ ] 保持md、vue解析方式一致，dev 和 prod 都可以直接使用，完美支持
- [ ] 路径解析很容易完成，只是 request 和 response 而已


## 重点

- [ ] 重点，解析 md 、vue
- [ ] 其他不重要，重要的事是md和vue结合后，build出来的内容能支持到什么程度
- [ ] 子组件
- [ ] 图片路径解析


将md解析为vue，再解析为html，这样就是SSR，需要将部分id的html在客户端执行的时候，转交给vue



- [x] 页面上的html结构已经渲染出来了，不需要再去经过js重新渲染一层，不然html和js里面有重叠的代码，页面初始化有重复的内容执行，效率降低
- [x] 但是需要结合vue来做服务端渲染，用服务端渲染就够了，把html结构渲染出来，再去加载相关的js就行了，这样组件库的功能可能无法生效，除非找到组件库是类似bootstrap这类的UI库，UI和JS是完全独立开的
- [x] bootstrap 的话，由于UI、CSS、JS完全独立开，在网络上的速度是最快，不需要去重新编译了
- [x] vue + element的话，组件丰富，功能多，但是需要去编译，页面上需要js去接管html，js在编译的时候，会将用到相关的vue里面的html重新编译打包进js，那么在网络请求的时候，会有重复的资源加载，造成没必要的网络资源浪费，比如html已经是包含了结构的了，但是需要的js又重新加载了一遍html结构，这部分是多余
- [ ] 思考下页面的功能，还有是否需要用到组件库的功能
- MD -> html，Vue -> html



1. 客户端发起请求  /test
2. 服务端找到 test.md 文件，并进行解析为 md-html  ————> 已经完成，没什么问题，很容易
3. 结合布局 layout-html、css、js、 md-html 一起组装返回给客户端  ————> 有难度
    - [x] layout 你这里想用什么方式去解决呢？ 用 vue template很好写
    - [x] 可以用ssr-render的方式去把html结构渲染出来
    - [x] 样式可以考虑一下统一解析，也是可以完成的
4. 客户端渲染出页面，并执行js，完成页面的交互

## 结合vue的做法
其实通用的页面内容很简单，复杂的交互只是在一部分节点上，不一定非得需要vue

### 做法一

md -> 引入vue模版，进行骨架屏页面的渲染，继续支持md的其他功能，然后模版里面才是真正的app节点去，并去载入由vite编译完成的vue入口文件
- 这样就能做到ssr，并且能做到客户端渲染出页面，并执行js，完成页面的交互
- md只处理md，vue只处理vue，没有相互的耦合
- 需要配置vite来编译

### 做法二

md -> 转为html -> 转为vue
- 统一编译，反正都是需要去编译的

<MdLayout>
  <MdHeader></MdHeader>
  <MdContent></MdContent>
  <MdFooter></MdFooter>
</MdLayout>


my-project/
├── src/
│   ├── MdLayout.vue
│   ├── MdHeader.vue
│   ├── MdContent.vue
│   ├── MdFooter.vue
├── content/
│   ├── example1.md
│   ├── example2.md
│   └── ...
└── package.json


md 主要是用来写文档，如果需要设计到脚本等的东西执行，没必要写入进来，容易造成混乱；
对于vue的提示也不好，插件不支持，也不知道扩展到md文件上

## UI 框架的选择

- bootstrap 响应式支持最好，需要自己手写组件
- bootstrap-vue-next 没正式出过版本
- antdvue 主题调整支持友好

App.vue
  Layout.vue
  Header.vue

Layout.vue... 这类组件优先跟着一起编译，但是一旦编译完毕，就无法支持动态修改，对后面的自定义布局调整无法支持

或者是用已经编译好的布局文件，也是可以的
如果直接用tsx语法呢？
一样的，不管是tsx、jsx还是vue，都需要编译成js才行的

ssr render -> App.vue -> html

index.html
  <div id="app">
    <!-- ssr app html -->
  </div>
  <script type="module" src="/index.js"></script>

index.js -> 客户端渲染的东西交给esbuild去编译就行
  import { createSSRApp } from 'vue'
  import AppPage from './AppPage.vue' -> 这里指向md转换的vue -> js
  const app = createSSRApp(AppPage)
  app.mount('#app')


## CND

https://cdn.jsdelivr.net
https://unpkg.com/

https://tw-elements.com/learn/te-foundations/te-ui-kit/hiding-elements/

## SSR 与 编译同步

- [x] esbuild entryPoints 只能是markdown文件，一个md文件将生成一个vue页面
- [x] 页面完成后，再统一交给 index.js 去调用vue初始化，把页面挂载到html节点

## UI框架

- [x] rem 单位，响应式
- [x] 支持cdn esm引入

### @varlet/ui 716K

表格支持不好，没有chart
px 单位，需要自行转换为rem
支持 cdn esm引入

### vuestic-ui 450K

rem单位
cdn不支持esm
样式以style的方式挂载到dom上，修改主题颜色只能通过初始化去配置，在SSR会出现颜色闪一下变了的效果

### native-ui 1.7M ~ 4M
PX 单位
支持 cdn esm引入

### element-plus 888K ~ 2M
支持 cdn esm引入

### primevue 1.7M

rem 单位
试试按需引入esm效果

### buefy
周下载量 38486
version 0.9.29
start 9.5k
轻量化、英文文档
https://buefy.org/

支持cdn esm
没有正式版，只支持vue2，对于vue3的支持不多，使用人也少
颜色设计不错，可以参考




"primevue/button": "/node_modules/primevue/button/index.mjs",
"primevue/config": "/node_modules/primevue/config/index.mjs",
"primevue/badge": "/node_modules/primevue/badge/index.mjs",
"primevue/ripple": "/node_modules/primevue/ripple/index.mjs",
"primevue/button/style": "/node_modules/primevue/button/style/index.mjs",
"@primeuix/utils/object": "/node_modules/@primeuix/utils/object/index.mjs",
"@primevue/icons/spinner": "/node_modules/@primevue/icons/spinner/index.mjs",
"@primevue/icons/baseicon": "/node_modules/@primevue/icons/baseicon/index.mjs",
"@primevue/icons/baseicon/style": "/node_modules/@primevue/icons/baseicon/style/index.mjs",
"@primevue/core/basecomponent": "/node_modules/@primevue/core/basecomponent/index.mjs",
"@primeuix/styled": "/node_modules/@primeuix/styled/index.mjs",
"@primeuix/utils/dom": "/node_modules/@primeuix/utils/dom/index.mjs",
"@primevue/core/base": "/node_modules/@primevue/core/base/index.mjs",
"@primevue/core/base/style": "/node_modules/@primevue/core/base/style/index.mjs",
"@primevue/core/utils": "/node_modules/@primevue/core/utils/index.mjs",
"@primeuix/utils/eventbus": "/node_modules/@primeuix/utils/eventbus/index.mjs",
"@primevue/core/usestyle": "/node_modules/@primevue/core/usestyle/index.mjs",
"@primeuix/utils": "/node_modules/@primeuix/utils/index.mjs",
"@primeuix/utils/uuid": "/node_modules/@primeuix/utils/uuid/index.mjs",
"@primeuix/utils/classnames": "/node_modules/@primeuix/utils/classnames/index.mjs",
"@primeuix/utils/mergeprops": "/node_modules/@primeuix/utils/mergeprops/index.mjs",
"@primeuix/utils/zindex": "/node_modules/@primeuix/utils/zindex/index.mjs",
"primevue/badge/style": "/node_modules/primevue/badge/style/index.mjs",
"@primevue/core/basedirective": "/node_modules/@primevue/core/basedirective/index.mjs",
"primevue/ripple/style": "/node_modules/primevue/ripple/style/index.mjs",
"@primevue/core/service": "/node_modules/@primevue/core/service/index.mjs",
"@primevue/core/config": "/node_modules/@primevue/core/config/index.mjs",
"@primevue/core/api": "/node_modules/@primevue/core/api/index.mjs"